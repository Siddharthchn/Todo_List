import React, { useState } from 'react'

function TodoList2() {

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [isEditing,setIsEditing] = useState(null);
  const [currentTaskIndex, setCurrentTaskIndex ] = useState(null);


  const submitHandler = (e) => {
    e.preventDefault();
    if (isEditing) {
        // Update existing task
        const updatedTasks = mainTask.map((task, index) => {
            if (index === currentTaskIndex) {
                return { title, desc };
            }
            return task;
        });
        setMainTask(updatedTasks);
        setIsEditing(false); // Exit edit mode
        setCurrentTaskIndex(null); // Clear current task index
    } else {
        // Add new task
        setMainTask([...mainTask, { title, desc }]);
    }
    setTitle(""); // Clear title input
    setDesc("");  // Clear description input
};


  const deleteHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask.splice(i,1);
    setMainTask(copyTask);
  }

  const editHandler = (i) => {
    setCurrentTaskIndex(i); // Set the index of the task to be edited
    setTitle(mainTask[i].title); // Set title to the selected task's title
    setDesc(mainTask[i].desc); // Set description to the selected task's description
    setIsEditing(true); // Enter edit mode
};

  let renderTask = <h2>No Task Available</h2>

  if (mainTask.length > 0) {
  renderTask = mainTask.map((t,i) => {
    return (
      <li key={i} className='flex items-center justify-between mb-5  '>
      <div className='w-2/3'>
        <h5 className='text-2xl font-semibold'>{t.title}</h5>
        <h6 className='text-lg font-medium'>{t.desc}</h6>
      </div>
      <button
                onClick={() => editHandler(i)}
                className="bg-blue-400 text-white px-4 py-2 text-xl rounded font-bold mr-2"
            >
                Edit
            </button>
            <button
                onClick={() => deleteHandler(i)}
                className="bg-red-400 text-white px-4 py-2 text-xl rounded font-bold"
            >
                Delete
            </button>
      </li>
    );
  })};


  return (
    <div>
      <div className='h-32 w-full bg-black text-white flex items-center justify-center uppercase text-[36px] font-bold'>
        Siddharth's todolist
      </div>
      <form onSubmit={submitHandler}>
        <input type="text" className='text-2xl border-zinc-800 border-2 m-8 px-4 py-2'
        placeholder='Enter Text here...'
        value={title}
        onChange={(e) => {
          setTitle(e.target.value)
        }}
        />
         <input type="text" className='text-2xl border-zinc-800 border-2 m-8 px-4 py-2'
        placeholder='Enter Description here...'
        value={desc}
        onChange={(e) => {
          setDesc(e.target.value)
        }}
        />
        <button className='bg-black text-white px-4 py-2 text-2xl font-bold rounded'> {isEditing ? "Update Task" : "Add Task"}</button>
      </form>
      <hr />
      <div className="p-8 bg-slate-200">
        <ul>
          {renderTask}
        </ul>
      </div>
    </div>
  )
}

export default TodoList2