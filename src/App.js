import React, { useState, useRef, useEffect } from "react";
import GoalList from "./GoalList";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "goalyMcGoalerson";

function App() {
  const [goals, setGoals] = useState([]);
  const goalNameRef = useRef();

  useEffect(() => {
    const storedGoals = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedGoals) setGoals(storedGoals);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(goals));
  }, [goals]);

  function toggleGoal(id) {
    const newGoals = [...goals];
    const goal = newGoals.find((goal) => goal.id === id);
    goal.complete = !goal.complete;
    setGoals(newGoals);
  }

  function handleAddGoal(e) {
    const name = goalNameRef.current.value;
    if (name === "") return;
    setGoals((prevGoals) => {
      return [...prevGoals, { id: uuidv4(), name: name, complete: false }];
    });
    goalNameRef.current.value = null;
  }

  function handleClearGoals() {
    const newGoals = goals.filter(goal => !goal.complete)
    setGoals(newGoals)
  }

  return (
    <>
      <GoalList goals={goals} toggleGoal={toggleGoal} />
      <input ref={goalNameRef} type="text" />
      <button onClick={handleAddGoal}>Add New Goal</button>
      <button onClick={handleClearGoals}>Clear Completed Goals</button>
      <div>{goals.filter((goal) => !goal.complete).length} Goals Left</div>
    </>
  );
}

export default App;
