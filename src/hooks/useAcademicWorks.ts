import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface AcademicWork {
  id: string;
  title: string;
  type: "Dissertação" | "Tese";
  author: string;
  advisor: string;
  year: number;
  program: string;
  keywords: string[];
  abstract: string;
  pdf_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Filters {
  title: string;
  author: string;
  program: string;
  year: string;
  keywords: string;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResult {
  data: AcademicWork[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

// Helper function to normalize text for comparison (removes accents)
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export const useAcademicWorks = (filters: Filters, pagination: PaginationParams = { page: 1, pageSize: 20 }) => {
  return useQuery({
    queryKey: ["academic-works", filters, pagination],
    queryFn: async (): Promise<PaginatedResult> => {
      // First, get the total count with filters applied
      let countQuery = supabase
        .from("academic_works")
        .select("*", { count: "exact", head: true });

      // Apply program filter
      if (filters.program && filters.program !== "all") {
        countQuery = countQuery.eq("program", filters.program);
      }

      // Apply year filter
      if (filters.year && filters.year !== "all") {
        countQuery = countQuery.eq("year", parseInt(filters.year));
      }

      // Get all data for client-side filtering (we need this for text searches)
      let dataQuery = supabase
        .from("academic_works")
        .select("*")
        .order("created_at", { ascending: false });

      // Apply program filter
      if (filters.program && filters.program !== "all") {
        dataQuery = dataQuery.eq("program", filters.program);
      }

      // Apply year filter
      if (filters.year && filters.year !== "all") {
        dataQuery = dataQuery.eq("year", parseInt(filters.year));
      }

      const { data, error } = await dataQuery;

      if (error) throw error;

      let results = data as AcademicWork[];
      
      // Client-side filtering for partial title matches
      if (filters.title) {
        const titleSearch = normalizeText(filters.title.trim());
        results = results.filter((work) =>
          normalizeText(work.title).includes(titleSearch)
        );
      }

      // Client-side filtering for partial author matches
      if (filters.author) {
        const authorSearch = normalizeText(filters.author.trim());
        results = results.filter((work) =>
          normalizeText(work.author).includes(authorSearch)
        );
      }

      // Client-side filtering for partial keyword matches
      if (filters.keywords) {
        const keywordSearch = normalizeText(filters.keywords.trim());
        results = results.filter((work) =>
          work.keywords.some((keyword) =>
            normalizeText(keyword).includes(keywordSearch)
          )
        );
      }

      // Calculate pagination
      const totalCount = results.length;
      const totalPages = Math.ceil(totalCount / pagination.pageSize);
      const startIndex = (pagination.page - 1) * pagination.pageSize;
      const endIndex = startIndex + pagination.pageSize;
      
      // Paginate results
      const paginatedData = results.slice(startIndex, endIndex);

      return {
        data: paginatedData,
        totalCount,
        totalPages,
        currentPage: pagination.page,
      };
    },
  });
};

export const useTotalWorksCount = () => {
  return useQuery({
    queryKey: ["academic-works-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("academic_works")
        .select("*", { count: "exact", head: true });

      if (error) throw error;
      return count ?? 0;
    },
  });
};

export const useDistinctYears = () => {
  return useQuery({
    queryKey: ["academic-works-years"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("academic_works")
        .select("year")
        .order("year", { ascending: false });

      if (error) throw error;

      // Extract unique years
      const uniqueYears = [...new Set(data.map((item) => item.year))];
      return uniqueYears;
    },
  });
};
