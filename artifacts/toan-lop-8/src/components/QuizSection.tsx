import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, RotateCcw, HelpCircle, Shuffle, Star, Clock, AlertCircle } from "lucide-react";
import { QuizQuestion } from "@/data/curriculum";
import { topicGenerators, generateUnique } from "@/lib/generators";

export type QuizResult = {
  score: number;
  total: number;
  timeSeconds: number;
  answers: Record<string, string>;
};

interface QuizSectionProps {
  questions: QuizQuestion[];
  lessonId: string;
  chapterId?: string;
  onComplete: (result: QuizResult) => void;
}

export function QuizSection({ questions, lessonId, chapterId, onComplete }: QuizSectionProps) {
  const [mode, setMode] = useState<"practice" | "test">("practice");
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<Record<string, boolean>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [isShaking, setIsShaking] = useState(false);

  // Initialize questions
  useEffect(() => {
    initQuestions(questions);
  }, [questions]);

  const initQuestions = (qs: QuizQuestion[]) => {
    const shuffled = [...qs].sort(() => 0.5 - Math.random()).slice(0, 8);
    setActiveQuestions(shuffled);
    setCurrentQuestionIdx(0);
    setAnswers({});
    setIsSubmitted({});
    setShowExplanation({});
    setScore(0);
    setIsFinished(false);
    setTimeSeconds(0);
  };

  // Timer
  useEffect(() => {
    if (isFinished) return;
    const interval = setInterval(() => {
      setTimeSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isFinished]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const question = activeQuestions[currentQuestionIdx];
  if (!question) return null;

  const currentAnswer = answers[question.id];
  const isCurrentSubmitted = isSubmitted[question.id];

  const handleSelectOption = (optionId: string) => {
    if (isCurrentSubmitted) return;
    setAnswers(prev => ({ ...prev, [question.id]: optionId }));
  };

  const handleSubmit = () => {
    if (!currentAnswer) return;
    
    const isCorrect = currentAnswer === question.correctOptionId;
    
    if (mode === "practice") {
      setIsSubmitted(prev => ({ ...prev, [question.id]: true }));
      if (isCorrect) {
        setScore(s => s + 1);
      } else {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      }
    } else {
      handleNext();
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx < activeQuestions.length - 1) {
      setCurrentQuestionIdx(idx => idx + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    let finalScore = score;
    if (mode === "test") {
      finalScore = activeQuestions.reduce((acc, q) => {
        return acc + (answers[q.id] === q.correctOptionId ? 1 : 0);
      }, 0);
      setScore(finalScore);
    }
    
    setIsFinished(true);
    onComplete({
      score: finalScore,
      total: activeQuestions.length,
      timeSeconds,
      answers
    });
  };

  const handleRandomize = () => {
    if (chapterId && topicGenerators[chapterId]) {
      const generator = topicGenerators[chapterId];
      const newQs: QuizQuestion[] = [];
      for (let i = 0; i < 5; i++) {
        const diff = Math.random() < 0.3 ? 1 : Math.random() < 0.7 ? 2 : 3;
        const q = generateUnique(generator, diff as 1|2|3);
        newQs.push(q);
      }
      initQuestions(newQs);
    } else {
      initQuestions(questions);
    }
  };

  if (isFinished) {
    const percentage = Math.round((score / activeQuestions.length) * 100);
    let stars = 1;
    if (percentage >= 80) stars = 3;
    else if (percentage >= 60) stars = 2;

    return (
      <Card className="max-w-2xl mx-auto border-primary/20 shadow-md">
        <CardContent className="pt-6 text-center space-y-6">
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3].map(star => (
              <Star 
                key={star} 
                className={`w-12 h-12 ${star <= stars ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground/30"}`} 
              />
            ))}
          </div>
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <span className="text-3xl font-bold text-primary">{percentage}%</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">Hoàn thành bài tập!</h3>
            <p className="text-muted-foreground text-lg">
              Bạn đạt {score}/{activeQuestions.length} câu đúng.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              Thời gian: {formatTime(timeSeconds)}
            </div>
          </div>
          
          {percentage < 50 && (
            <div className="bg-amber-500/10 text-amber-600 dark:text-amber-500 p-4 rounded-lg flex items-start gap-3 text-left border border-amber-500/20">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium mb-1">Bạn nên ôn lại lý thuyết trước khi làm bài!</p>
                <p className="text-sm">Kết quả chưa đạt yêu cầu. Hãy xem lại bài học và thử lại nhé.</p>
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button onClick={() => initQuestions(questions)} size="lg" className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Làm lại
            </Button>
            <Button onClick={handleRandomize} variant="outline" size="lg" className="gap-2">
              <Shuffle className="w-4 h-4" />
              Random đề mới
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isTestMode = mode === "test";
  const progressValue = ((currentQuestionIdx + (isTestMode && currentAnswer ? 1 : 0)) / activeQuestions.length) * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-center mb-6">
        <div className="bg-muted p-1 rounded-lg flex gap-1">
          <Button 
            variant={mode === "practice" ? "default" : "ghost"} 
            size="sm" 
            onClick={() => setMode("practice")}
            className="rounded-md"
          >
            Luyện tập
          </Button>
          <Button 
            variant={mode === "test" ? "default" : "ghost"} 
            size="sm" 
            onClick={() => setMode("test")}
            className="rounded-md"
          >
            Kiểm tra
          </Button>
        </div>
      </div>

      <Card className="max-w-2xl mx-auto shadow-sm">
        <div className="w-full bg-muted h-1 rounded-t-xl overflow-hidden">
          <div 
            className="bg-primary h-full transition-all duration-300" 
            style={{ width: `${progressValue}%` }} 
          />
        </div>
        <CardHeader>
          <div className="flex justify-between items-center mb-2 text-sm text-muted-foreground font-medium">
            <span>Câu {currentQuestionIdx + 1} / {activeQuestions.length}</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {formatTime(timeSeconds)}
            </div>
          </div>
          <CardTitle className="text-xl leading-relaxed">{question.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup 
            value={currentAnswer || ""} 
            onValueChange={handleSelectOption} 
            disabled={isCurrentSubmitted} 
            className={`space-y-3 ${isShaking ? 'animate-shake' : ''}`}
          >
            {question.options.map(option => {
              const isCorrect = option.id === question.correctOptionId;
              const isSelected = option.id === currentAnswer;
              
              let bgClass = "bg-card";
              let borderClass = "border-input";
              
              if (isCurrentSubmitted && mode === "practice") {
                if (isCorrect) {
                  bgClass = "bg-green-500/10 dark:bg-green-500/20";
                  borderClass = "border-green-500";
                } else if (isSelected && !isCorrect) {
                  bgClass = "bg-destructive/10 dark:bg-destructive/20";
                  borderClass = "border-destructive";
                }
              } else if (isSelected) {
                bgClass = "bg-primary/5 dark:bg-primary/10";
                borderClass = "border-primary";
              }

              return (
                <Label
                  key={option.id}
                  htmlFor={option.id}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer hover:bg-accent/50 ${bgClass} ${borderClass}`}
                >
                  <RadioGroupItem value={option.id} id={option.id} className="mt-0.5" />
                  <span className="text-base flex-1">{option.text}</span>
                  {isCurrentSubmitted && mode === "practice" && isCorrect && <CheckCircle className="w-5 h-5 text-green-500" />}
                  {isCurrentSubmitted && mode === "practice" && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-destructive" />}
                </Label>
              );
            })}
          </RadioGroup>

          {isCurrentSubmitted && mode === "practice" && question.explanation && (
            <div className="pt-4 border-t animate-in fade-in">
              <Button 
                variant="outline" 
                onClick={() => setShowExplanation(prev => ({ ...prev, [question.id]: !prev[question.id] }))}
                className="gap-2 w-full sm:w-auto"
              >
                <HelpCircle className="w-4 h-4" />
                {showExplanation[question.id] ? "Ẩn lời giải" : "Xem lời giải chi tiết"}
              </Button>
              
              {showExplanation[question.id] && (
                <div className="mt-4 p-4 bg-muted/50 rounded-lg text-sm leading-relaxed animate-in slide-in-from-top-2">
                  <p className="font-semibold mb-1 text-primary">Lời giải:</p>
                  {question.explanation}
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-4 flex flex-col sm:flex-row justify-between gap-4">
          <Button onClick={handleRandomize} variant="ghost" className="gap-2 self-start text-muted-foreground">
            <Shuffle className="w-4 h-4" />
            Random đề mới
          </Button>
          <div className="flex-1 flex justify-end">
            {!isCurrentSubmitted && mode === "practice" ? (
              <Button onClick={handleSubmit} disabled={!currentAnswer} size="lg" className="px-8 w-full sm:w-auto shadow-sm">
                Kiểm tra
              </Button>
            ) : (
              <Button onClick={handleNext} disabled={mode === "test" && !currentAnswer} size="lg" className="px-8 gap-2 w-full sm:w-auto shadow-sm">
                {currentQuestionIdx < activeQuestions.length - 1 ? "Câu tiếp theo" : "Nộp bài"}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
