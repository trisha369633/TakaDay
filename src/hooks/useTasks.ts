import { useEffect, useState } from "react";
import type { Task } from "../types";

const TASKS_STORAGE_KEY = "trisha-damn-tasks";

function getTodayKey(date = new Date()): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function readTodaysTasks(today: string): Task[] {
  const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);

  if (!storedTasks) {
    return [];
  }

  try {
    const parsedTasks: unknown = JSON.parse(storedTasks);

    if (!Array.isArray(parsedTasks)) {
      return [];
    }

    return parsedTasks.filter((task): task is Task => {
      if (typeof task !== "object" || task === null) {
        return false;
      }

      const candidate = task as Record<string, unknown>;
      return (
        typeof candidate.id === "string" &&
        typeof candidate.text === "string" &&
        candidate.createdDate === today &&
        typeof candidate.completed === "boolean" &&
        !candidate.completed
      );
    });
  } catch {
    return [];
  }
}

export function useTasks() {
  const [today, setToday] = useState(() => getTodayKey());
  const [tasks, setTasks] = useState<Task[]>(() => readTodaysTasks(getTodayKey()));

  useEffect(() => {
    const nextDate = new Date();
    nextDate.setHours(24, 0, 0, 0);
    const nextToday = getTodayKey(nextDate);
    const timeout = window.setTimeout(() => {
      setToday(nextToday);
      setTasks(readTodaysTasks(nextToday));
    }, nextDate.getTime() - Date.now());

    return () => window.clearTimeout(timeout);
  }, [today]);

  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function addTask(text: string) {
    const trimmedText = text.trim();

    if (!trimmedText) {
      return;
    }

    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: crypto.randomUUID(),
        text: trimmedText,
        createdDate: getTodayKey(),
        completed: false,
      },
    ]);
  }

  function completeTask(id: string) {
    setTasks((currentTasks) =>
      currentTasks
        .map((task) => (task.id === id ? { ...task, completed: true } : task))
        .filter((task) => !task.completed),
    );
  }

  return { tasks, addTask, completeTask };
}
