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

export const useAcademicWorks = (filters: Filters) => {
  return useQuery({
    queryKey: ["academic-works", filters],
    queryFn: async () => {
      let query = supabase
        .from("academic_works")
        .select("*")
        .order("year", { ascending: false });

      // Apply title filter
      if (filters.title) {
        query = query.ilike("title", `%${filters.title}%`);
      }

      // Apply author filter
      if (filters.author) {
        query = query.ilike("author", `%${filters.author}%`);
      }

      // Apply program filter
      if (filters.program && filters.program !== "all") {
        query = query.eq("program", filters.program);
      }

      // Apply year filter
      if (filters.year && filters.year !== "all") {
        query = query.eq("year", parseInt(filters.year));
      }

      const { data, error } = await query;

      if (error) throw error;

      let results = data as AcademicWork[];
      
      // Client-side filtering for partial keyword matches (case-insensitive)
      if (filters.keywords) {
        const keywordSearch = filters.keywords.toLowerCase().trim();
        results = results.filter((work) =>
          work.keywords.some((keyword) =>
            keyword.toLowerCase().includes(keywordSearch)
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
