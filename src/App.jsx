import React, { Fragment, useState } from 'react';

const TaskInput = ({ taskInputValue, setTaskInputValue, taskDescInputValue, setTaskDescInputValue, addTask }) => {
  return (
    <div className='task-box w-[70%] p-[10px] rounded-lg flex flex-col items-center gap-6 border-1'>
      <div className='w-[100%] flex flex-col md:flex-row justify-evenly'>
        <span>
          <div className='labels flex flex-col md:gap-10 mb-3 md:mb-0 font-bold md:p-2 text-xl'>
            <label htmlFor='taskInput'>Task</label>
            <label className='hidden md:block' htmlFor='taskDescription'>Task Description</label>
          </div>
        </span>
        <span className='md:w-[70%] w-[100%]'>
          <div className='inputs flex flex-col gap-5'>
            <input
              className='border-2 border-gray-800 focus:border-green-500 focus:shadow-sm focus:shadow-green-300 outline-none transition duration-300 p-2 rounded-md text-lg placeholder-gray-600 dark:placeholder-gray-300'
              type='text' name='taskInput' id='taskInput' value={taskInputValue}
              onChange={(e) => setTaskInputValue(e.target.value)} placeholder='Enter task'
            />

            <label className='font-bold md:hidden text-xl' htmlFor='taskDescription'>Task Description</label>

            <input
              className='border-2 border-gray-800 focus:border-blue-500 focus:shadow-sm focus:shadow-blue-300 outline-none transition duration-300 p-2 rounded-md text-lg placeholder-gray-600 dark:placeholder-gray-300'
              type='text' name='taskDescription' id='taskDescription' value={taskDescInputValue}
              onChange={(e) => setTaskDescInputValue(e.target.value)} placeholder='Enter task description'
            />
          </div>
        </span>
      </div>
      <div>
        <button className='border-1 border-black cursor-pointer p-2 rounded-lg bg-green-700 text-white hover:shadow-green-300 hover:shadow-sm' onClick={addTask}>
          Add New Task
        </button>
      </div>
    </div>
  );
};

const TaskItem = ({ element, index, removeTask }) => {
  return (
    <Fragment key={index}>
      <div className='flex flex-col md:flex-row gap-2 w-[70%] bg-blue-500 text-lg text-white p-2 rounded-lg hover:border-1 dark:border-white border-black hover:shadow-[0px_3px_6px_rgba(0,0,0,0.16),0px_3px_6px_rgba(0,0,0,0.23)] transition duration-300'>
        <span className='w-[85%] flex flex-col'>
          <span className='font-bold'>Task : {index + 1}</span>
          <span><span className='font-bold'>Task</span> : {element.task}</span>
          <span><span className='font-bold'>Description</span> : {element.description}</span>
        </span>
        <span className='md:w-[15%] flex items-center justify-center m-2'>
          <button className='bg-red-500 text-white rounded-lg cursor-pointer p-2' onClick={() => removeTask(index)}>
            Remove Task
          </button>
        </span>
      </div>
    </Fragment>
  );
};

const TaskList = ({ tasks, removeTask }) => {
  return tasks.map((element, index) => <TaskItem key={index} element={element} index={index} removeTask={removeTask} />);
};

const changeTheme = (setDark) => {
  document.getElementById("root").classList.toggle("dark");
  setDark(prev => !prev);
}

const NavBar = ({ dark, setDark }) => {
  return (
    <nav className='h-16 w-full bg-blue-400 dark:bg-blue-800 flex items-center justify-between px-5 py-5 xl:px-10 mb-2'>
      <h1 className='text-xl font-bold text-white'>Task Manager App</h1>
      <button
        onClick={() => changeTheme(setDark)}
        className='h-10 w-fit px-4 xl:px-6 bg-blue-600 hover:bg-blue-900 text-white font-semibold rounded transition-all duration-300 cursor-pointer'>
        {dark ? "Light" : "Dark"}
      </button>
    </nav>
  )
}

const FooterPart = () => {
  return (
    <footer className=' w-full h-fit grid grid-cols-1 xl:grid-cols-3 bg-blue-400 dark:bg-blue-700 dark:text-white mt-5 p-5'>
      <div className='h-fit w-full flex flex-col gap-2 items-center'>
        <h2 className='text-xl font-semibold'>Task Manager App</h2>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
      </div>
      <div className='h-full w-full flex flex-col gap-2 items-center'>
        <h2 className='text-xl font-semibold'>Counter App</h2>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
      </div>
      <div className='h-full w-full flex flex-col gap-2 items-center'>
        <h2 className='text-xl font-semibold'>Upcoming Project</h2>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
      </div>
    </footer>
  )

}

const App = () => {
  const [tasks, setTask] = useState([{ task: 'React', description: 'Learning react with tailwind css and some other things.' }]);
  const [taskInputValue, setTaskInputValue] = useState('');
  const [taskDescInputValue, setTaskDescInputValue] = useState('');

  const addTask = () => {
    if (taskInputValue.trim() !== '') {
      setTask([...tasks, { task: taskInputValue, description: taskDescInputValue }]);
      setTaskInputValue('');
      setTaskDescInputValue('');
    }
  };

  const removeTask = (index) => {
    setTask([...tasks.slice(0, index), ...tasks.slice(index + 1)]);
  };

  const [dark, setDark] = useState(false);

  return (
    <div className='h-[100%] flex flex-col items-center gap-2 dark:bg-black dark:text-white'>
      <NavBar dark={dark} setDark={setDark} />
      <TaskInput
        taskInputValue={taskInputValue} setTaskInputValue={setTaskInputValue}
        taskDescInputValue={taskDescInputValue} setTaskDescInputValue={setTaskDescInputValue}
        addTask={addTask}
      />
      <TaskList tasks={tasks} removeTask={removeTask} />
      <FooterPart />
    </div>

  );
};

export default App;
