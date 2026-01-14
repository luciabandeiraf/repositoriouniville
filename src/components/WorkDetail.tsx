import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AcademicWork } from "@/hooks/useAcademicWorks";
import { User, GraduationCap, Calendar, Download, BookOpen } from "lucide-react";

interface WorkDetailProps {
  work: AcademicWork | null;
  isOpen: boolean;
  onClose: () => void;
}

const WorkDetail = ({ work, isOpen, onClose }: WorkDetailProps) => {
  if (!work) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <DialogTitle className="text-xl font-bold text-foreground leading-snug pr-8">
              {work.title}
            </DialogTitle>
          </div>
          <Badge
            variant={work.type === "Tese" ? "default" : "secondary"}
            className={
              work.type === "Tese"
                ? "bg-thesis-badge text-primary-foreground w-fit"
                : "bg-dissertation-badge text-primary-foreground w-fit"
            }
          >
            {work.type}
          </Badge>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
              <User className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Autor</p>
                <p className="text-sm font-medium text-foreground">{work.author}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
              <GraduationCap className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Orientador</p>
                <p className="text-sm font-medium text-foreground">{work.advisor}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
              <Calendar className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Ano de Publicação</p>
                <p className="text-sm font-medium text-foreground">{work.year}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
              <BookOpen className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Programa</p>
                <p className="text-sm font-medium text-foreground leading-snug">{work.program}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">
              Palavras-chave
            </h4>
            <div className="flex flex-wrap gap-2">
              {work.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="inline-flex items-center px-3 py-1 text-sm font-medium bg-tag-bg text-tag-text rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">
              Resumo
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed text-justify">
              {work.abstract}
            </p>
          </div>

          <div className="pt-4 border-t border-border">
            <Button className="w-full sm:w-auto gap-2">
              <Download className="h-4 w-4" />
              Download do PDF Completo
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkDetail;
