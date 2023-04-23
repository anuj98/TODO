import React from "react";
import { ITaskDetail } from "../TaskDetail";
import { TaskItem } from "./TaskItem";
import "./TaskList.css";

export enum Category {
    All,
    Important,
    Overdue
}

interface ITaskProps {
    taskList: ITaskDetail[];
    category: Category;
    deleteTask: (id: number) => void;
    updateTask: (task: ITaskDetail) => void;
}

export const TaskList = (props: ITaskProps) => {
    const getTaskList = () => {
        switch (props.category) {
            case Category.Important: return props.taskList.filter(item => item.isFavorite);
            case Category.Overdue: return props.taskList.filter(item => item.date < new Date() && !item.isCompleted);
            default: return props.taskList;
        }
    }
    return (
        <div className="taskList-wrapper">
            {getTaskList().map(item => {
                return <TaskItem taskDetail={item} deleteTask={props.deleteTask} updateTask={props.updateTask} />
            })}
        </div>
    )
}