import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AcademicWork } from "@/data/mockData";
import { User, GraduationCap, Calendar } from "lucide-react";

interface WorkCardProps {
  work: AcademicWork;
  onClick: () => void;
}

const WorkCard = ({ work, onClick }: WorkCardProps) => {
  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/30 animate-fade-in"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-bold text-foreground leading-snug line-clamp-2">
            {work.title}
          </h3>
          <Badge
            variant={work.type === "Tese" ? "default" : "secondary"}
            className={
              work.type === "Tese"
                ? "bg-thesis-badge text-primary-foreground shrink-0"
                : "bg-dissertation-badge text-primary-foreground shrink-0"
            }
          >
            {work.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="h-4 w-4 shrink-0" />
            <span className="truncate">{work.author}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <GraduationCap className="h-4 w-4 shrink-0" />
            <span className="truncate">{work.advisor}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 shrink-0" />
            <span>{work.year}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-2">
          {work.keywords.slice(0, 3).map((keyword) => (
            <span
              key={keyword}
              className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-tag-bg text-tag-text rounded-full"
            >
              {keyword}
            </span>
          ))}
          {work.keywords.length > 3 && (
            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-tag-bg text-tag-text rounded-full">
              +{work.keywords.length - 3}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkCard;
