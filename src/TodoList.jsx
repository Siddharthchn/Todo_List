import React, { useState, useEffect } from 'react';
import { FaPenToSquare, FaTrashCan } from 'react-icons/fa6';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  // Load todos from local storage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      console.log('Loaded todos from local storage:', JSON.parse(savedTodos));
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to local storage whenever the todos state changes
  useEffect(() => {
    if (todos.length > 0) {
      console.log('Saving todos to local storage:', todos);
      localStorage.setItem('todos', JSON.stringify(todos));
    } else {
      // To prevent local storage from being cleared out when there are no todos
      localStorage.removeItem('todos');
    }
  }, [todos]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleEditTodo = (index) => {
    setEditIndex(index);
    setEditValue(todos[index]);
  };

  const handleSaveEdit = (index) => {
    if (editValue.trim()) {
      const updatedTodos = todos.map((todo, i) => (i === index ? editValue : todo));
      setTodos(updatedTodos);
      setEditIndex(null);
      setEditValue('');
    }
  };

  return (
    <div className='bg-slate-100 h-screen flex flex-col items-center'>
      <div className="h-32 w-full bg-black text-white flex items-center justify-center uppercase text-[22px] md:text-[36px] font-bold">
        Siddharth's todolist
      </div>
      <header className='flex items-center w-10/12 md:w-2/3 mt-8'>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          type='text'
          placeholder='Enter todo...'
          className='w-full px-4 py-2 text-2xl border-[2px] border-zinc-700 rounded-lg'
        />
        <button onClick={handleAddTodo} className='bg-black text-white px-4 py-2 text-xl rounded-lg ml-4'>
          Add
        </button>
      </header>

      {todos.length === 0 && (
        <div className="bg-white px-4 py-2 text-xl border-[2px] border-zinc-600 rounded-lg  flex items-center justify-between w-11/12 md:w-2/3 mt-10 ml-2 mr-2">No Task Available</div>
      )}

      <ul className='w-11/12 md:w-2/3 mt-8'>
        {todos.map((todo, index) => (
          <li key={index} className='bg-white px-4 py-2 text-xl border-[2px] border-zinc-600 rounded-lg m-2 flex items-center justify-between'>
            {editIndex === index ? (
              <input
                type='text'
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className='w-full px-4 py-2 text-sm md:text-xl border-[2px] border-zinc-700 rounded-lg'
              />
            ) : (
              <span>{todo}</span>
            )}
            <div className='flex items-center ml-4'>
              {editIndex === index ? (
                <button onClick={() => handleSaveEdit(index)} className='bg-green-400 text-white px-4 py-2 text-xl rounded-lg mr-2 flex items-center justify-center'>
                  Save
                </button>
              ) : (
                <button onClick={() => handleEditTodo(index)} className='bg-blue-400 text-white px-4 py-2 text-xl rounded-lg mr-2 flex items-center justify-center'>
                  <FaPenToSquare />
                </button>
              )}
              <button onClick={() => handleDeleteTodo(index)} className='bg-red-400 text-white px-4 py-2 text-xl rounded-lg flex items-center justify-center'>
                <FaTrashCan />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
