"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.deleteTask = exports.taskControl = void 0;
const fs_1 = __importDefault(require("fs"));
const taskList = require('../Data/taskList.json');
const uniqid_1 = __importDefault(require("uniqid"));
const taskControl = (req, res) => {
    const taskData = req.body;
    if (!taskData.task)
        return res.status(400).json({ error: 'task is required' });
    const task_data = {
        task_id: (0, uniqid_1.default)(),
        task_title: taskData.task
    };
    taskList.push(task_data);
    fs_1.default.writeFile('./Data/taskList.json', JSON.stringify(taskList), () => {
        return res.status(200).redirect('/');
    });
};
exports.taskControl = taskControl;
const deleteTask = (req, res) => {
    const id = req.params.id;
    const remain_Task = taskList.filter((ele) => {
        return ele.task_id !== id;
    });
    fs_1.default.writeFile('./Data/taskList.json', JSON.stringify(remain_Task), () => {
        return res.status(200);
    });
    return res.json({ status: 'delete successfully' });
};
exports.deleteTask = deleteTask;
const updateTask = (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    const taskIndex = taskList.findIndex((ele) => ele.task_id === id);
    if (taskIndex !== -1) {
        // Update the task if found
        taskList[taskIndex] = Object.assign(Object.assign({}, taskList[taskIndex]), updateData);
        fs_1.default.writeFile('./Data/taskList.json', JSON.stringify(taskList), () => {
            res.status(200).json({ message: "Task updated successfully", data: taskList[taskIndex] });
        });
    }
    else {
        res.status(404).json({ message: "Task not found" });
    }
};
exports.updateTask = updateTask;
