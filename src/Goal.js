import React from "react";

export default function Goal({ goal, toggleGoal }) {
  function handleGoalClick() {
    toggleGoal(goal.id);
  }
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={goal.complete}
          onChange={handleGoalClick}
        />
        {goal.description}
      </label>
    </div>
  );
}
