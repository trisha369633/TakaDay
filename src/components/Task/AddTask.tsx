import { useState } from "react";
import "./AddTask.css";

interface AddTaskProps {
  onAdd: (text: string) => void;
}

function AddTask({ onAdd }: AddTaskProps) {
  const [value, setValue] = useState("");

  return (
    <form
      className="add-task"
      onSubmit={(e) => {
        e.preventDefault();
        onAdd(value);
        setValue("");
      }}
    >
      <input
        type="text"
        className="add-task__input"
        placeholder="What needs to be defeated?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="add-task__button">
        + Add Mission
      </button>
    </form>
  );
}

export default AddTask;