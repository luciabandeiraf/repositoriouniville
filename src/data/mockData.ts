export type WorkType = 'Dissertação' | 'Tese';

export interface AcademicWork {
  id: string;
  title: string;
  type: WorkType;
  author: string;
  advisor: string;
  year: number;
  program: string;
  keywords: string[];
  abstract: string;
  pdfUrl: string;
}

export const programs = [
  "Programa de Pós-Graduação em Educação",
  "Programa de Pós-Graduação em Saúde e Meio Ambiente",
  "Programa de Pós-Graduação em Design",
  "Programa de Pós-Graduação em Comunicação e Mediações Contemporâneas",
  "Programa de Pós-Graduação em Patrimônio Cultural e Sociedade",
  "Programa de Pós-Graduação em Engenharia e Gestão de Processos Sustentáveis",
];

export const years = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];

export const mockWorks: AcademicWork[] = [
  {
    id: "1",
    title: "Práticas Pedagógicas Inovadoras na Educação Básica: Um Estudo de Caso em Escolas Públicas de Santa Catarina",
    type: "Dissertação",
    author: "Maria Fernanda Silva",
    advisor: "Prof. Dr. João Carlos Oliveira",
    year: 2024,
    program: "Programa de Pós-Graduação em Educação",
    keywords: ["educação básica", "práticas pedagógicas", "inovação", "escolas públicas"],
    abstract: "Esta dissertação investiga as práticas pedagógicas inovadoras implementadas em escolas públicas de Santa Catarina, analisando seus impactos no processo de ensino-aprendizagem. A pesquisa utilizou metodologia qualitativa, com estudos de caso em três escolas da região de Joinville. Os resultados indicam que a adoção de metodologias ativas e o uso de tecnologias educacionais contribuem significativamente para o engajamento dos estudantes e melhoria dos indicadores educacionais.",
    pdfUrl: "#",
  },
  {
    id: "2",
    title: "Impactos Ambientais da Urbanização na Bacia Hidrográfica do Rio Cachoeira",
    type: "Tese",
    author: "Ricardo Antônio Mendes",
    advisor: "Profa. Dra. Ana Paula Costa",
    year: 2023,
    program: "Programa de Pós-Graduação em Saúde e Meio Ambiente",
    keywords: ["meio ambiente", "urbanização", "recursos hídricos", "bacia hidrográfica"],
    abstract: "Esta tese analisa os impactos ambientais causados pelo processo de urbanização na Bacia Hidrográfica do Rio Cachoeira, em Joinville. Através de análises laboratoriais, monitoramento da qualidade da água e estudos de uso do solo, identificamos padrões de degradação ambiental correlacionados ao crescimento urbano desordenado. A pesquisa propõe medidas de mitigação e políticas públicas para a preservação dos recursos hídricos.",
    pdfUrl: "#",
  },
  {
    id: "3",
    title: "Design Centrado no Usuário: Metodologias para Desenvolvimento de Produtos Sustentáveis",
    type: "Dissertação",
    author: "Carolina Beatriz Santos",
    advisor: "Prof. Dr. Marcos Eduardo Lima",
    year: 2024,
    program: "Programa de Pós-Graduação em Design",
    keywords: ["design", "sustentabilidade", "experiência do usuário", "metodologia"],
    abstract: "Esta dissertação propõe uma metodologia de design centrado no usuário aplicada ao desenvolvimento de produtos sustentáveis. A pesquisa combina princípios de design thinking com critérios de sustentabilidade ambiental, resultando em um framework prático para designers e empresas. Os estudos de caso demonstram a viabilidade da abordagem em diferentes contextos industriais.",
    pdfUrl: "#",
  },
  {
    id: "4",
    title: "Narrativas Digitais e Construção de Identidade nas Redes Sociais",
    type: "Dissertação",
    author: "Pedro Henrique Almeida",
    advisor: "Profa. Dra. Luciana Ferreira",
    year: 2023,
    program: "Programa de Pós-Graduação em Comunicação e Mediações Contemporâneas",
    keywords: ["comunicação digital", "redes sociais", "identidade", "narrativas"],
    abstract: "Esta dissertação investiga como as narrativas digitais construídas em redes sociais influenciam a formação de identidades contemporâneas. Utilizando análise de discurso e etnografia digital, o estudo mapeia as estratégias narrativas empregadas por jovens adultos em plataformas como Instagram e TikTok, revelando padrões de autorrepresentação e construção de comunidades virtuais.",
    pdfUrl: "#",
  },
  {
    id: "5",
    title: "Patrimônio Industrial de Joinville: Memória, Preservação e Ressignificação",
    type: "Tese",
    author: "Juliana Cristina Weber",
    advisor: "Prof. Dr. Roberto Carlos Machado",
    year: 2022,
    program: "Programa de Pós-Graduação em Patrimônio Cultural e Sociedade",
    keywords: ["patrimônio industrial", "memória", "preservação", "Joinville"],
    abstract: "Esta tese analisa o patrimônio industrial de Joinville sob a perspectiva da memória coletiva e das políticas de preservação. A pesquisa documenta edifícios e complexos industriais históricos, investigando processos de tombamento e projetos de ressignificação de espaços industriais desativados. O trabalho contribui para o debate sobre patrimônio e desenvolvimento urbano sustentável.",
    pdfUrl: "#",
  },
  {
    id: "6",
    title: "Otimização de Processos Produtivos na Indústria Têxtil: Uma Abordagem Sustentável",
    type: "Dissertação",
    author: "Fernando Augusto Ramos",
    advisor: "Prof. Dr. Carlos Eduardo Pereira",
    year: 2024,
    program: "Programa de Pós-Graduação em Engenharia e Gestão de Processos Sustentáveis",
    keywords: ["engenharia de produção", "sustentabilidade", "indústria têxtil", "otimização"],
    abstract: "Esta dissertação propõe metodologias de otimização de processos produtivos na indústria têxtil com foco em sustentabilidade. Através de análises de ciclo de vida e implementação de princípios de economia circular, o estudo demonstra reduções significativas no consumo de água e energia, além de minimização de resíduos. Os resultados apontam caminhos viáveis para a transição sustentável do setor.",
    pdfUrl: "#",
  },
  {
    id: "7",
    title: "Inclusão Digital e Educação de Jovens e Adultos: Desafios e Perspectivas",
    type: "Dissertação",
    author: "Adriana Souza Martins",
    advisor: "Profa. Dra. Mariana Costa Silva",
    year: 2023,
    program: "Programa de Pós-Graduação em Educação",
    keywords: ["inclusão digital", "EJA", "educação de adultos", "tecnologia educacional"],
    abstract: "Esta dissertação investiga os desafios da inclusão digital na Educação de Jovens e Adultos (EJA) em escolas municipais de Joinville. A pesquisa qualitativa identifica barreiras de acesso, competências digitais e estratégias pedagógicas para integração de tecnologias no processo educativo. Os resultados subsidiam propostas de políticas públicas para democratização do acesso digital.",
    pdfUrl: "#",
  },
  {
    id: "8",
    title: "Qualidade de Vida e Saúde Mental de Trabalhadores da Indústria",
    type: "Tese",
    author: "Gustavo Henrique Lopes",
    advisor: "Prof. Dr. Antonio Carlos Ribeiro",
    year: 2022,
    program: "Programa de Pós-Graduação em Saúde e Meio Ambiente",
    keywords: ["saúde mental", "qualidade de vida", "trabalhadores", "indústria"],
    abstract: "Esta tese analisa a relação entre condições de trabalho, qualidade de vida e saúde mental de trabalhadores industriais da região de Joinville. O estudo longitudinal acompanhou 500 trabalhadores durante dois anos, identificando fatores de risco e proteção para transtornos mentais. A pesquisa propõe intervenções organizacionais baseadas em evidências para promoção da saúde mental no trabalho.",
    pdfUrl: "#",
  },
];
