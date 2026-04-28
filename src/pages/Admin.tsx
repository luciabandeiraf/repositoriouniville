import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AcademicWorkForm from "@/components/admin/AcademicWorkForm";
import logo from "@/assets/logo-univille.png";

const Admin = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const { isAdmin, loading: roleLoading } = useIsAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();

  const loading = authLoading || roleLoading;

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/admin/login");
      return;
    }
    if (!isAdmin) {
      toast({
        title: "Acesso negado",
        description: "Sua conta não tem permissão de administrador.",
        variant: "destructive",
      });
      signOut().finally(() => navigate("/admin/login"));
    }
  }, [user, isAdmin, loading, navigate, signOut, toast]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Univille" className="h-10" />
            <span className="text-lg font-heading font-bold text-foreground">
              Área Administrativa
            </span>
          </div>
          <Button variant="outline" onClick={handleSignOut} className="gap-2">
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <AcademicWorkForm />
      </main>
    </div>
  );
};

export default Admin;
