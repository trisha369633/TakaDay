import { useEffect, useState } from "react";
import type { Expense } from "../types";

const EXPENSES_STORAGE_KEY = "trisha-damn-expenses";

function getDateKey(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function readExpenses(): Expense[] {
  const storedExpenses = localStorage.getItem(EXPENSES_STORAGE_KEY);

  if (!storedExpenses) {
    return [];
  }

  try {
    const parsedExpenses: unknown = JSON.parse(storedExpenses);

    if (!Array.isArray(parsedExpenses)) {
      return [];
    }

    return parsedExpenses.filter((expense): expense is Expense => {
      if (typeof expense !== "object" || expense === null) {
        return false;
      }

      const candidate = expense as Record<string, unknown>;
      return (
        typeof candidate.id === "string" &&
        typeof candidate.amount === "number" &&
        Number.isFinite(candidate.amount) &&
        candidate.amount > 0 &&
        typeof candidate.description === "string" &&
        typeof candidate.date === "string"
      );
    });
  } catch {
    return [];
  }
}

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>(readExpenses);

  useEffect(() => {
    localStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  function addExpense(amount: number, description: string) {
    const trimmedDescription = description.trim();

    if (!Number.isFinite(amount) || amount <= 0 || !trimmedDescription) {
      return;
    }

    setExpenses((currentExpenses) => [
      ...currentExpenses,
      {
        id: crypto.randomUUID(),
        amount,
        description: trimmedDescription,
        date: getDateKey(new Date()),
      },
    ]);
  }

  function removeExpense(id: string) {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== id),
    );
  }

  function clearMonth(monthKey: string) {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => !expense.date.startsWith(monthKey)),
    );
  }

  return { expenses, addExpense, removeExpense, clearMonth };
}

export function getTodayExpenses(expenses: Expense[]): Expense[] {
  const today = getDateKey(new Date());
  return expenses.filter((expense) => expense.date === today);
}

export function getCurrentMonthTotal(expenses: Expense[]): number {
  const currentMonth = getCurrentMonthKey();
  return expenses
    .filter((expense) => expense.date.slice(0, 7) === currentMonth)
    .reduce((total, expense) => total + expense.amount, 0);
}

export function getCurrentMonthKey(): string {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
}
