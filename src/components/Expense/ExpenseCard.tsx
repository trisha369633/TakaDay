import "./ExpenseCard.css";
import type { Expense } from "../../types";
import { getExpenseEmoji } from "../../utils/expenseUtils";

interface ExpenseCardProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

function ExpenseCard({ expenses, onDelete }: ExpenseCardProps) {
  const amount = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div className="expense-card">
      <div className="expense-card__header">
        <h2 id="spending-title">Today's Spending</h2>
        <span className="expense-card__icon">💸</span>
      </div>
      <p className="expense-card__amount">৳{amount.toLocaleString()}</p>
      <p className="expense-card__caption">
        {expenses.length > 0 ? "Spent and gone. No refunds." : "Your wallet survived today. 💀"}
      </p>
      {expenses.length > 0 && (
        <ul className="expense-card__list">
          {expenses.map((expense) => (
            <li key={expense.id} className="expense-card__item">
              <span className="expense-card__description">
                {getExpenseEmoji(expense.description)} {expense.description}
              </span>
              <span className="expense-card__amount-group">
                <strong>৳{expense.amount.toLocaleString()}</strong>
                <button
                  type="button"
                  className="expense-card__delete"
                  aria-label={`Delete ${expense.description}`}
                  title="Delete expense"
                  onClick={() => onDelete(expense.id)}
                >
                  ×
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExpenseCard;