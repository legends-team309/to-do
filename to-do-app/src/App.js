import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      taskValue: "",
    };
  }

  handleChange = (event) => {
    this.setState({ taskValue: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let arr = this.state.tasks;
    arr.push(this.state.taskValue);

    this.setState({ tasks: arr });

    const newTask = this.state.tasks;
    const getTasksFromLocalSt = JSON.parse(localStorage.getItem("tasks")) || [];
    localStorage.setItem(
      "tasks",
      JSON.stringify([...getTasksFromLocalSt, newTask])
    );
  };

  deleteItem = (i) => {
    const getTasksFromLocalSt = JSON.parse(localStorage.getItem("tasks"));
    const filterArr = getTasksFromLocalSt.filter(
      (element, index) => index !== i
    );
    this.setState({ tasks: filterArr });
    localStorage.setItem("tasks", JSON.stringify(filterArr));
  };

  editItem = (i) => {
    const getTasksFromLocalSt = JSON.parse(localStorage.getItem("tasks"));
    getTasksFromLocalSt[i] = this.state.taskValue;
    this.setState({ tasks: getTasksFromLocalSt });
    localStorage.setItem("tasks", JSON.stringify(getTasksFromLocalSt));
  };

  render() {
    const getTasksFromLocalSt = JSON.parse(localStorage.getItem("tasks")) || [];
    return (
      <section className="container">
        <form className="head" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="enter you task"
            className="inpHead"
            onChange={this.handleChange}
          />
          <button className="btnHead" onClick={this.getFromLocalStorage}>
            {" "}
            add{" "}
          </button>
        </form>

        <div className="lists">
          {getTasksFromLocalSt.map((element, index) => (
            <div className="listItem">
              <p> {element}</p>
              <div>
                <button
                  className="btnEdit"
                  onClick={() => this.editItem(index)}
                >
                  edit
                </button>
                <button
                  className="btnDelete"
                  onClick={() => this.deleteItem(index)}
                >
                  delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}
export default App;
