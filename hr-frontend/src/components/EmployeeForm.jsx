import {  useState, useEffect } from 'react';
import { createEmployee, updateEmployee } from '../api/employeeApi';

function EmployeeForm({ employee, onSaved, onCancel }) {
    const [formData, setFormData] = useState({
        staffNo: '',
        fullName: '',
        department: '',
        joinDate: ''
    }); 
    
    const isEditMode = !!employee;  

    useEffect(() => {
        if  (employee) {
            setFormData({
                staffNo: employee.staffNo || '',
                fullName: employee.fullName || '',
                department: employee.department || '',
                joinDate: employee.joinDate ? employee.joinDate.split('T')[0] : '',
            });
        }
    }, [employee]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                joinDate: formData.joinDate ? new Date(formData.joinDate).toISOString() : null,
            };

            if (isEditMode) {
                await updateEmployee(employee.id,  {...formData,  id: employee.id });
            } else {
                await createEmployee(formData);
            }  
            onSaved();
        } catch (err) {
            console.error('Error saving employee:', err);
            alert('Failed to save employee. Please check the console for details.');
        }
    };

    return (
    <div style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '20px' }}>
      <h3>{isEditMode ? 'Edit Employee' : 'New Employee'}</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '8px' }}>
          <label>Staff No: </label>
          <input
            type="text"
            name="staffNo"
            value={formData.staffNo}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <label>Full Name: </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <label>Department: </label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <label>Join Date: </label>
          <input
            type="date"
            name="joinDate"
            value={formData.joinDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{isEditMode ? 'Update' : 'Create'}</button>
        <button type="button" onClick={onCancel} style={{ marginLeft: '8px' }}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EmployeeForm;