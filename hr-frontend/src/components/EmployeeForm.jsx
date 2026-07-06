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
    <div style={{
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '10px',
      padding: '20px',
      marginBottom: '20px',
    }}>
      <h3 style={{ marginTop: 0 }}>{isEditMode ? 'Edit Employee' : 'New Employee'}</h3>
      <form onSubmit={handleSubmit}>
        <div style={rowStyle}>
          <label style={labelStyle}>Staff No</label>
          <input style={inputStyle} type="text" name="staffNo" value={formData.staffNo} onChange={handleChange} required />
        </div>
        <div style={rowStyle}>
          <label style={labelStyle}>Full Name</label>
          <input style={inputStyle} type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </div>
        <div style={rowStyle}>
          <label style={labelStyle}>Department</label>
          <input style={inputStyle} type="text" name="department" value={formData.department} onChange={handleChange} required />
        </div>
        <div style={rowStyle}>
          <label style={labelStyle}>Join Date</label>
          <input style={inputStyle} type="date" name="joinDate" value={formData.joinDate} onChange={handleChange} required />
        </div>
        <div style={{ marginTop: '16px' }}>
          <button type="submit" style={submitBtnStyle}>{isEditMode ? 'Update' : 'Create'}</button>
          <button type="button" onClick={onCancel} style={cancelBtnStyle}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

const rowStyle = { marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '4px' };
const labelStyle = { fontSize: '0.85rem', fontWeight: 600, color: '#475569' };
const inputStyle = { padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.95rem' };
const submitBtnStyle = { background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 18px', fontWeight: 600, marginRight: '10px' };
const cancelBtnStyle = { background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '10px 18px', fontWeight: 600 };

export default EmployeeForm;