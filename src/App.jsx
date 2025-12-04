import { useEffect, useState } from "react";
import "./App.css";

const STORAGE_KEY = "employeeData";

const getLocalData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [error];
  }
};

function App() {
  const [data, setData] = useState(getLocalData);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const handleEdit = (id) => {
    const dt = data.filter((item) => item.id === id);
    if (dt !== undefined && dt.length > 0) {
      setIsUpdate(true);
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName);
      setAge(dt[0].age);
      setId(id);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    let error = "";
    if (firstName.trim() === "") error += "First Name is required. ";
    if (lastName.trim() === "") error += "Last Name is required. ";
    if (age <= 0 || age === "") error += "Age is required";

    if (error === "") {
      const newId = data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1;
      const newObject = {
        id: newId,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        age: parseInt(age),
      };
      setData([...data, newObject]);
      handleClear();
    } else {
      alert(error);
    }
  };

  const handleUpdate = () => {
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
      const dt = [...data];
      dt[index].firstName = firstName.trim();
      dt[index].lastName = lastName.trim();
      dt[index].age = parseInt(age);
      setData(dt);
      handleClear();
    }
  };

  const handleClear = () => {
    setFirstName("");
    setLastName("");
    setAge("");
    setId(0);
    setIsUpdate(false);
  };

  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure you want to delete this record?")) {
        const dt = data.filter((item) => item.id !== id);
        setData(dt);
      }
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>👥 Employee Management</h1>
        <p>Manage your employee records efficiently</p>
      </div>

      <div className="form-container">
        <div className="form-grid">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              placeholder="Enter first name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Enter last name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </div>
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              placeholder="Enter age"
              onChange={(e) => setAge(e.target.value)}
              value={age}
            />
          </div>
        </div>
        <div className="button-group">
          {!isUpdate ? (
            <button className="btn btn-primary" onClick={handleSave}>
              <span>💾 Save Employee</span>
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleUpdate}>
              <span>✏️ Update Employee</span>
            </button>
          )}
          <button className="btn btn-danger" onClick={handleClear}>
            <span>🗑️ Clear Form</span>
          </button>
        </div>
      </div>

      <div className="table-container">
        {data.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <td>Sr. No.</td>
                <td>ID</td>
                <td>First Name</td>
                <td>Last Name</td>
                <td>Age</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.age}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn btn-primary btn-small"
                        onClick={() => handleEdit(item.id)}
                      >
                        <span>✏️ Edit</span>
                      </button>
                      <button
                        className="btn btn-danger btn-small"
                        onClick={() => handleDelete(item.id)}
                      >
                        <span>🗑️ Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <h3>No Employees Found</h3>
            <p>Start by adding your first employee record above</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;