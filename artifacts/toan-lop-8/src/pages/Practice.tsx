import { Link, useParams, useLocation } from "wouter";
import { getAllLessons } from "@/data/curriculum";
import { AppLayout } from "@/components/layout/AppLayout";
import { QuizSection } from "@/components/QuizSection";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

export default function Practice() {
  const { lessonId } = useParams();
  const [, setLocation] = useLocation();
  const { saveQuizScore } = useProgress();
  
  const allLessons = getAllLessons();
  const lesson = allLessons.find(l => l.id === lessonId);

  if (!lesson) {
    return (
      <AppLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">Không tìm thấy bài tập</h2>
        </div>
      </AppLayout>
    );
  }

  const handleComplete = (score: number) => {
    saveQuizScore(lesson.id, score);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4 pb-4 border-b">
          <Link href={`/bai/${lesson.id}`}>
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Luyện tập: {lesson.title}</h1>
            <p className="text-muted-foreground text-sm mt-1">Trả lời các câu hỏi trắc nghiệm sau</p>
          </div>
        </div>

        <div className="py-8">
          <QuizSection questions={lesson.quiz} onComplete={handleComplete} />
        </div>
      </div>
    </AppLayout>
  );
}
