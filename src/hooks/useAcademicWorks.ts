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

// Helper function to normalize text for comparison (removes accents)
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export const useAcademicWorks = (filters: Filters) => {
  return useQuery({
    queryKey: ["academic-works", filters],
    queryFn: async () => {
      let query = supabase
        .from("academic_works")
        .select("*")
        .order("year", { ascending: false });

      // Apply program filter (exact match)
      if (filters.program && filters.program !== "all") {
        query = query.eq("program", filters.program);
      }

      // Apply year filter (exact match)
      if (filters.year && filters.year !== "all") {
        query = query.eq("year", parseInt(filters.year));
      }

      const { data, error } = await query;

      if (error) throw error;

      let results = data as AcademicWork[];
      
      // Client-side filtering for partial title matches (case-insensitive, accent-insensitive)
      if (filters.title) {
        const titleSearch = normalizeText(filters.title.trim());
        results = results.filter((work) =>
          normalizeText(work.title).includes(titleSearch)
        );
      }

      // Client-side filtering for partial author matches (case-insensitive, accent-insensitive)
      if (filters.author) {
        const authorSearch = normalizeText(filters.author.trim());
        results = results.filter((work) =>
          normalizeText(work.author).includes(authorSearch)
        );
      }

      // Client-side filtering for partial keyword matches (case-insensitive, accent-insensitive)
      if (filters.keywords) {
        const keywordSearch = normalizeText(filters.keywords.trim());
        results = results.filter((work) =>
          work.keywords.some((keyword) =>
            normalizeText(keyword).includes(keywordSearch)
          )
        );
      }

      return results;
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
