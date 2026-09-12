import "./Header.css";
import { useEffect, useState } from "react";

function getDateString(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function Header() {
  const [date, setDate] = useState(() => new Date());

  useEffect(() => {
    const nextDate = new Date(date);
    nextDate.setHours(24, 0, 0, 0);
    const timeout = window.setTimeout(() => setDate(new Date()), nextDate.getTime() - Date.now());

    return () => window.clearTimeout(timeout);
  }, [date]);

  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__brand-name">TakaDay</span>
        <p className="header__tagline">Your day. Your taka. Under control.</p>
      </div>

      <div className="header__meta">
        <p className="header__date">{getDateString(date)}</p>
        <p className="header__greeting">Do your work properly.</p>
      </div>
    </header>
  );
}

export default Header;