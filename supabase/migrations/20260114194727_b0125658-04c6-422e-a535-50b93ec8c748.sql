-- Create enum for work type
CREATE TYPE public.work_type AS ENUM ('Dissertação', 'Tese');

-- Create academic_works table
CREATE TABLE public.academic_works (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  type work_type NOT NULL,
  author TEXT NOT NULL,
  advisor TEXT NOT NULL,
  year INTEGER NOT NULL,
  program TEXT NOT NULL,
  keywords TEXT[] NOT NULL DEFAULT '{}',
  abstract TEXT NOT NULL,
  pdf_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.academic_works ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (academic repository is public)
CREATE POLICY "Academic works are viewable by everyone" 
ON public.academic_works 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_academic_works_updated_at
BEFORE UPDATE ON public.academic_works
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better search performance
CREATE INDEX idx_academic_works_program ON public.academic_works(program);
CREATE INDEX idx_academic_works_year ON public.academic_works(year);
CREATE INDEX idx_academic_works_type ON public.academic_works(type);
CREATE INDEX idx_academic_works_keywords ON public.academic_works USING GIN(keywords);

-- Insert sample data
INSERT INTO public.academic_works (title, type, author, advisor, year, program, keywords, abstract, pdf_url) VALUES
(
  'Práticas Pedagógicas Inovadoras na Educação Básica: Um Estudo de Caso em Escolas Públicas de Santa Catarina',
  'Dissertação',
  'Maria Fernanda Silva',
  'Prof. Dr. João Carlos Oliveira',
  2024,
  'Programa de Pós-Graduação em Educação',
  ARRAY['educação básica', 'práticas pedagógicas', 'inovação', 'escolas públicas'],
  'Esta dissertação investiga as práticas pedagógicas inovadoras implementadas em escolas públicas de Santa Catarina, analisando seus impactos no processo de ensino-aprendizagem. A pesquisa utilizou metodologia qualitativa, com estudos de caso em três escolas da região de Joinville. Os resultados indicam que a adoção de metodologias ativas e o uso de tecnologias educacionais contribuem significativamente para o engajamento dos estudantes e melhoria dos indicadores educacionais.',
  '#'
),
(
  'Impactos Ambientais da Urbanização na Bacia Hidrográfica do Rio Cachoeira',
  'Tese',
  'Ricardo Antônio Mendes',
  'Profa. Dra. Ana Paula Costa',
  2023,
  'Programa de Pós-Graduação em Saúde e Meio Ambiente',
  ARRAY['meio ambiente', 'urbanização', 'recursos hídricos', 'bacia hidrográfica'],
  'Esta tese analisa os impactos ambientais causados pelo processo de urbanização na Bacia Hidrográfica do Rio Cachoeira, em Joinville. Através de análises laboratoriais, monitoramento da qualidade da água e estudos de uso do solo, identificamos padrões de degradação ambiental correlacionados ao crescimento urbano desordenado. A pesquisa propõe medidas de mitigação e políticas públicas para a preservação dos recursos hídricos.',
  '#'
),
(
  'Design Centrado no Usuário: Metodologias para Desenvolvimento de Produtos Sustentáveis',
  'Dissertação',
  'Carolina Beatriz Santos',
  'Prof. Dr. Marcos Eduardo Lima',
  2024,
  'Programa de Pós-Graduação em Design',
  ARRAY['design', 'sustentabilidade', 'experiência do usuário', 'metodologia'],
  'Esta dissertação propõe uma metodologia de design centrado no usuário aplicada ao desenvolvimento de produtos sustentáveis. A pesquisa combina princípios de design thinking com critérios de sustentabilidade ambiental, resultando em um framework prático para designers e empresas. Os estudos de caso demonstram a viabilidade da abordagem em diferentes contextos industriais.',
  '#'
),
(
  'Narrativas Digitais e Construção de Identidade nas Redes Sociais',
  'Dissertação',
  'Pedro Henrique Almeida',
  'Profa. Dra. Luciana Ferreira',
  2023,
  'Programa de Pós-Graduação em Comunicação e Mediações Contemporâneas',
  ARRAY['comunicação digital', 'redes sociais', 'identidade', 'narrativas'],
  'Esta dissertação investiga como as narrativas digitais construídas em redes sociais influenciam a formação de identidades contemporâneas. Utilizando análise de discurso e etnografia digital, o estudo mapeia as estratégias narrativas empregadas por jovens adultos em plataformas como Instagram e TikTok, revelando padrões de autorrepresentação e construção de comunidades virtuais.',
  '#'
),
(
  'Patrimônio Industrial de Joinville: Memória, Preservação e Ressignificação',
  'Tese',
  'Juliana Cristina Weber',
  'Prof. Dr. Roberto Carlos Machado',
  2022,
  'Programa de Pós-Graduação em Patrimônio Cultural e Sociedade',
  ARRAY['patrimônio industrial', 'memória', 'preservação', 'Joinville'],
  'Esta tese analisa o patrimônio industrial de Joinville sob a perspectiva da memória coletiva e das políticas de preservação. A pesquisa documenta edifícios e complexos industriais históricos, investigando processos de tombamento e projetos de ressignificação de espaços industriais desativados. O trabalho contribui para o debate sobre patrimônio e desenvolvimento urbano sustentável.',
  '#'
),
(
  'Otimização de Processos Produtivos na Indústria Têxtil: Uma Abordagem Sustentável',
  'Dissertação',
  'Fernando Augusto Ramos',
  'Prof. Dr. Carlos Eduardo Pereira',
  2024,
  'Programa de Pós-Graduação em Engenharia e Gestão de Processos Sustentáveis',
  ARRAY['engenharia de produção', 'sustentabilidade', 'indústria têxtil', 'otimização'],
  'Esta dissertação propõe metodologias de otimização de processos produtivos na indústria têxtil com foco em sustentabilidade. Através de análises de ciclo de vida e implementação de princípios de economia circular, o estudo demonstra reduções significativas no consumo de água e energia, além de minimização de resíduos. Os resultados apontam caminhos viáveis para a transição sustentável do setor.',
  '#'
),
(
  'Inclusão Digital e Educação de Jovens e Adultos: Desafios e Perspectivas',
  'Dissertação',
  'Adriana Souza Martins',
  'Profa. Dra. Mariana Costa Silva',
  2023,
  'Programa de Pós-Graduação em Educação',
  ARRAY['inclusão digital', 'EJA', 'educação de adultos', 'tecnologia educacional'],
  'Esta dissertação investiga os desafios da inclusão digital na Educação de Jovens e Adultos (EJA) em escolas municipais de Joinville. A pesquisa qualitativa identifica barreiras de acesso, competências digitais e estratégias pedagógicas para integração de tecnologias no processo educativo. Os resultados subsidiam propostas de políticas públicas para democratização do acesso digital.',
  '#'
),
(
  'Qualidade de Vida e Saúde Mental de Trabalhadores da Indústria',
  'Tese',
  'Gustavo Henrique Lopes',
  'Prof. Dr. Antonio Carlos Ribeiro',
  2022,
  'Programa de Pós-Graduação em Saúde e Meio Ambiente',
  ARRAY['saúde mental', 'qualidade de vida', 'trabalhadores', 'indústria'],
  'Esta tese analisa a relação entre condições de trabalho, qualidade de vida e saúde mental de trabalhadores industriais da região de Joinville. O estudo longitudinal acompanhou 500 trabalhadores durante dois anos, identificando fatores de risco e proteção para transtornos mentais. A pesquisa propõe intervenções organizacionais baseadas em evidências para promoção da saúde mental no trabalho.',
  '#'
);