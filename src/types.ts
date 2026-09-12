export interface Task {
  id: string;
  text: string;
  createdDate: string;
  completed: boolean;
}

export interface Expense {
  id: string;
  amount: number;
  description: string;
  date: string;
}
