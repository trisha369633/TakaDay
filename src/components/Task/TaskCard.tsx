import "./TaskCard.css";
import { useState } from "react";
import type { Task } from "../../types";

interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
}

const completionMessages = [
  "TASK DEFEATED 💀",
  "MISSION ACCOMPLISHED 🫡",
  "BYE BYE TASK 👋",
  "ABSOLUTELY DESTROYED 🔥",
  "YOU ACTUALLY DID IT.",
];

function TaskCard({ task, onComplete }: TaskCardProps) {
  const [isDefeating, setIsDefeating] = useState(false);
  const [completionMessage, setCompletionMessage] = useState("");

  function handleComplete() {
    if (isDefeating) return;

    setCompletionMessage(
      completionMessages[Math.floor(Math.random() * completionMessages.length)],
    );
    setIsDefeating(true);
    window.setTimeout(() => onComplete(task.id), 800);
  }

  return (
    <article className={`task-card${isDefeating ? " task-card--defeating" : ""}`}>
      <div className="task-card__info">
        <span className="task-card__emoji">⚔️</span>
        <span className="task-card__label">{task.text}</span>
      </div>
      <button
        type="button"
        className="task-card__button"
        onClick={handleComplete}
        disabled={isDefeating}
      >
        {isDefeating ? completionMessage : "DO IT"}
      </button>
    </article>
  );
}

export default TaskCard;