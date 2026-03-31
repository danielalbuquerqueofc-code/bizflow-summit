import { AppLayout } from "@/components/layout/AppLayout";
import { Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <AppLayout title={title}>
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center animate-fade-in">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mb-4">
          <Construction className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="text-lg font-semibold mb-1">{title}</h2>
        <p className="text-sm text-muted-foreground max-w-md">
          {description || "Este módulo está em desenvolvimento. Em breve estará disponível."}
        </p>
      </div>
    </AppLayout>
  );
}
