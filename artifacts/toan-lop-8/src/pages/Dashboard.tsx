import { Link } from "wouter";
import { curriculum, getAllLessons } from "@/data/curriculum";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/hooks/useProgress";
import { BookOpen, Trophy, PlayCircle, BarChart2, Hash, Equal, Square, Triangle, Shuffle, Scaling, Box, TrendingUp, Divide, FlaskConical } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{className?: string}>> = {
  Hash, Equal, Square, Triangle, BarChart2, Divide, TrendingUp, Shuffle, Scaling, Box, FlaskConical
};

export default function Dashboard() {
  const { progress } = useProgress();
  const allLessons = getAllLessons();
  
  const completedLessonsCount = progress.completedLessons.length;
  const totalLessons = allLessons.length;
  const overallProgress = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;
  
  const lastVisitedLesson = progress.lastVisited ? allLessons.find(l => l.id === progress.lastVisited) : null;
  const nextLessonToLearn = allLessons.find(l => !progress.completedLessons.includes(l.id)) || allLessons[0];

  const continueUrl = lastVisitedLesson 
    ? (lastVisitedLesson.type === 'practice' || lastVisitedLesson.type === 'chapter-test' ? `/luyen-tap/${lastVisitedLesson.id}` : `/bai/${lastVisitedLesson.id}`)
    : (nextLessonToLearn ? (nextLessonToLearn.type === 'practice' || nextLessonToLearn.type === 'chapter-test' ? `/luyen-tap/${nextLessonToLearn.id}` : `/bai/${nextLessonToLearn.id}`) : '/');

  return (
    <AppLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="bg-primary text-primary-foreground rounded-2xl p-8 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Chào mừng bạn trở lại!</h1>
            <p className="text-primary-foreground/90 text-lg mb-6 leading-relaxed">
              Học toán không khó, chỉ cần bạn kiên trì. Hãy tiếp tục hành trình chinh phục môn Toán Lớp 8 nhé.
            </p>
            <Link href={continueUrl}>
              <Button size="lg" variant="secondary" className="font-semibold gap-2">
                <PlayCircle className="w-5 h-5" />
                Tiếp tục học
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="shadow-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tiến độ tổng thể</CardTitle>
              <BarChart2 className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{overallProgress}%</div>
              <Progress value={overallProgress} className="h-2" />
            </CardContent>
          </Card>

          <Card className="shadow-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Bài học hoàn thành</CardTitle>
              <BookOpen className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedLessonsCount} / {totalLessons}</div>
              <p className="text-xs text-muted-foreground mt-1">bài đã học</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Điểm tích lũy</CardTitle>
              <Trophy className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Object.values(progress.quizScores).reduce((a, b) => a + b, 0)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">điểm từ các bài luyện tập</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 mt-10">
          <h2 className="text-2xl font-bold tracking-tight">Chương trình học</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {curriculum.map(chapter => {
              const chapterCompleted = chapter.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
              const chapterProgress = chapter.lessons.length > 0 ? Math.round((chapterCompleted / chapter.lessons.length) * 100) : 0;
              const IconComponent = iconMap[chapter.icon] || BookOpen;
              
              return (
                <Link key={chapter.id} href={`/chuong/${chapter.id}`}>
                  <Card className="h-full transition-all hover:shadow-md hover:border-primary/50 cursor-pointer group">
                    <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                      <div className={`p-2 rounded-lg bg-primary/10 ${chapter.color}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">{chapter.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span>{chapterCompleted}/{chapter.lessons.length} bài</span>
                        <span>{chapterProgress}%</span>
                      </div>
                      <Progress value={chapterProgress} className="h-1.5" />
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
