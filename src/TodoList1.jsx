import React, { useState } from 'react';

function TodoList1() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // State to track the index of the task being edited
  const [editTitle, setEditTitle] = useState(""); // State for editing title
  const [editDesc, setEditDesc] = useState(""); // State for editing description

  const submitHandler = (e) => {
    e.preventDefault();
    setMainTask([...mainTask, { title, desc }]);
    setTitle("");
    setDesc("");
  };

  const deleteHandler = (index) => {
    const updatedTasks = mainTask.filter((_, i) => i !== index);
    setMainTask(updatedTasks);
  };

  const editHandler = (index) => {
    setEditIndex(index);
    setEditTitle(mainTask[index].title);
    setEditDesc(mainTask[index].desc);
  };

  const saveHandler = (index) => {
    const updatedTasks = mainTask.map((task, i) => {
      if (i === index) {
        return { title: editTitle, desc: editDesc };
      }
      return task;
    });
    setMainTask(updatedTasks);
    setEditIndex(null);
  };

  let renderTask = <h2>No Task Available</h2>;

  if (mainTask.length > 0) {
    renderTask = mainTask.map((task, index) => (
      <li key={index} className="flex items-center justify-between mb-5">
        {editIndex === index ? (
          <div className="w-2/3">
            <input
              type="text"
              className="text-2xl border-zinc-800 border-2 px-2 py-1 mb-2 w-full"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <input
              type="text"
              className="text-2xl border-zinc-800 border-2 px-2 py-1 w-full"
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
            />
          </div>
        ) : (
          <div className="w-2/3 flex justify-between">
            <h5 className="text-2xl font-semibold">{task.title}</h5>
            <h6 className="text-lg font-medium">{task.desc}</h6>
          </div>
        )}
        <div>
          {editIndex === index ? (
            <button
              onClick={() => saveHandler(index)}
              className="bg-green-400 text-white px-4 py-2 text-xl rounded font-bold mr-2"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => editHandler(index)}
              className="bg-blue-400 text-white px-4 py-2 text-xl rounded font-bold mr-2"
            >
              Edit
            </button>
          )}
          <button
            onClick={() => deleteHandler(index)}
            className="bg-red-400 text-white px-4 py-2 text-xl rounded font-bold"
          >
            Delete
          </button>
        </div>
      </li>
    ));
  }

  return (
    <div>
      <div className="h-32 w-full bg-black text-white flex items-center justify-center uppercase text-[36px] font-bold">
        Siddharth's todolist
      </div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="text-2xl border-zinc-800 border-2 m-8 px-4 py-2"
          placeholder="Enter Title here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="text-2xl border-zinc-800 border-2 m-8 px-4 py-2"
          placeholder="Enter Description here..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button className="bg-black text-white px-4 py-2 text-2xl font-bold rounded">
          Add Task
        </button>
      </form>
      <hr />
      <div className="p-8 bg-slate-200">
        <ul>{renderTask}</ul>
      </div>
    </div>
  );
}

export default TodoList1;
