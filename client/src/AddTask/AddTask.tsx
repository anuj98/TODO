import React, { useState } from "react";
import "./AddTask.css";

interface IAddTaskProps {
    addTask: (title: string, date: Date) => void;
}

export const AddTask = (props: IAddTaskProps) => {
    const [title, setTitle] = useState<string>("");
    const [date, setDate] = useState<string>("");

    return (
        <div className="addtask-wrapper">
            <input
                type="text"
                placeholder='Add task title'
                className='title-input'
                onChange={e => {
                    if (e.currentTarget.value) {
                        setTitle(e.currentTarget.value);
                    }
                }} />
            <div>
                <input
                    type="date"
                    className="date-input"
                    onChange={e => {
                        if (e.currentTarget.value) {
                            setDate(e.currentTarget.value);
                        }
                    }} />
                <button
                    type="button"
                    onClick={() => {
                        const d = new Date(date);
                        props.addTask(title, d);
                    }}
                    className='add-button'>Add</button>
            </div>
        </div>

    )
}