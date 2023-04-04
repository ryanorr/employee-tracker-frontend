// src/App.js
import React from 'react';
import { useState } from "react";
import AddEmployee from './components/AddEmployee.js';
import EmployeeList from './components/EmployeeList.js';

function App() {
    const [refreshKey, setRefreshKey] = useState(0);
    return (
        <div className="App container mx-auto my-4 px-4">
            <EmployeeList />
        </div>
    );
}

export default App;