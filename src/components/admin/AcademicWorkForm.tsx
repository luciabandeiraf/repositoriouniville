import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, X, Upload, FileText, Loader2 } from "lucide-react";
import { programs } from "@/data/filterOptions";

type WorkType = "Dissertação" | "Tese";

interface FormData {
  title: string;
  type: WorkType;
  author: string;
  advisor: string;
  year: string;
  program: string;
  keywords: string[];
  abstract: string;
  pdf_url: string;
}

const initialFormData: FormData = {
  title: "",
  type: "Dissertação",
  author: "",
  advisor: "",
  year: new Date().getFullYear().toString(),
  program: "",
  keywords: [],
  abstract: "",
  pdf_url: "",
};

const AcademicWorkForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [newKeyword, setNewKeyword] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const uploadPdf = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `pdfs/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("academic-pdfs")
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from("academic-pdfs")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const createMutation = useMutation({
    mutationFn: async (data: FormData & { file: File | null }) => {
      let pdfUrl: string | null = null;

      if (data.file) {
        setIsUploading(true);
        try {
          pdfUrl = await uploadPdf(data.file);
        } finally {
          setIsUploading(false);
        }
      }

      const { error } = await supabase.from("academic_works").insert({
        title: data.title,
        type: data.type,
        author: data.author,
        advisor: data.advisor,
        year: parseInt(data.year),
        program: data.program,
        keywords: data.keywords,
        abstract: data.abstract,
        pdf_url: pdfUrl,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Trabalho cadastrado",
        description: "O trabalho acadêmico foi cadastrado com sucesso.",
      });
      setFormData(initialFormData);
      setPdfFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      queryClient.invalidateQueries({ queryKey: ["academic-works"] });
      queryClient.invalidateQueries({ queryKey: ["academic-works-count"] });
      queryClient.invalidateQueries({ queryKey: ["academic-works-years"] });
    },
    onError: (error) => {
      toast({
        title: "Erro ao cadastrar",
        description: "Ocorreu um erro ao cadastrar o trabalho acadêmico.",
        variant: "destructive",
      });
      console.error("Error creating academic work:", error);
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddKeyword = () => {
    const keyword = newKeyword.trim();
    if (keyword && !formData.keywords.includes(keyword)) {
      setFormData((prev) => ({
        ...prev,
        keywords: [...prev.keywords, keyword],
      }));
      setNewKeyword("");
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((k) => k !== keywordToRemove),
    }));
  };

  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast({
          title: "Formato inválido",
          description: "Por favor, selecione apenas arquivos PDF.",
          variant: "destructive",
        });
        e.target.value = "";
        return;
      }
      setPdfFile(file);
    }
  };

  const handleRemoveFile = () => {
    setPdfFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.author || !formData.advisor || !formData.program || !formData.abstract) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    createMutation.mutate({ ...formData, file: pdfFile });
  };

  // Generate year options (last 30 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-heading">
          Cadastrar Tese ou Dissertação
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Título */}
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Título do trabalho acadêmico"
              required
            />
          </div>

          {/* Tipo e Ano */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Tipo *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  handleSelectChange("type", value as WorkType)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dissertação">Dissertação</SelectItem>
                  <SelectItem value="Tese">Tese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Ano *</Label>
              <Select
                value={formData.year}
                onValueChange={(value) => handleSelectChange("year", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o ano" />
                </SelectTrigger>
                <SelectContent>
                  {yearOptions.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Autor e Orientador */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="author">Autor(a) *</Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Nome do autor(a)"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="advisor">Orientador(a) *</Label>
              <Input
                id="advisor"
                name="advisor"
                value={formData.advisor}
                onChange={handleInputChange}
                placeholder="Nome do orientador(a)"
                required
              />
            </div>
          </div>

          {/* Programa */}
          <div className="space-y-2">
            <Label htmlFor="program">Programa de Pós-Graduação *</Label>
            <Select
              value={formData.program}
              onValueChange={(value) => handleSelectChange("program", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o programa" />
              </SelectTrigger>
              <SelectContent>
                {programs.map((program) => (
                  <SelectItem key={program} value={program}>
                    {program}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Palavras-chave */}
          <div className="space-y-2">
            <Label htmlFor="keywords">Palavras-chave</Label>
            <div className="flex gap-2">
              <Input
                id="keywords"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyPress={handleKeywordKeyPress}
                placeholder="Digite uma palavra-chave e pressione Enter"
              />
              <Button type="button" variant="outline" onClick={handleAddKeyword}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-tag-bg text-tag-text rounded-full"
                  >
                    {keyword}
                    <button
                      type="button"
                      onClick={() => handleRemoveKeyword(keyword)}
                      className="hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Resumo */}
          <div className="space-y-2">
            <Label htmlFor="abstract">Resumo *</Label>
            <Textarea
              id="abstract"
              name="abstract"
              value={formData.abstract}
              onChange={handleInputChange}
              placeholder="Resumo do trabalho acadêmico"
              rows={6}
              required
            />
          </div>

          {/* Upload do PDF */}
          <div className="space-y-2">
            <Label htmlFor="pdf_file">Arquivo PDF (opcional)</Label>
            <div className="space-y-3">
              <input
                ref={fileInputRef}
                id="pdf_file"
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              
              {!pdfFile ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-24 border-dashed border-2 flex flex-col gap-2"
                >
                  <Upload className="h-6 w-6 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Clique para selecionar um arquivo PDF
                  </span>
                </Button>
              ) : (
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <FileText className="h-8 w-8 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{pdfFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleRemoveFile}
                    className="flex-shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Botão de Envio */}
          <Button
            type="submit"
            className="w-full"
            disabled={createMutation.isPending || isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando PDF...
              </>
            ) : createMutation.isPending ? (
              "Cadastrando..."
            ) : (
              "Cadastrar Trabalho"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AcademicWorkForm;
