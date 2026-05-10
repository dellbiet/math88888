import { Link, useParams } from "wouter";
import { getAllLessons } from "@/data/curriculum";
import { AppLayout } from "@/components/layout/AppLayout";
import { QuizSection, QuizResult } from "@/components/QuizSection";
import { Button } from "@/components/ui/button";
import { ChevronLeft, PenTool, Clock, Award } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { Card, CardContent } from "@/components/ui/card";

type AttemptRecord = { date: string; score: number; total: number; timeSeconds: number };

export default function Practice() {
  const { lessonId } = useParams();
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

  const historyKey = `toan8-history-${lesson.id}`;
  const getHistory = (): AttemptRecord[] => {
    try { return JSON.parse(localStorage.getItem(historyKey) || "[]"); }
    catch { return []; }
  };
  
  const history = getHistory();

  const handleComplete = (result: QuizResult) => {
    saveQuizScore(lesson.id, result.score);
    const newRecord: AttemptRecord = {
      date: new Date().toISOString(),
      score: result.score,
      total: result.total,
      timeSeconds: result.timeSeconds
    };
    const newHistory = [newRecord, ...history].slice(0, 3);
    localStorage.setItem(historyKey, JSON.stringify(newHistory));
  };

  const isPracticeOnly = lesson.type === "practice" || lesson.type === "chapter-test";

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b">
          <div className="flex items-center gap-4">
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
          
          {history.length > 0 && (
            <Card className="bg-muted/50 border-none shadow-none">
              <CardContent className="p-3 py-2 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Award className="w-4 h-4 text-primary" />
                  <span>Kỷ lục: <strong className="text-foreground">{Math.max(...history.map(h => h.score))}</strong> điểm</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {isPracticeOnly && (
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <PenTool className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold mb-2">Bắt đầu luyện tập</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Bài này tập trung vào việc rèn luyện kỹ năng giải toán. Hãy đọc kỹ câu hỏi và chọn đáp án chính xác nhất. Bạn có thể sử dụng giấy nháp để tính toán trước khi trả lời.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <QuizSection 
              questions={lesson.quiz} 
              lessonId={lesson.id} 
              chapterId={lesson.chapterId} 
              onComplete={handleComplete} 
            />
          </div>
          
          <div className="lg:col-span-1 space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Lịch sử làm bài
            </h3>
            {history.length === 0 ? (
              <p className="text-sm text-muted-foreground">Chưa có dữ liệu</p>
            ) : (
              <div className="space-y-3">
                {history.map((record, i) => (
                  <Card key={i} className="bg-card shadow-sm text-sm">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex justify-between font-medium">
                        <span>{new Date(record.date).toLocaleDateString('vi-VN')}</span>
                        <span className={record.score >= record.total * 0.8 ? "text-green-600" : record.score >= record.total * 0.5 ? "text-amber-600" : "text-red-600"}>
                          {record.score}/{record.total}
                        </span>
                      </div>
                      <div className="text-muted-foreground flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {Math.floor(record.timeSeconds / 60)}:{(record.timeSeconds % 60).toString().padStart(2, '0')}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
