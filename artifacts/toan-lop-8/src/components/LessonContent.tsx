import { Lesson } from "@/data/curriculum";
import { FormulaBox } from "./FormulaBox";
import { Card, CardContent } from "./ui/card";

export function LessonContent({ lesson }: { lesson: Lesson }) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-foreground">
          {lesson.title}
        </h1>
        <div className="h-1 w-20 bg-primary rounded-full" />
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <div className="space-y-4 text-lg leading-relaxed text-foreground/90">
          {lesson.content.theory.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {lesson.content.formulas.length > 0 && (
          <div className="my-8">
            {lesson.content.formulas.map((formula, i) => (
              <FormulaBox key={i}>{formula}</FormulaBox>
            ))}
          </div>
        )}

        {lesson.content.examples.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Ví dụ minh họa</h2>
            <div className="space-y-6">
              {lesson.content.examples.map((example, i) => (
                <Card key={i} className="overflow-hidden border-border/50">
                  <div className="bg-muted/50 px-6 py-4 border-b border-border/50">
                    <h3 className="font-semibold m-0 text-base">Ví dụ {i + 1}: {example.question}</h3>
                  </div>
                  <CardContent className="p-6">
                    <p className="font-medium mb-3 text-sm text-muted-foreground uppercase tracking-wider">Lời giải:</p>
                    <ol className="list-decimal list-inside space-y-2 m-0 text-foreground/90">
                      {example.solution.map((step, j) => (
                        <li key={j} className="pl-2">{step}</li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
