import React from 'react';
import Header from './Header';
import { useEffect } from 'react';
import Users from './Users'
import useGoal from './Goals';
import { response } from 'express';

function App() {
  
  const getUserData = async () => {
    const response = await fetch(
      "http://localhost:3005/users/"
    ).then((response) => response.json());
    setUsers(response);
  }

  useEffect(() => {
    getUserData();
  }, []);
  

  return (
    <>
    <Header />
    <input type="text" />
    <button>Add Goal</button>
    </>
  );
}

export default App;
