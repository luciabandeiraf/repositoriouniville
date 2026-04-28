import { useState } from "react";
import Header from "@/components/Header";
import SearchFilters from "@/components/SearchFilters";
import ResultsSection from "@/components/ResultsSection";
import WorkDetail from "@/components/WorkDetail";
import Footer from "@/components/Footer";
import { useAcademicWorks, AcademicWork, Filters } from "@/hooks/useAcademicWorks";

const PAGE_SIZE = 20;

const Index = () => {
  const [filters, setFilters] = useState<Filters>({
    title: "",
    author: "",
    advisor: "",
    program: "",
    year: "",
    keywords: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedWork, setSelectedWork] = useState<AcademicWork | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const { data: result, isLoading, isError } = useAcademicWorks(filters, { page: currentPage, pageSize: PAGE_SIZE });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleClearFilters = () => {
    setFilters({
      title: "",
      author: "",
      advisor: "",
      program: "",
      year: "",
      keywords: "",
    });
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectWork = (work: AcademicWork) => {
    setSelectedWork(work);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setTimeout(() => setSelectedWork(null), 200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <SearchFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />
      <ResultsSection
        works={result?.data ?? []}
        onSelectWork={handleSelectWork}
        totalCount={result?.totalCount ?? 0}
        isLoading={isLoading}
        isError={isError}
        currentPage={result?.currentPage ?? 1}
        totalPages={result?.totalPages ?? 1}
        onPageChange={handlePageChange}
      />
      <WorkDetail
        work={selectedWork}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
      />
      <Footer />
    </div>
  );
};

export default Index;
