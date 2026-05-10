import { useState, useEffect, useCallback } from "react";

type ProgressData = {
  completedLessons: string[];
  lastVisited: string | null;
  quizScores: Record<string, number>;
};

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(() => {
    const saved = localStorage.getItem("toan8-progress");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return { completedLessons: [], lastVisited: null, quizScores: {} };
  });

  useEffect(() => {
    localStorage.setItem("toan8-progress", JSON.stringify(progress));
  }, [progress]);

  const markCompleted = useCallback((lessonId: string) => {
    setProgress(p => {
      if (p.completedLessons.includes(lessonId)) return p;
      return { ...p, completedLessons: [...p.completedLessons, lessonId] };
    });
  }, []);

  const setLastVisited = useCallback((lessonId: string) => {
    setProgress(p => ({ ...p, lastVisited: lessonId }));
  }, []);

  const saveQuizScore = useCallback((lessonId: string, score: number) => {
    setProgress(p => ({ ...p, quizScores: { ...p.quizScores, [lessonId]: score } }));
    markCompleted(lessonId);
  }, [markCompleted]);

  return { progress, markCompleted, setLastVisited, saveQuizScore };
}
