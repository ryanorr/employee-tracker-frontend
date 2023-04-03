// src/App.js
import React from 'react';
import AddEmployee from './components/AddEmployee.js';
import EmployeeList from './components/EmployeeList.js';

function App() {
  return (
      <div className="App">
        <AddEmployee />
        <EmployeeList />
      </div>
  );
}

export default App;