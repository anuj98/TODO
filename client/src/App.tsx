import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AllTasks } from './AllTasks/AllTasks';
import './App.css';
import { ImportantTasks } from './ImportantTasks/ImportantTasks';
import { Navbar } from './Navbar/Navbar';
import { OverdueTasks } from './OverdueTasks/OverdueTasks';
import { ITaskDetail, taskDetails } from './TaskDetail';

function App() {
  const [allTaskList, setAllTaskList] = useState<ITaskDetail[]>(taskDetails);

  const addTask = (title: string, date: Date) => {
    let max = -1;
    allTaskList.forEach(item => {
      if (item.id > max) max = item.id;
    })
    setAllTaskList([...allTaskList, {
      id: ++max,
      title: title,
      date: date,
      isCompleted: false,
      isFavorite: false,
    }])
  }

  const deleteTask = (id: number): void => {
    const tasks = allTaskList.filter(item => item.id !== id);
    setAllTaskList(tasks);
  }

  const updateTask = (taskdetail: ITaskDetail): void => {
    const tasks = allTaskList.map(item => {
      if (item.id === taskdetail.id) {
        return taskdetail;
      }
      return item;
    })
    setAllTaskList(tasks);
  }

  return (
    <div className="container">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/important' element={<ImportantTasks taskList={allTaskList} deleteTask={deleteTask} updateTask={updateTask} />} />
          <Route path='/overdue' element={<OverdueTasks taskList={allTaskList} deleteTask={deleteTask} updateTask={updateTask} />} />
          <Route path='/' element={<AllTasks taskList={allTaskList} addTask={addTask} deleteTask={deleteTask} updateTask={updateTask} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
