import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { programs, years } from "@/data/filterOptions";
import { Filters } from "@/hooks/useAcademicWorks";

interface SearchFiltersProps {
  filters: Filters;
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
}

const SearchFilters = ({ filters, onFilterChange, onClearFilters }: SearchFiltersProps) => {
  return (
    <section className="bg-secondary/50 border-b border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-2">
            Buscar Trabalhos Acadêmicos
          </h2>
          <p className="text-muted-foreground">
            Utilize os filtros abaixo para encontrar teses e dissertações
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Título
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="title"
                placeholder="Buscar por título..."
                value={filters.title}
                onChange={(e) => onFilterChange("title", e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="author" className="text-sm font-medium">
              Autor
            </Label>
            <Input
              id="author"
              placeholder="Buscar por autor..."
              value={filters.author}
              onChange={(e) => onFilterChange("author", e.target.value)}
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="program" className="text-sm font-medium">
              Programa de Pós-Graduação
            </Label>
            <Select
              value={filters.program}
              onValueChange={(value) => onFilterChange("program", value)}
            >
              <SelectTrigger id="program" className="bg-background">
                <SelectValue placeholder="Selecione o PPG" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os programas</SelectItem>
                {programs.map((program) => (
                  <SelectItem key={program} value={program}>
                    {program}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="year" className="text-sm font-medium">
              Ano
            </Label>
            <Select
              value={filters.year}
              onValueChange={(value) => onFilterChange("year", value)}
            >
              <SelectTrigger id="year" className="bg-background">
                <SelectValue placeholder="Selecione o ano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os anos</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords" className="text-sm font-medium">
              Palavras-chave
            </Label>
            <Input
              id="keywords"
              placeholder="Buscar por palavras-chave..."
              value={filters.keywords}
              onChange={(e) => onFilterChange("keywords", e.target.value)}
              className="bg-background"
            />
          </div>

          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="w-full"
            >
              Limpar Filtros
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchFilters;
