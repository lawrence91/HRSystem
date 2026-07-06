import EmployeeList from './components/EmployeeList';

function App() {
  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '40px 20px',
    }}>
      <h1 style={{ marginBottom: '4px' }}>HR System</h1>
      <p style={{ color: '#64748b', marginTop: 0, marginBottom: '32px' }}>
        Manage employee records
      </p>
      <EmployeeList />
    </div>
  );
}

export default App;