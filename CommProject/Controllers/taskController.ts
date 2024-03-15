import express from "express";
import fs from 'fs';
const taskList = require('../Data/taskList.json')
import uniqid from 'uniqid';

interface taskType {
    task_id: string,
    task_title: string
}

export const taskControl = (req: express.Request, res: express.Response) => {
    const taskData = req.body;

    if (!taskData.task) return res.status(400).json({ error: 'task is required' })
    const task_data: taskType = {
        task_id: uniqid(),
        task_title: taskData.task
    }
    taskList.push(task_data)
    fs.writeFile('./Data/taskList.json', JSON.stringify(taskList), () => {
        return res.status(200).redirect('/')
    });
}

export const deleteTask = (req: express.Request, res: express.Response) => {
    const id = req.params.id
    const remain_Task = taskList.filter((ele: taskType) => {
        return ele.task_id !== id
    })
    fs.writeFile('./Data/taskList.json', JSON.stringify(remain_Task), () => {
        return res.status(200);
    })
    return res.json({ status: 'delete successfully' })

}

export const updateTask = (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    const updateData = req.body;

    const taskIndex = taskList.findIndex((ele: taskType) => ele.task_id === id);
    if (taskIndex !== -1) {
        // Update the task if found
        taskList[taskIndex] = { ...taskList[taskIndex], ...updateData };

        fs.writeFile('./Data/taskList.json', JSON.stringify(taskList), () => {
            res.status(200).json({ message: "Task updated successfully", data: taskList[taskIndex] });
        });
    } else {
        res.status(404).json({ message: "Task not found" });
    }
}
