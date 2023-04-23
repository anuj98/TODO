import React from "react";
import { ITaskDetail } from "../TaskDetail";
import { Category, TaskList } from "../TaskList/TaskLIst";
import "./ImportantTasks.css";

interface IImportantTasks {
    taskList: ITaskDetail[];
    deleteTask: (id: number) => void;
    updateTask: (task: ITaskDetail) => void;
}

export const ImportantTasks = (props: IImportantTasks) => {
    return (
        <div className="importanttasks-wrapper">
            <h1>Important Tasks</h1>
            <TaskList taskList={props.taskList} category={Category.Important} deleteTask={props.deleteTask} updateTask={props.updateTask} />
        </div>
    )
}