import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AppHeaderProps {
  title?: string;
}

export function AppHeader({ title }: AppHeaderProps) {
  return (
    <header className="h-14 flex items-center gap-3 border-b bg-card px-4 shrink-0">
      <SidebarTrigger className="text-muted-foreground hover:text-foreground" />

      {title && (
        <h1 className="text-sm font-semibold text-foreground hidden sm:block">
          {title}
        </h1>
      )}

      <div className="flex-1" />

      <div className="relative hidden md:block w-64">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <Input
          placeholder="Buscar produtos, clientes..."
          className="pl-8 h-8 text-sm bg-muted/50 border-0 focus-visible:ring-1"
        />
      </div>

      <Button variant="ghost" size="icon" className="relative h-8 w-8 text-muted-foreground hover:text-foreground">
        <Bell className="h-4 w-4" />
        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
          3
        </span>
      </Button>

      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground cursor-pointer">
        U
      </div>
    </header>
  );
}
