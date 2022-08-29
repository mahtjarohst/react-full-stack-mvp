import React from "react";
import Goal from "./Goal";

export default function GoalList({ goals, toggleGoal }) {
  return goals.map((goal) => {
    return <Goal key={goal.id} toggleGoal={toggleGoal} goal={goal} />;
  });
}
