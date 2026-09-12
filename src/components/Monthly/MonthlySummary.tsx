import "./MonthlySummary.css";
import { useState } from "react";

interface MonthlySummaryProps {
  month: string;
  monthKey: string;
  total: number;
  message: string;
  onClearMonth: (monthKey: string) => void;
}

function MonthlySummary({ month, monthKey, total, message, onClearMonth }: MonthlySummaryProps) {
  const [isConfirming, setIsConfirming] = useState(false);

  return (
    <div className="monthly-summary">
      <div className="monthly-summary__header">
        <div>
          <p className="monthly-summary__eyebrow">This Month</p>
          <p className="monthly-summary__month">{month}</p>
        </div>
        <button
          type="button"
          className="monthly-summary__clear"
          onClick={() => setIsConfirming(true)}
          disabled={total === 0}
        >
          Clear {month}
        </button>
      </div>
      <p className="monthly-summary__total">৳{total.toLocaleString()} spent</p>
      <p className="monthly-summary__message">{message}</p>
      {isConfirming && (
        <div
          className="monthly-summary__confirmation"
          role="dialog"
          aria-label={`Delete all ${month} expenses`}
        >
          <p>Delete all {month} expenses?</p>
          <span>This cannot be undone.</span>
          <div className="monthly-summary__actions">
            <button type="button" onClick={() => setIsConfirming(false)}>
              Cancel
            </button>
            <button
              type="button"
              className="monthly-summary__delete"
              onClick={() => {
                onClearMonth(monthKey);
                setIsConfirming(false);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MonthlySummary;