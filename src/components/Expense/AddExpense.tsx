import { useState } from "react";
import "./AddExpense.css";

interface AddExpenseProps {
  onAdd: (amount: number, description: string) => void;
}

function AddExpense({ onAdd }: AddExpenseProps) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  return (
    <form
      className="add-expense"
      onSubmit={(e) => {
        e.preventDefault();
        const parsedAmount = Number(amount);

        if (!Number.isFinite(parsedAmount) || parsedAmount <= 0 || !description.trim()) {
          return;
        }

        onAdd(parsedAmount, description);
        setAmount("");
        setDescription("");
      }}
    >
      <div className="add-expense__row">
        <span className="add-expense__prefix">৳</span>
        <input
          type="number"
          inputMode="decimal"
          className="add-expense__input add-expense__input--amount"
          placeholder="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          className="add-expense__input add-expense__input--desc"
          placeholder="For what, exactly?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit" className="add-expense__button">
        + Add Spending
      </button>
    </form>
  );
}

export default AddExpense;