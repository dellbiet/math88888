import { Link, useLocation } from "wouter";
import { BookOpen, BarChart2, FlaskConical, Hash, Equal, Square, Triangle, Shuffle, Scaling, Box, TrendingUp, Divide, CheckCircle, Home, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { curriculum } from "@/data/curriculum";
import { useProgress } from "@/hooks/useProgress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import React from "react";

const iconMap: Record<string, React.ComponentType<{className?: string}>> = {
  Hash, Equal, Square, Triangle, BarChart2, Divide, TrendingUp, Shuffle, Scaling, Box, FlaskConical
};

export function Sidebar({ className }: { className?: string }) {
  const [location] = useLocation();
  const { progress } = useProgress();

  return (
    <div className={cn("pb-12 border-r bg-sidebar text-sidebar-foreground", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 mb-2 px-4">
            <BookOpen className="h-5 w-5 text-primary" />
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Toán Lớp 8</h2>
            </div>
          </div>
          <div className="space-y-1 mt-4">
            <Link href="/" className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary hover:bg-sidebar-accent", location === "/" ? "bg-sidebar-accent text-primary" : "text-sidebar-foreground")}>
              <Home className="h-4 w-4" />
              Tổng quan
            </Link>
            <Link href="/do-thi" className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary hover:bg-sidebar-accent", location === "/do-thi" ? "bg-sidebar-accent text-primary" : "text-sidebar-foreground")}>
              <BarChart2 className="h-4 w-4" />
              Vẽ đồ thị
            </Link>
            <Link href="/thuc-hanh" className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary hover:bg-sidebar-accent", location === "/thuc-hanh" ? "bg-sidebar-accent text-primary" : "text-sidebar-foreground")}>
              <FlaskConical className="h-4 w-4" />
              Thực hành
            </Link>
          </div>
        </div>
        <div className="py-2">
          <h2 className="mb-2 px-7 text-xs font-bold tracking-wider text-muted-foreground uppercase">
            MỤC LỤC
          </h2>
          <ScrollArea className="h-[calc(100vh-180px)] px-4">
            <Accordion type="multiple" className="w-full">
              {curriculum.map((chapter) => {
                const IconComponent = iconMap[chapter.icon] || BookOpen;
                const chapterLessons = chapter.lessons;
                const completedCount = chapterLessons.filter(l => progress.completedLessons.includes(l.id)).length;
                const isChapterActive = chapterLessons.some(l => location.startsWith(`/bai/${l.id}`) || location.startsWith(`/luyen-tap/${l.id}`));
                
                return (
                  <AccordionItem value={chapter.id} key={chapter.id} className="border-none mb-1">
                    <AccordionTrigger className={cn("hover:no-underline py-2.5 px-3 rounded-md transition-colors hover:bg-sidebar-accent/50 data-[state=open]:bg-sidebar-accent/50", isChapterActive && "bg-sidebar-accent/50")}>
                      <div className="flex items-center gap-3 w-full overflow-hidden text-left">
                        <IconComponent className={cn("h-4 w-4 shrink-0", chapter.color)} />
                        <div className="flex flex-col items-start overflow-hidden w-full">
                          <span className="text-sm font-medium truncate w-full pr-2">{chapter.shortTitle}</span>
                          <span className="text-[10px] font-normal text-muted-foreground mt-0.5">
                            {completedCount}/{chapterLessons.length} bài
                          </span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-1 pt-1">
                      <div className="flex flex-col space-y-1 relative before:absolute before:inset-y-0 before:left-[19px] before:w-[1px] before:bg-border ml-2 my-1">
                        {chapterLessons.map(lesson => {
                          const isCompleted = progress.completedLessons.includes(lesson.id);
                          const isActive = location.startsWith(`/bai/${lesson.id}`) || location.startsWith(`/luyen-tap/${lesson.id}`);
                          
                          return (
                            <Link 
                              key={lesson.id} 
                              href={lesson.type === 'practice' || lesson.type === 'chapter-test' ? `/luyen-tap/${lesson.id}` : `/bai/${lesson.id}`}
                              className={cn(
                                "flex items-center justify-between rounded-md py-2 pr-3 pl-8 text-sm transition-all hover:text-primary relative group",
                                isActive ? "text-primary font-medium bg-primary/5" : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50",
                                lesson.type === "chapter-test" && "font-semibold"
                              )}
                            >
                              <div className={cn("absolute left-[10px] w-2 h-[1px] bg-border transition-colors", isActive && "bg-primary")} />
                              <div className="flex items-center gap-1.5 truncate pr-2">
                                {lesson.type === "chapter-test" && <Trophy className="h-3.5 w-3.5 text-amber-500 shrink-0" />}
                                <span className="truncate">{lesson.title}</span>
                              </div>
                              {isCompleted && <CheckCircle className="h-3.5 w-3.5 text-green-500 shrink-0" />}
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
