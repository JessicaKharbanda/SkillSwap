import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import ConfirmedMatches from "../connections/getconfirmedmatches";
import "./todo.css";
import amigo from "../images/task-amico.png";
import Navbar from '../navigation/NavigationBar'

import mytodobg from "./mytodobg.png";
function Todolist() {
  const [confirmedMatches, setConfirmedMatches] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "",
    completed: false,
    reward: 1,
  });
  const [partnerTaskList, setPartnerTaskList] = useState(null);
  const [selectedbutton, setbutton] = useState("");
  // const [checkboxClicked, setCheckboxClicked] = useState(false);
  const [disabledCheckboxes, setDisabledCheckboxes] = useState([]);

  const navigate = useNavigate();
  const userString = localStorage.getItem("userLoginInfo");
  const userLogin = userString ? JSON.parse(userString) : null;
  const Token = userLogin && userLogin.token ? userLogin.token : null;
  const loggedinuserId =
    userLogin && userLogin.user ? userLogin.user._id : null;
  const loggedinusername =
    userLogin && userLogin.user ? userLogin.user.name : null;
  // console.log(Token);

  const mymatches = async () => {
    try {
      // Make an HTTP GET request to your server
      const response = await fetch(
        "http://localhost:8000/api/v1/chat-request/getAllAcceptedRequest",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        // setPendingRequests(data);
        console.log(data.matches);
        if (data.matches) {
          setConfirmedMatches(data.matches);
        }
        // Handle the data as needed, such as updating state or displaying in the UI
      } else {
        console.error("Failed to fetch pending requests");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  useEffect(() => {
    mymatches();
  }, []);

  const handleInputChange = (e) => {
    setTaskInput({
      ...taskInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTask = () => {
    setTasks([...tasks, taskInput]);
    setTaskInput({
      title: "",
      description: "",
      deadline: "",
      priority: "",
      completed: false,
      reward: 1,
    });
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleSaveTasks = async () => {
    console.log(selectedUserId);
    console.log(tasks);
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/tasklist-related/task-lists/${selectedUserId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tasks }),
        }
      );

      if (response.ok) {
        // Handle success, maybe show a success message or update state
        // Reset task input values and clear the list of tasks
        setTaskInput({
          title: "",
          description: "",
          deadline: "",
          priority: "",
          completed: false,
          reward: 1,
        });
        setTasks([]);
        console.log("Task list saved successfully");
      } else {
        // Handle error, maybe show an error message
        console.error("Failed to save task list");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleID = async (senderId, receiverId, action) => {
    if (loggedinuserId === senderId) {
      setSelectedUserId(receiverId);
    } else if (loggedinuserId === receiverId) {
      setSelectedUserId(senderId);
    } else {
      console.error("Logged-in user is neither the sender nor the receiver");
    }
    console.log(selectedUserId);

    if (action === "makeTodo") {
      console.log("make");
      setbutton("make");
    }

    // Reset states when switching actions
    // setTasks([]);
    // setTaskInput({
    //   title: "",
    //   description: "",
    //   deadline: "",
    //   priority: "",
    //   completed: false,
    //   reward: 1,
    // });
    // setPartnerTaskList(null);

    if (action === "getTodo") {
      // Fetch tasks for the selected user
      console.log("get");
      setbutton("get");
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/tasklist-related/task-lists/matched-user/${selectedUserId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${Token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setPartnerTaskList(data.partnerTaskList);
        } else {
          console.error("Failed to fetch tasks for the selected user");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  const handleCheckboxChange = async (taskId) => {
    // Your logic for handling checkbox change

    console.log(`Checkbox for task ${taskId} clicked!`);

    if (!disabledCheckboxes.includes(taskId)) {
      setDisabledCheckboxes([...disabledCheckboxes, taskId]);

      try {
        // Update the server to mark the task as complete
        const response = await fetch(
          `http://localhost:8000/api/v1/tasklist-related/task-lists/complete-task/${taskId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${Token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          console.error(`Failed to mark task ${taskId} as complete`);
          return;
        }

        // Fetch the updated task list from the server
        const updatedTaskListResponse = await fetch(
          `http://localhost:8000/api/v1/tasklist-related/task-lists/matched-user/${selectedUserId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${Token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (updatedTaskListResponse.ok) {
          const updatedData = await updatedTaskListResponse.json();
          setPartnerTaskList(updatedData.partnerTaskList);
        } else {
          console.error("Failed to fetch updated tasks for the selected user");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  return (
    <div>

    <Navbar/>
    <div className="todobgdesign">
      <div class="todo-screen">
        <div class="connections">
          <h1 class="connection-heading">CONNECTIONS</h1>

          {confirmedMatches.map((match) => (
            <div class="info" key={match._id}>
              <img  className="todo-img" src={match.receiver.userProfile.pic} />
              <div>
                <p class="todo-name">
                  {loggedinusername === match.sender.name
                    ? match.receiver.name
                    : match.sender.name}
                </p>
                {/* <p class="todo-username">@ishitaaa</p> */}
              </div>
              <div class="todo-button">
                <button
                  class="button-list"
                  onClick={() =>
                    handleID(match.sender._id, match.receiver._id, "makeTodo")
                  }
                >
                  <span>Create list </span>
                </button>
                <button
                  class="button-list"
                  onClick={() =>
                    handleID(match.sender._id, match.receiver._id, "getTodo")
                  }
                >
                  <span>View list </span>
                </button>
              </div>
            </div>
          ))}
        </div>
        {selectedbutton !== "make" && selectedbutton !== "get" && (
          <div className="all-gifs">
            {/* <img className="gif1" src={gif1} />
          // <p  className="giftext">loremasdasdasoidu oaisudoiasudoas duoasudoaisdu aoisudioiasudoaisudaisd aoiuioasduoiasud oaiuooiausdo</p>
          <img className="gif2" src={gif2} /> */}
            <h1>SWAP TASKS, AMPLIFY PRODUCTIVITY</h1>
            <h3>
            Your personalized to-do list, crafted by a fellow SkillSwapper, awaits. Click, conquer, and enjoy!
            </h3>
            <img className="todo-picture" src={mytodobg} />
          </div>
        )}

        {/* Display either the task input form or the partner task list based on the condition */}
        {selectedUserId && selectedbutton === "make" && (
          <div class="make-todo">
            <div class="make-todo-1">
              <h2>MAKE YOUR TODO LIST</h2>
              <h1>Create a new task</h1>
              <div class="todo-form">
                <input
                  type="text"
                  name="title"
                  value={taskInput.title}
                  onChange={handleInputChange}
                  placeholder="add title"
                  class="title-field"
                />
                <input
                  type="text"
                  name="description"
                  value={taskInput.description}
                  onChange={handleInputChange}
                  placeholder="add description"
                  class="desc-field"
                />
                <div>
                  {/* <select
                    name="priority"
                    id="priority"
                    class="pro"
                    placeholder="Priority"
                    value={taskInput.priority}  // Set the selected value from the state
                   onChange={handleInputChange}
                  >
                    <option
                      value="High"
                    >
                      High
                    </option>
                    <option
                      value="Medium"
                    >
                      Medium
                    </option>
                    <option
                     value="Low"
                    >
                      Low
                    </option>
                  </select> */}
                   <input
                    type="text"
                    name="priority"
                    value={taskInput.priority}
                    onChange={handleInputChange}
                    placeholder="Priority"
                    class="pro"
                  />
                  <input
                    type="date"
                    name="deadline"
                    value={taskInput.deadline}
                    onChange={handleInputChange}
                    placeholder="add date"
                    class="date-field"
                  />
                  <button class="add-task-btn" onClick={handleAddTask}>
                    Add Task
                  </button>
                </div>
              </div>
              <h1>All tasks</h1>

              {/* Display tasks */}

              {tasks.map((task, index) => (
                <div class="task-title-display" key={index}>
                  <p>{task.title}</p>
                  <button
                    class="delete-btn"
                    onClick={() => handleDeleteTask(index)}
                  >
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </div>
              ))}

              <button class="save-list" onClick={handleSaveTasks}>
                Save List
              </button>
            </div>
            <div class="make-todo-2">
              <img className="todo-amigo" src={amigo} alt="" />
            </div>
          </div>
        )}  

        {selectedUserId && selectedbutton === "get" && partnerTaskList && (
          <div class="make-todo-view">
            <h1 className="assign-todo">ASSIGNED TASKS</h1>
            <h3 className="assign-todo2">
              make sure you complete them before the deadline to earn rewards!
            </h3>
            {/* Display partner task list */}

            <div class="tasks">
              {partnerTaskList.tasks.map((task, index) => (
                <div class="task" key={index}>
                  <div class="task-1">
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(task._id)}
                      disabled={
                        task.completed || disabledCheckboxes.includes(task._id)
                      }
                    />
                    <p class="task-title">{task.title}</p>
                    <p class="task-priority">{task.priority}</p>
                    <p class="task-date">{task.deadline.substring(0, 10)}</p>
                  </div>
                  <div class="task-desc">
                    <p>{task.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div class="score-div">
              <p class="your-score">YOUR SCORE</p>
              <div class="score">
                <p>{partnerTaskList.rewards} ⭐️</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default Todolist;

//  <div class="todo-screen">

//         <div class="make-todo">
//             <h1>ASSIGNED TASKS</h1>
//             <h3>make sure you complete them before the deadline to earn rewards!</h3>
//             <div class="tasks">
//                 <div class="task">
//                     <div class="task-1">
//                         <input type="checkbox">
//                         <p class="task-title">Task title</p>
//                         <p class="task-priority">Priority</p>
//                         <p class="task-date">Date</p>
//                     </div>
//                     <div class="task-desc">
//                         <p>- Description</p>
//                     </div>
//                 </div>
//                 <div class="task">
//                     <div class="task-1">
//                         <input type="checkbox">
//                         <p class="task-title">Task title</p>
//                         <p class="task-priority">Priority</p>
//                         <p class="task-date">Date</p>
//                     </div>
//                     <div class="task-desc">
//                         <p>- Description</p>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     </div>

//     <div class="score-div">
//         <p class="your-score">YOUR SCORE</p>
//         <div class="score">
//             <p>100 ⭐️</p>
//         </div>
//     </div> */
