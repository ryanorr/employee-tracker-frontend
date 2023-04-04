// src/components/EmployeeList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditEmployee from "./EditEmployee.js";
import AddEmployee from "./AddEmployee.js";
import UpdateTerminationDate from "./UpdateTerminationDate.js";
import Modal from "./Modal/Modal.js";
import 'tailwindcss/tailwind.css';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [editingEmployee, setEditingEmployee] = useState("");
    const [updatingTerminationDate, setUpdatingTerminationDate] = useState("");
    const [sort, setSort] = useState({key:"name", direction: "asc"});

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

    const sortEmployees = (key) => {
        const direction = sort.direction === "asc" ? "desc" : "asc";
        const sortedEmployees = [...employees].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === "asc" ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === "asc" ? 1 : -1;
            }
            return 0;
        });
        setSort({key, direction});
        setEmployees(sortedEmployees);
    }

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <AddEmployee onEmployeeAdded={fetchEmployees} />
                        <table className="min-w-full text-center text-sm font-light">
                            <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                                <tr>
                                    <th onClick={() => sortEmployees("name")}>Name</th>
                                    <th onClick={() => sortEmployees("email")}>Email</th>
                                    <th onClick={() => sortEmployees("phone_number")}>Phone Number</th>
                                    <th onClick={() => sortEmployees("company")}>Company</th>
                                    <th onClick={() => sortEmployees("lcat")}>LCAT</th>
                                    <th onClick={() => sortEmployees("assigned_team")}>Assigned Team</th>
                                    <th onClick={() => sortEmployees("start_date")}>Start Date</th>
                                    <th>Team Lead?</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee) => (
                                    <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600" key={employee.id}>
                                        <td className="whitespace-nowrap px-6 py-4">{employee.name}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{employee.email}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{employee.phone_number}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{employee.company}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{employee.lcat}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{employee.assigned_team}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{employee.start_date}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{employee.is_team_lead ? 'Yes' : 'No'}</td>
                                        <td className="whitespace-nowrap px-6 py-4">
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
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;