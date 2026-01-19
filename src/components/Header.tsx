import { BookOpen, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import logoUnivlle from "@/assets/logo-univille.png";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
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
          <Button variant="ghost" size="icon" asChild>
            <Link to="/admin/login" aria-label="Área Administrativa">
              <Settings className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
