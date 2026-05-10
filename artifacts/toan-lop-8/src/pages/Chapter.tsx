import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { curriculum } from "@/data/curriculum";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, CheckCircle } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

export default function Chapter() {
  const { chapterId } = useParams();
  const { progress } = useProgress();
  const chapter = curriculum.find(c => c.id === chapterId);

  if (!chapter) {
    return (
      <AppLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">Không tìm thấy chương</h2>
          <Link href="/">
            <Button className="mt-4">Quay về trang chủ</Button>
          </Link>
        </div>
      </AppLayout>
    );
  }

  const completedCount = chapter.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
  const progressPercentage = Math.round((completedCount / chapter.lessons.length) * 100);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="pb-4 border-b">
          <h1 className="text-3xl font-bold tracking-tight mb-2">{chapter.title}</h1>
          <p className="text-muted-foreground">
            Tiến độ: {completedCount}/{chapter.lessons.length} bài đã hoàn thành ({progressPercentage}%)
          </p>
        </div>

        <div className="grid gap-4">
          {chapter.lessons.map((lesson, idx) => {
            const isCompleted = progress.completedLessons.includes(lesson.id);
            const score = progress.quizScores[lesson.id];
            
            return (
              <Card key={lesson.id} className="transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-start justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">
                      {idx + 1}. {lesson.title}
                    </CardTitle>
                    {isCompleted && score !== undefined && (
                      <CardDescription>Điểm bài tập: {score}/{lesson.quiz.length}</CardDescription>
                    )}
                  </div>
                  {isCompleted && <CheckCircle className="h-6 w-6 text-primary" />}
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3 pt-4">
                    <Link href={`/bai/${lesson.id}`}>
                      <Button variant={isCompleted ? "outline" : "default"} className="gap-2">
                        <Play className="h-4 w-4" />
                        {isCompleted ? "Ôn tập lại" : "Học bài này"}
                      </Button>
                    </Link>
                    <Link href={`/luyen-tap/${lesson.id}`}>
                      <Button variant="secondary" className="gap-2">
                        Làm bài tập
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
