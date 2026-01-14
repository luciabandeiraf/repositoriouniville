import { useState, useMemo } from "react";
import Header from "@/components/Header";
import SearchFilters from "@/components/SearchFilters";
import ResultsSection from "@/components/ResultsSection";
import WorkDetail from "@/components/WorkDetail";
import Footer from "@/components/Footer";
import { mockWorks, AcademicWork } from "@/data/mockData";

const Index = () => {
  const [filters, setFilters] = useState({
    title: "",
    author: "",
    program: "",
    year: "",
    keywords: "",
  });

  const [selectedWork, setSelectedWork] = useState<AcademicWork | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

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

  const filteredWorks = useMemo(() => {
    return mockWorks.filter((work) => {
      const matchesTitle =
        !filters.title ||
        work.title.toLowerCase().includes(filters.title.toLowerCase());

      const matchesAuthor =
        !filters.author ||
        work.author.toLowerCase().includes(filters.author.toLowerCase());

      const matchesProgram =
        !filters.program ||
        filters.program === "all" ||
        work.program === filters.program;

      const matchesYear =
        !filters.year ||
        filters.year === "all" ||
        work.year.toString() === filters.year;

      const matchesKeywords =
        !filters.keywords ||
        work.keywords.some((keyword) =>
          keyword.toLowerCase().includes(filters.keywords.toLowerCase())
        );

      return (
        matchesTitle &&
        matchesAuthor &&
        matchesProgram &&
        matchesYear &&
        matchesKeywords
      );
    });
  }, [filters]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <SearchFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />
      <ResultsSection
        works={filteredWorks}
        onSelectWork={handleSelectWork}
        totalCount={mockWorks.length}
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
