import React, { useState } from 'react';
import axios from 'axios';

const EditEmployee = ({ employee, onClose }) => {
    const [formData, setFormData] = useState(employee);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/employees/${employee.id}`, formData);
            onClose(true);
        } catch (error) {
            console.error('Error updating employee:', error);
            alert('Error updating employee');
        }
    };

    return (
        <div>
            <h2>Edit Employee</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Phone Number:
                    <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Company:
                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    LCAT:
                    <input
                        type="text"
                        name="lcat"
                        value={formData.lcat}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Assigned Team:
                    <input
                        type="text"
                        name="assigned_team"
                        value={formData.assigned_team}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Start Date:
                    <input
                        type="date"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Is Team Lead:
                    <input
                        type="checkbox"
                        name="is_team_lead"
                        checked={formData.is_team_lead}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="submit">Save Changes</button>
                <button type="button" onClick={() => onClose(false)}>Cancel</button>
            </form>
        </div>
    );
};

export default EditEmployee;