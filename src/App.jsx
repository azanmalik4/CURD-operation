import { useEffect, useState } from "react";
import { EmployeeData } from "./employeeData";

const getLocalData =()=>{
  const lists = localStorage.getItem("mytodolist");
  if(lists){
    return JSON.parse(lists)
  }
  else{
    return[];
  }
}

function App() {
  const [data, setData] = useState(getLocalData);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);



  useEffect(() => {
    setData(EmployeeData);
  }, []);

  const handleEdit = (id) => {
    const dt = data.filter((item) => item.id === id);
    if (dt !== undefined) {
      setIsUpdate(true);
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName);
      setAge(dt[0].age);
      setId(id);
    }
  };

  const handleSave = (e) => {
    let error = "";
    if (firstName === "") error += "First Name is required. ";

    if (lastName === "") error += "Last Name is required. ";

    if (age <= 0) error += "Age is required";

    if(error === ""){

    e.preventDefault();
    const dt = [...data];
    const newObject = {
      id: EmployeeData.length + 1,
      firstName: firstName,
      lastName: lastName,
      age: age,
    };

    dt.push(newObject);
    setData(dt);
    
    }
    else{
      alert(error);
    }
  };
  const handleUpdate = () => {
    const index = data
      .map((item) => {
        return item.id;
      })
      .indexOf(id);

    const dt = [...data];
    dt[index].firstName = firstName;
    dt[index].lastName = lastName;
    dt[index].age = age;

    setData(dt);
    handleClear();
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
      if (window.confirm("Are you sure to delete this record?")) {
        const dt = data.filter((item) => item.id !== id);
        setData(dt);
      }
    }
  };


  useEffect(()=>{
    localStorage.setItem("mytodolist",JSON.stringify(data))
  },[data])

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <div>
          <label>
            First Name:
            <input
              type="text"
              placeholder="Enter First Name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </label>
        </div>
        <div>
          <label htmlFor="">
            Last Name:
            <input
              type="text"
              placeholder="Enter Last Name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </label>
        </div>
        <div>
          <label htmlFor="">
            Age:
            <input
              type="text"
              placeholder="Enter your Age"
              onChange={(e) => setAge(e.target.value)}
              value={age}
            />
          </label>
        </div>
        <div>
          {!isUpdate ? (
            <button className="btn btn-primary" onClick={(e) => handleSave(e)}>
              Save
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => handleUpdate()}>
              Update
            </button>
          )}
          <button className="btn btn-danger" onClick={() => handleClear()}>
            Clear
          </button>
        </div>
      </div>
      <div className="App">
        <table className="table table-hover">
          <thead>
            <tr>
              <td>Sr.NO:</td>
              <td>ID</td>
              <td>First Name</td>
              <td>Last Name</td>
              <td>Age</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.age}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </button>
                    &nbsp;
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
