import { Link, useLocation } from "wouter";
import { Calculator, BarChart2, CheckCircle, BookOpen, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { curriculum } from "@/data/curriculum";
import { useProgress } from "@/hooks/useProgress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function Sidebar({ className }: { className?: string }) {
  const [location] = useLocation();
  const { progress } = useProgress();

  return (
    <div className={cn("pb-12 border-r bg-sidebar text-sidebar-foreground", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Toán Lớp 8
          </h2>
          <div className="space-y-1">
            <Link href="/" className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary hover:bg-sidebar-accent", location === "/" ? "bg-sidebar-accent text-primary" : "text-sidebar-foreground")}>
              <BookOpen className="h-4 w-4" />
              Tổng quan
            </Link>
            <Link href="/do-thi" className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary hover:bg-sidebar-accent", location === "/do-thi" ? "bg-sidebar-accent text-primary" : "text-sidebar-foreground")}>
              <BarChart2 className="h-4 w-4" />
              Vẽ đồ thị
            </Link>
          </div>
        </div>
        <div className="py-2">
          <h2 className="mb-2 px-7 text-lg font-semibold tracking-tight">
            Chương trình học
          </h2>
          <ScrollArea className="h-[calc(100vh-200px)] px-4">
            <Accordion type="multiple" defaultValue={curriculum.map(c => c.id)} className="w-full">
              {curriculum.map((chapter) => {
                const chapterLessons = chapter.lessons;
                const completedCount = chapterLessons.filter(l => progress.completedLessons.includes(l.id)).length;
                
                return (
                  <AccordionItem value={chapter.id} key={chapter.id} className="border-none">
                    <AccordionTrigger className="hover:no-underline py-2 text-sm font-medium hover:text-primary data-[state=open]:text-primary">
                      <div className="flex flex-col items-start gap-1">
                        <span>{chapter.title}</span>
                        <span className="text-xs font-normal text-sidebar-foreground/60">
                          {completedCount}/{chapterLessons.length} bài đã hoàn thành
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col space-y-1 mt-2">
                        {chapterLessons.map(lesson => {
                          const isCompleted = progress.completedLessons.includes(lesson.id);
                          const isActive = location.startsWith(`/bai/${lesson.id}`) || location.startsWith(`/luyen-tap/${lesson.id}`);
                          return (
                            <Link 
                              key={lesson.id} 
                              href={`/bai/${lesson.id}`}
                              className={cn(
                                "flex items-center justify-between rounded-md px-3 py-2 text-sm transition-all hover:bg-sidebar-accent hover:text-primary",
                                isActive ? "bg-sidebar-accent text-primary font-medium" : "text-sidebar-foreground/80"
                              )}
                            >
                              <span className="truncate pr-2">{lesson.title}</span>
                              {isCompleted && <CheckCircle className="h-3 w-3 text-primary shrink-0" />}
                            </Link>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
