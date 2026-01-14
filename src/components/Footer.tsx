const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/30 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Univille - Universidade da Região de Joinville</p>
          <p>Repositório de Teses e Dissertações</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
