// src/components/AddEmployee.js
import React, { useState } from "react";
import axios from 'axios';
import Modal from './Modal/Modal.js';

const initialState = {
    name: "",
    email: "",
    phone_number: "",
    company: "",
    lcat: "",
    assigned_team: "",
    start_date: "",
    termination_date: "",
    is_team_lead: false,
};

const AddEmployee = ({ onEmployeeAdded }) => {
    const [showModal, setShowModal] = useState(false);
    const [employee, setEmployee] = useState(initialState);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        data.is_team_lead = data.is_team_lead === 'on';

        console.log("Submitting employee data:", data);

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/employees`, data);
            setEmployee(initialState);
            if (onEmployeeAdded) {
                onEmployeeAdded();
            }
            alert('Employee added successfully');
        } catch (error) {
            console.error('Error adding employee:', error);
            alert('Error adding employee');
        }

        setEmployee(initialState);
    };

    return (
        <div className="p-3">
            <button className="inline-block rounded-full border-2 border-neutral-800
            px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal
            text-neutral-800 transition duration-150 ease-in-out
            hover:border-neutral-800 hover:bg-neutral-500 hover:bg-opacity-10
            hover:text-neutral-800 focus:border-neutral-800 focus:text-neutral-800
            focus:outline-none focus:ring-0 active:border-neutral-900
            active:text-neutral-900 dark:border-neutral-900 dark:text-neutral-900
            dark:hover:border-neutral-900 dark:hover:bg-neutral-100
            dark:hover:bg-opacity-10 dark:hover:text-neutral-900 dark:focus:border-neutral-900
            dark:focus:text-neutral-900 dark:active:border-neutral-900
            dark:active:text-neutral-900" onClick={() => setShowModal(true)}>Add Employee</button>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={employee.name}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={employee.email}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Phone Number:
                        <input
                            type="text"
                            name="phone_number"
                            value={employee.phone_number}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Company:
                        <input
                            type="text"
                            name="company"
                            value={employee.company}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        LCAT:
                        <input
                            type="text"
                            name="lcat"
                            value={employee.lcat}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Assigned Team:
                        <input
                            type="text"
                            name="assigned_team"
                            value={employee.assigned_team}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Start Date:
                        <input
                            type="date"
                            name="start_date"
                            value={employee.start_date}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Is Team Lead:
                        <input
                            type="checkbox"
                            name="is_team_lead"
                            checked={employee.is_team_lead}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <button type="submit">Add Employee</button>
                </form>
            </Modal>
        </div>
    );
};

export default AddEmployee;