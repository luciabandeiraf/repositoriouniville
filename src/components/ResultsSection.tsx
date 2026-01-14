import { AcademicWork } from "@/data/mockData";
import WorkCard from "./WorkCard";
import { FileSearch } from "lucide-react";

interface ResultsSectionProps {
  works: AcademicWork[];
  onSelectWork: (work: AcademicWork) => void;
  totalCount: number;
}

const ResultsSection = ({ works, onSelectWork, totalCount }: ResultsSectionProps) => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <p className="text-muted-foreground">
          <span className="font-semibold text-foreground">{works.length}</span>{" "}
          {works.length === 1 ? "resultado encontrado" : "resultados encontrados"}
          {works.length !== totalCount && (
            <span className="text-muted-foreground"> de {totalCount} trabalhos</span>
          )}
        </p>
      </div>

      {works.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((work) => (
            <WorkCard
              key={work.id}
              work={work}
              onClick={() => onSelectWork(work)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <FileSearch className="h-16 w-16 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Nenhum resultado encontrado
          </h3>
          <p className="text-muted-foreground max-w-md">
            Tente ajustar os filtros de busca para encontrar trabalhos acadêmicos
            relacionados aos seus critérios.
          </p>
        </div>
      )}
    </section>
  );
};

export default ResultsSection;
