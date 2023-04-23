import React from "react";
import * as Icons from "@mui/icons-material";
import "./TaskList.css"
import { ITaskDetail } from "../TaskDetail";

interface ITaskItemProps {
    taskDetail: ITaskDetail;
    deleteTask: (id: number) => void;
    updateTask: (task: ITaskDetail) => void;
}

export const TaskItem = (props: ITaskItemProps) => {
    return (
        <div className="taskItem-wrapper">
            <div className="taskTitle-wrapper">
                <input type="checkbox" checked={props.taskDetail.isCompleted} onChange={() => {
                    props.updateTask({...props.taskDetail, isCompleted: !props.taskDetail.isCompleted})
                }}/>
                <div className="title-style">{props.taskDetail.title}</div>
            </div>
            <div className="taskOperation-wrapper">
                <div className="date-style">{props.taskDetail.date.toDateString()}</div>
                {props.taskDetail.isFavorite ? (
                    <Icons.Star className="favorite-style" onClick={() => props.updateTask({...props.taskDetail, isFavorite: false})}/>
                ) : (
                    <Icons.StarOutline className="favorite-style" onClick={() => props.updateTask({...props.taskDetail, isFavorite: true})}/>
                )}
                <Icons.DeleteOutline className="delete-style" onClick={() => props.deleteTask(props.taskDetail.id)} />
            </div>
        </div>
    )
}