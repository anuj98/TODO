import React from "react";
import { ITaskDetail } from "../TaskDetail";
import { Category, TaskList } from "../TaskList/TaskLIst";
import "./OverdueTasks.css";

interface IOverdueTasksProps {
    taskList: ITaskDetail[];
    deleteTask: (id: number) => void;
    updateTask: (task: ITaskDetail) => void;
}

export const OverdueTasks = (props: IOverdueTasksProps) => {
    return (
        <div className="overduetasks-wrapper">
            <h1>Overdue Tasks</h1>
            <TaskList taskList={props.taskList} category={Category.Overdue} deleteTask={props.deleteTask} updateTask={props.updateTask} />
        </div>
    )
}