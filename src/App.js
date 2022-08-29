import React, { useState, useRef, useEffect } from "react";
import GoalList from "./GoalList";

function App() {
  const [goals, setGoals] = useState([]);
  const goalNameRef = useRef();

  useEffect(() => {
    fetch("http://localhost:3005/goals", { mode: "cors" })
    .then((res) => res.json())
    .then((goals) => {
      setGoals(goals)
    })
  }, [])

  function toggleGoal(id) {
    const newGoals = [...goals];
    const goal = newGoals.find((goal) => goal.id === id);
    goal.complete = !goal.complete;
    setGoals(newGoals);
  }

  function handleAddGoal(e) {
    const name = goalNameRef.current.value;
    if (name === "") return;

    fetch("http://localhost:3005/goals", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: name }),
    })
      .then((res) =>  res.json())
      .then ((goal) => {
        setGoals(goals.concat(goal))
      })

    goalNameRef.current.value = null;

  }
  function handleClearGoals() {
    const newGoals = goals.filter(goal => !goal.complete)
    setGoals(newGoals)
  }
console.log(goals)
  return (
    <>
      <GoalList goals={goals} toggleGoal={toggleGoal} />
      <input ref={goalNameRef} type="text" />
      <button onClick={handleAddGoal}>Add New Goal</button>
      <button onClick={handleClearGoals}>Clear Completed Goals</button>
      <div>{goals.filter((goal) => !goal.complete).length} Goal(s) Left</div>
    </>
  );
}

export default App;
