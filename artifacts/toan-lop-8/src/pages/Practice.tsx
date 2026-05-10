import { Link, useParams, useLocation } from "wouter";
import { getAllLessons } from "@/data/curriculum";
import { AppLayout } from "@/components/layout/AppLayout";
import { QuizSection } from "@/components/QuizSection";
import { Button } from "@/components/ui/button";
import { ChevronLeft, PenTool } from "lucide-react";
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

  const isPracticeOnly = lesson.type === "practice" || lesson.type === "chapter-test";

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4 pb-4 border-b">
          <Link href={`/chuong/${lesson.chapterId}`}>
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Luyện tập: {lesson.title}</h1>
            <p className="text-muted-foreground text-sm mt-1">Trả lời các câu hỏi trắc nghiệm sau</p>
          </div>
        </div>

        {isPracticeOnly && (
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 text-center mb-8">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <PenTool className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold mb-2">Bắt đầu luyện tập</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Bài này tập trung vào việc rèn luyện kỹ năng giải toán. Hãy đọc kỹ câu hỏi và chọn đáp án chính xác nhất. Bạn có thể sử dụng giấy nháp để tính toán trước khi trả lời.
            </p>
          </div>
        )}

        <div className="py-4">
          <QuizSection questions={lesson.quiz} onComplete={handleComplete} />
        </div>
      </div>
    </AppLayout>
  );
}