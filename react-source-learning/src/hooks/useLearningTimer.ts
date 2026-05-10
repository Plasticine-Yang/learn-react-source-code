import { useEffect, useRef, useCallback } from "react";
import { useProgressStore } from "@/stores/useProgressStore";

export function useLearningTimer(
  moduleId: string | null,
  sectionId: string | null,
) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const addTimeSpent = useProgressStore((s) => s.addTimeSpent);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!moduleId || !sectionId) {
      stopTimer();
      return;
    }

    // Record time every 10 seconds
    intervalRef.current = setInterval(() => {
      addTimeSpent(moduleId, sectionId, 10);
    }, 10000);

    return stopTimer;
  }, [moduleId, sectionId, addTimeSpent, stopTimer]);
}
