import React from "react";
import { AddTask } from "../AddTask/AddTask"
import { ITaskDetail } from "../TaskDetail";
import { Category, TaskList } from "../TaskList/TaskLIst";
import "./AllTasks.css";

interface IAllTasksProps {
    taskList: ITaskDetail[];
    addTask: (title: string, date: Date) => void;
    deleteTask: (id: number) => void;
    updateTask: (task: ITaskDetail) => void;
}

export const AllTasks = (props: IAllTasksProps) => {
    return (
        <div className="alltasks-wrapper">
            <h1>All Tasks</h1>
            <AddTask addTask={props.addTask}/>
            <TaskList taskList={props.taskList} category={Category.All} deleteTask={props.deleteTask} updateTask={props.updateTask} />
        </div>
    )
}