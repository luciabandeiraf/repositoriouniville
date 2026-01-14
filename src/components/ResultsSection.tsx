import { AcademicWork } from "@/hooks/useAcademicWorks";
import WorkCard from "./WorkCard";
import { FileSearch, Loader2, AlertCircle } from "lucide-react";

interface ResultsSectionProps {
  works: AcademicWork[];
  onSelectWork: (work: AcademicWork) => void;
  totalCount: number;
  isLoading: boolean;
  isError: boolean;
}

const ResultsSection = ({ 
  works, 
  onSelectWork, 
  totalCount, 
  isLoading, 
  isError 
}: ResultsSectionProps) => {
  return (
    <section className="container mx-auto px-4 py-8 flex-1">
      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">Buscando trabalhos acadêmicos...</p>
        </div>
      )}

      {/* Error State */}
      {isError && !isLoading && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="bg-destructive/10 p-4 rounded-full mb-4">
            <AlertCircle className="h-12 w-12 text-destructive" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Erro ao carregar os dados
          </h3>
          <p className="text-muted-foreground max-w-md">
            Não foi possível carregar os trabalhos acadêmicos. 
            Por favor, tente novamente mais tarde.
          </p>
        </div>
      )}

      {/* Results */}
      {!isLoading && !isError && (
        <>
          <div className="mb-6">
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">{works.length}</span>{" "}
              {works.length === 1 ? "resultado encontrado" : "resultados encontrados"}
              {works.length !== totalCount && totalCount > 0 && (
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
              <div className="bg-muted p-6 rounded-full mb-6">
                <FileSearch className="h-16 w-16 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Nenhum resultado encontrado
              </h3>
              <p className="text-muted-foreground max-w-md mb-2">
                Não encontramos trabalhos acadêmicos com os critérios selecionados.
              </p>
              <p className="text-sm text-muted-foreground max-w-md">
                Sugestões:
              </p>
              <ul className="text-sm text-muted-foreground list-disc list-inside mt-2 space-y-1">
                <li>Verifique a ortografia dos termos de busca</li>
                <li>Tente usar palavras-chave mais genéricas</li>
                <li>Remova alguns filtros para ampliar a busca</li>
              </ul>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default ResultsSection;
