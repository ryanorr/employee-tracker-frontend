// src/components/EmployeeList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditEmployee from "./EditEmployee.js";
import AddEmployee from "./AddEmployee.js";
import UpdateTerminationDate from "./UpdateTerminationDate.js";
import Modal from "./Modal/Modal.js";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [editingEmployee, setEditingEmployee] = useState("");
    const [updatingTerminationDate, setUpdatingTerminationDate] = useState("");

    const fetchEmployees = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/employees`);
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
            alert('Error fetching employees');
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleEdit = (employee) => {
        setEditingEmployee(employee);
    };

    const handleCloseEdit = (refreshList) => {
        setEditingEmployee(null);
        if (refreshList) {
            fetchEmployees();
        }
    }

    const handleUpdateTerminationDate = (employee) => {
        setUpdatingTerminationDate(employee);
    }

    const handleCloseUpdateTerminationDate = (refreshList) => {
        setUpdatingTerminationDate(null);
        if (refreshList) {
            fetchEmployees();
        }
    }

    return (
        <div>
            <AddEmployee onEmployeeAdded={fetchEmployees} />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Company</th>
                        <th>LCAT</th>
                        <th>Team</th>
                        <th>Start Date</th>
                        <th>Team Lead?</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phone_number}</td>
                            <td>{employee.company}</td>
                            <td>{employee.lcat}</td>
                            <td>{employee.assigned_team}</td>
                            <td>{employee.start_date}</td>
                            <td>{employee.is_team_lead ? 'Yes' : 'No'}</td>
                            <td>
                                <button onClick={() => handleEdit(employee)}>Edit</button>
                                <button onClick={() => handleUpdateTerminationDate(employee)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editingEmployee && (
                <Modal show={editingEmployee} onClose={handleCloseEdit}>
                    <EditEmployee
                        employee={editingEmployee}
                        onClose={handleCloseEdit}
                    />
                </Modal>
            )}

            {updatingTerminationDate && (
                <Modal show={updatingTerminationDate} onClose={handleCloseUpdateTerminationDate}>
                    <UpdateTerminationDate
                        employee={updatingTerminationDate}
                        onClose={handleCloseUpdateTerminationDate}
                    />
                </Modal>
            )}
        </div>
    );
};

export default EmployeeList;