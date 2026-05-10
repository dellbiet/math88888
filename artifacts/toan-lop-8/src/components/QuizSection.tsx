import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { QuizQuestion } from "@/data/curriculum";

interface QuizSectionProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

export function QuizSection({ questions, onComplete }: QuizSectionProps) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question = questions[currentQuestionIdx];

  const handleSubmit = () => {
    if (!selectedOption) return;
    
    setIsSubmitted(true);
    if (selectedOption === question.correctOptionId) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(idx => idx + 1);
      setSelectedOption("");
      setIsSubmitted(false);
    } else {
      setIsFinished(true);
      onComplete(score + (selectedOption === question.correctOptionId ? 1 : 0));
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption("");
    setIsSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <Card className="max-w-2xl mx-auto border-primary/20 shadow-md">
        <CardContent className="pt-6 text-center space-y-6">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <span className="text-3xl font-bold text-primary">{percentage}%</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">Hoàn thành bài tập!</h3>
            <p className="text-muted-foreground text-lg">
              Bạn đạt {score}/{questions.length} câu đúng.
            </p>
          </div>
          <Button onClick={handleRetry} size="lg" className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Làm lại
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-center mb-2 text-sm text-muted-foreground font-medium">
          <span>Câu {currentQuestionIdx + 1} / {questions.length}</span>
          <span>Điểm: {score}</span>
        </div>
        <CardTitle className="text-xl leading-relaxed">{question.question}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedOption} onValueChange={setSelectedOption} disabled={isSubmitted} className="space-y-3">
          {question.options.map(option => {
            const isCorrect = option.id === question.correctOptionId;
            const isSelected = option.id === selectedOption;
            
            let bgClass = "bg-card";
            let borderClass = "border-input";
            
            if (isSubmitted) {
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
                {isSubmitted && isCorrect && <CheckCircle className="w-5 h-5 text-green-500" />}
                {isSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-destructive" />}
              </Label>
            );
          })}
        </RadioGroup>
      </CardContent>
      <CardFooter className="pt-4 flex justify-end">
        {!isSubmitted ? (
          <Button onClick={handleSubmit} disabled={!selectedOption} size="lg" className="px-8">
            Kiểm tra
          </Button>
        ) : (
          <Button onClick={handleNext} size="lg" className="px-8 gap-2">
            {currentQuestionIdx < questions.length - 1 ? "Câu tiếp theo" : "Hoàn thành"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
