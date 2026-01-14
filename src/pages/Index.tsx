import { useState } from "react";
import Header from "@/components/Header";
import SearchFilters from "@/components/SearchFilters";
import ResultsSection from "@/components/ResultsSection";
import WorkDetail from "@/components/WorkDetail";
import Footer from "@/components/Footer";
import { useAcademicWorks, useTotalWorksCount, AcademicWork, Filters } from "@/hooks/useAcademicWorks";

const Index = () => {
  const [filters, setFilters] = useState<Filters>({
    title: "",
    author: "",
    program: "",
    year: "",
    keywords: "",
  });

  const [selectedWork, setSelectedWork] = useState<AcademicWork | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const { data: works = [], isLoading, isError } = useAcademicWorks(filters);
  const { data: totalCount = 0 } = useTotalWorksCount();

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      title: "",
      author: "",
      program: "",
      year: "",
      keywords: "",
    });
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
        works={works}
        onSelectWork={handleSelectWork}
        totalCount={totalCount}
        isLoading={isLoading}
        isError={isError}
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
