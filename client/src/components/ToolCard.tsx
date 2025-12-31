import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ToolCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

export default function ToolCard({ icon, title, description, href }: ToolCardProps) {
  return (
    <Link href={href}>
      <Card className="h-full flex flex-col border border-slate-200 hover:border-primary/50 hover:shadow-md transition-all duration-300 overflow-hidden group">
        <CardContent className="p-6 flex flex-col items-center text-center gap-4 flex-1">
          <div className="p-3 bg-slate-100 rounded-xl group-hover:bg-primary/10 transition-colors">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-600 flex-grow">{description}</p>
          <Button variant="outline" className="w-full mt-auto">
            Use Tool
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}