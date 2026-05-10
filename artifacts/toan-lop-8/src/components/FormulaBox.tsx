export function FormulaBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 p-6 rounded-xl border border-primary/20 bg-primary/5 dark:bg-primary/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
      <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Công thức ghi nhớ</h4>
      <div className="text-lg font-mono tracking-tight font-medium text-foreground">
        {children}
      </div>
    </div>
  );
}
