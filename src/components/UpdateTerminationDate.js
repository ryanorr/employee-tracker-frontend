import React, { useState } from 'react';
import axios from 'axios';

const UpdateTerminationDate = ({ employee, onClose }) => {
    const [terminationDate, setTerminationDate] = useState(employee);

    const handleChange = (e) => {
        setTerminationDate({ ...terminationDate, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/employees/${employee.id}`, terminationDate);
            onClose(true);
        } catch (error) {
            console.error('Error updating employee:', error);
            alert('Error updating employee');
        }
    };

    return (
        <div>
            <h2>Update Termination Date</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Termination Date:
                    <input
                        type="date"
                        name="termination_date"
                        value={terminationDate.termination_date}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="submit">Update Termination Date</button>
            </form>
        </div>
    );
}

export default UpdateTerminationDate;