import { useEffect, useState } from 'react';
import { getEmployees, deleteEmployee } from '../api/employeeApi';
import EmployeeForm from './EmployeeForm';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);

    const loadEmployees = async () => {
        try {
        const res = await getEmployees();
        setEmployees(res.data);
        } catch (err) {
        console.error('Error fetching employees:', err);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this employee?')) return;
        await deleteEmployee(id);
        loadEmployees();
    };

    const handleAddNew = () => {
        setEditingEmployee(null);
        setShowForm(true);
    };

    const handleEdit = (employee) => {
        setEditingEmployee(employee);
        setShowForm(true);
    };

    const handleSaved = () => {
        setShowForm(false);
        setEditingEmployee(null);
        loadEmployees();
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingEmployee(null);
    };

    if (loading) return  <p>Loading employees...</p>;

    return (
    <div style={{
      background: '#ffffff',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ margin: 0 }}>Employees</h2>
        {!showForm && (
          <button
            onClick={handleAddNew}
            style={{
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 16px',
              fontSize: '0.9rem',
              fontWeight: 600,
            }}
          >
            + New Employee
          </button>
        )}
      </div>

      {showForm && (
        <EmployeeForm
          employee={editingEmployee}
          onSaved={handleSaved}
          onCancel={handleCancel}
        />
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
            <th style={thStyle}>Staff No</th>
            <th style={thStyle}>Full Name</th>
            <th style={thStyle}>Department</th>
            <th style={thStyle}>Join Date</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={tdStyle}>{emp.staffNo}</td>
              <td style={tdStyle}>{emp.fullName}</td>
              <td style={tdStyle}>{emp.department}</td>
              <td style={tdStyle}>{emp.joinDate ? new Date(emp.joinDate).toLocaleDateString() : '-'}</td>
              <td style={tdStyle}>
                <button onClick={() => handleEdit(emp)} style={editBtnStyle}>Edit</button>
                <button onClick={() => handleDelete(emp.id)} style={deleteBtnStyle}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {employees.length === 0 && (
        <p style={{ textAlign: 'center', color: '#94a3b8', padding: '24px 0' }}>
          No employees yet. Click "+ New Employee" to add one.
        </p>
      )}
    </div>
  );
}

const thStyle = {
  textAlign: 'left',
  padding: '10px 12px',
  fontSize: '0.85rem',
  color: '#64748b',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.03em',
};

const tdStyle = {
  padding: '12px',
  fontSize: '0.95rem',
  color: '#1e293b',
};

const editBtnStyle = {
  background: '#f1f5f9',
  border: '1px solid #cbd5e1',
  borderRadius: '6px',
  padding: '6px 12px',
  marginRight: '8px',
  fontSize: '0.85rem',
  color: '#334155',
};

const deleteBtnStyle = {
  background: '#fef2f2',
  border: '1px solid #fecaca',
  borderRadius: '6px',
  padding: '6px 12px',
  fontSize: '0.85rem',
  color: '#dc2626',
};

export default EmployeeList;
