import Header from "./components/Header/Header";
import TaskCard from "./components/Task/TaskCard";
import AddTask from "./components/Task/AddTask";
import ExpenseCard from "./components/Expense/ExpenseCard";
import AddExpense from "./components/Expense/AddExpense";
import MonthlySummary from "./components/Monthly/MonthlySummary";
import {
  getCurrentMonthKey,
  getCurrentMonthTotal,
  getTodayExpenses,
  useExpenses,
} from "./hooks/useExpenses";
import { useTasks } from "./hooks/useTasks";
import "./App.css";

function App() {
  const { tasks, addTask, completeTask } = useTasks();
  const { expenses, addExpense, removeExpense, clearMonth } = useExpenses();
  const todayExpenses = getTodayExpenses(expenses);
  const currentMonthTotal = getCurrentMonthTotal(expenses);

  return (
    <div className="app">
      <Header />

      <main className="app__grid">
        <section className="app__tasks" aria-labelledby="missions-title">
          <div className="section-heading">
            <h2 id="missions-title">Today's Missions</h2>
            <span className="section-heading__count">
              {tasks.length} pending
            </span>
          </div>

          <div className="task-list">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskCard key={task.id} task={task} onComplete={completeTask} />
              ))
            ) : (
              <p className="empty-state">Nothing to defeat yet.</p>
            )}
          </div>

          <AddTask onAdd={addTask} />
        </section>

        <aside className="app__sidebar">
          <section aria-labelledby="spending-title">
            <ExpenseCard expenses={todayExpenses} onDelete={removeExpense} />
            <AddExpense onAdd={addExpense} />
          </section>

          <section aria-labelledby="monthly-title">
            <MonthlySummary
              month={new Date().toLocaleDateString("en-US", { month: "long" })}
              monthKey={getCurrentMonthKey()}
              total={currentMonthTotal}
              message="Your wallet is doing great. Absolutely not. 💀"
              onClearMonth={clearMonth}
            />
          </section>
        </aside>
      </main>
    </div>
  );
}

export default App;