import { BookOpen } from "lucide-react";
import logoUnivlle from "@/assets/logo-univille.png";

const Header = () => {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          <img
            src={logoUnivlle}
            alt="Logo Univille"
            className="h-14 w-auto"
          />
          <div className="h-10 w-px bg-border" />
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-lg font-bold text-foreground leading-tight">
                Repositório de Teses e Dissertações
              </h1>
              <p className="text-sm text-muted-foreground">
                Universidade da Região de Joinville
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
