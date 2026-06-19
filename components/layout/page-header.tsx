import { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 border-b pb-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>

        {description && (
          <p className="text-muted-foreground mt-1 text-sm">{description}</p>
        )}
      </div>

      {action && <div className="flex items-center">{action}</div>}
    </div>
  );
}
