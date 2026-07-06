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
    <div>
      <h2>Employees</h2>

      {showForm ? (
        <EmployeeForm
          employee={editingEmployee}
          onSaved={handleSaved}
          onCancel={handleCancel}
        />
      ) : (
        <button onClick={handleAddNew} style={{ marginBottom: '12px' }}>
          + New Employee
        </button>
      )}

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Staff No</th>
            <th>Full Name</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.staffNo}</td>
              <td>{emp.fullName}</td>
              <td>{emp.department}</td>
              <td>
                <button onClick={() => handleEdit(emp)}>Edit</button>{' '}
                <button onClick={() => handleDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default EmployeeList;
