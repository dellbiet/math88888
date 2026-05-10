import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { curriculum, getAllLessons } from "@/data/curriculum";
import { AppLayout } from "@/components/layout/AppLayout";
import { LessonContent } from "@/components/LessonContent";
import { GraphPlotter } from "@/components/GraphPlotter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, BookOpen, PenTool, BarChart2 } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

export default function Lesson() {
  const { lessonId } = useParams();
  const { setLastVisited } = useProgress();
  
  const allLessons = getAllLessons();
  const lessonIndex = allLessons.findIndex(l => l.id === lessonId);
  const lesson = allLessons[lessonIndex];

  useEffect(() => {
    if (lessonId) {
      setLastVisited(lessonId);
    }
  }, [lessonId, setLastVisited]);

  if (!lesson) {
    return (
      <AppLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">Không tìm thấy bài học</h2>
          <Link href="/">
            <Button className="mt-4">Quay về trang chủ</Button>
          </Link>
        </div>
      </AppLayout>
    );
  }

  const prevLesson = lessonIndex > 0 ? allLessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < allLessons.length - 1 ? allLessons[lessonIndex + 1] : null;

  return (
    <AppLayout>
      <div className="space-y-8">
        <Tabs defaultValue="theory" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8 h-12">
            <TabsTrigger value="theory" className="text-base gap-2">
              <BookOpen className="h-4 w-4" />
              Lý thuyết
            </TabsTrigger>
            {lesson.hasGraph && (
              <TabsTrigger value="graph" className="text-base gap-2">
                <BarChart2 className="h-4 w-4" />
                Đồ thị
              </TabsTrigger>
            )}
            <Link href={`/luyen-tap/${lesson.id}`} className="inline-flex">
              <TabsTrigger value="practice" className="text-base gap-2 w-full data-[state=inactive]:hover:bg-muted">
                <PenTool className="h-4 w-4" />
                Luyện tập
              </TabsTrigger>
            </Link>
          </TabsList>
          
          <TabsContent value="theory" className="mt-0 outline-none">
            <LessonContent lesson={lesson} />
          </TabsContent>
          
          {lesson.hasGraph && (
            <TabsContent value="graph" className="mt-0 outline-none">
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold mb-6">Công cụ vẽ đồ thị</h2>
                <GraphPlotter />
              </div>
            </TabsContent>
          )}
        </Tabs>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 mt-12 border-t border-border">
          {prevLesson ? (
            <Link href={`/bai/${prevLesson.id}`} className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                <ChevronLeft className="h-4 w-4" />
                <div className="flex flex-col items-start text-left">
                  <span className="text-xs text-muted-foreground font-normal">Bài trước</span>
                  <span className="truncate max-w-[200px]">{prevLesson.title}</span>
                </div>
              </Button>
            </Link>
          ) : <div className="w-full sm:w-auto" />}

          {nextLesson ? (
            <Link href={`/bai/${nextLesson.id}`} className="w-full sm:w-auto">
              <Button variant="default" size="lg" className="w-full sm:w-auto gap-2">
                <div className="flex flex-col items-end text-right">
                  <span className="text-xs text-primary-foreground/80 font-normal">Bài tiếp theo</span>
                  <span className="truncate max-w-[200px]">{nextLesson.title}</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          ) : <div className="w-full sm:w-auto" />}
        </div>
      </div>
    </AppLayout>
  );
}
