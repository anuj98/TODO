import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AllTasks } from './AllTasks/AllTasks';
import './App.css';
import { ImportantTasks } from './ImportantTasks/ImportantTasks';
import { Navbar } from './Navbar/Navbar';
import { OverdueTasks } from './OverdueTasks/OverdueTasks';
import { ITaskDetail, taskDetails } from './TaskDetail';

function App() {
  const [allTaskList, setAllTaskList] = useState<ITaskDetail[]>([]);

  useEffect(() => {
    fetch('/api/gettasklist')
      .then(response => {
        return response.text();
      })
      .then((dataStringified: string) => {
        const list: ITaskDetail[] = JSON.parse(dataStringified);
        for (const task of list) {
          task.date = new Date(task.date);
        }
        setAllTaskList(list);
      })
      .catch(() => {
        setAllTaskList([]);
      });
  }, []);

  const addTask = (title: string, date: Date) => {
    let max = -1;
    allTaskList.forEach(item => {
      if (item.id > max) max = item.id;
    })
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: ++max,
        title: title,
        date: date,
        isCompleted: false,
        isFavorite: false,
      } as ITaskDetail)
    };

    fetch('/api/addtask', requestOptions)
      .then(response => response.text())
      .then(dataStringified => {
        const list: ITaskDetail[] = JSON.parse(dataStringified);
        for (const task of list) {
          task.date = new Date(task.date);
        }
        setAllTaskList(list);
      })
      .catch(() => setAllTaskList(allTaskList));
  }

  const deleteTask = (id: number): void => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(`/api/deletetask?id=${id}`, requestOptions)
      .then(response => response.text())
      .then(dataStringified => {
        const list: ITaskDetail[] = JSON.parse(dataStringified);
        for (const task of list) {
          task.date = new Date(task.date);
        }
        setAllTaskList(list);
      })
      .catch(() => setAllTaskList(allTaskList));
  }

  const updateTask = (taskdetail: ITaskDetail): void => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskdetail),
    };
    fetch(`/api/updatetask`, requestOptions)
      .then(response => response.text())
      .then(dataStringified => {
        const list: ITaskDetail[] = JSON.parse(dataStringified);
        for (const task of list) {
          task.date = new Date(task.date);
        }
        setAllTaskList(list);
      })
      .catch(() => setAllTaskList(allTaskList));
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
