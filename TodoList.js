import React, { useState, useEffect } from 'react';
import CircularProgressBar from './CircularProgressBar';
import Notification from './Notification';
import './TodoList.css';

const TodoList = () => {
        const [tasks, setTasks] = useState(() => {
            const savedTasks = localStorage.getItem('tasks');
            return savedTasks ? JSON.parse(savedTasks) : [];
        });
        const [task, setTask] = useState('');
        const [time, setTime] = useState('');
        const [date, setDate] = useState('');
        const [isRecurring, setIsRecurring] = useState(false);
        const [filter, setFilter] = useState('all');
        const [sort, setSort] = useState('default');
        const [notification, setNotification] = useState(null);

        useEffect(() => {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }, [tasks]);

        const addTask = () => {
            if (task.trim() && time && date) {
                const newTask = { text: task, time, date, completed: false, isRecurring };
                setTasks([...tasks, newTask]);
                setTask('');
                setTime('');
                setDate('');
                setIsRecurring(false);
                showNotification('Task added successfully!', 'success');
            }
        };

        const removeTask = (index) => {
            const newTasks = tasks.filter((_, i) => i !== index);
            setTasks(newTasks);
            showNotification('Task removed successfully!', 'success');
        };

        const toggleCompletion = (index) => {
            const newTasks = tasks.map((task, i) =>
                i === index ? {...task, completed: !task.completed } : task
            );
            setTasks(newTasks);
            const message = newTasks[index].completed ? 'Task marked as uncompleted!' : 'Task marked as completed!';
            showNotification(message, 'success');
        };

        const handleFilterChange = (e) => {
            setFilter(e.target.value);
        };

        const handleSortChange = (e) => {
            setSort(e.target.value);
        };

        const showNotification = (message, type) => {
            setNotification({ message, type });
            setTimeout(() => {
                setNotification(null);
            }, 3000); // Hide after 3 seconds
        };

        const getFilteredTasks = () => {
            let filteredTasks = tasks;
            if (filter === 'completed') {
                filteredTasks = tasks.filter(task => task.completed);
            } else if (filter === 'uncompleted') {
                filteredTasks = tasks.filter(task => !task.completed);
            }
            return filteredTasks;
        };

        const getSortedTasks = (filteredTasks) => {
            if (sort === 'alphabetical') {
                return [...filteredTasks].sort((a, b) => a.text.localeCompare(b.text));
            } else if (sort === 'time') {
                return [...filteredTasks].sort((a, b) => a.time.localeCompare(b.time));
            }
            return filteredTasks;
        };

        const filteredTasks = getFilteredTasks();
        const sortedTasks = getSortedTasks(filteredTasks);

        const calculateCompletion = () => {
            if (tasks.length === 0) return 0;
            const completedTasks = tasks.filter(task => task.completed).length;
            return (completedTasks / tasks.length) * 100;
        };

        const completionPercentage = calculateCompletion();

        const checkTaskStatus = (task) => {
            const taskDateTime = new Date(`${task.date}T${task.time}`);
            const now = new Date();
            if (!task.completed && taskDateTime < now) {
                return 'failed';
            }
            return task.completed ? 'completed' : '';
        };

        return ( <
            div className = "todo-container" >
            <
            h1 > To - Do List with Timetable < /h1> {
                notification && < Notification message = { notification.message }
                type = { notification.type }
                />} <
                div className = "input-container" >
                    <
                    input type = "text"
                value = { task }
                onChange = {
                    (e) => setTask(e.target.value) }
                placeholder = "Add a new task" / >
                    <
                    input type = "time"
                value = { time }
                onChange = {
                    (e) => setTime(e.target.value) }
                /> <
                input type = "date"
                value = { date }
                onChange = {
                    (e) => setDate(e.target.value) }
                /> <
                label >
                    <
                    input type = "checkbox"
                checked = { isRecurring }
                onChange = {
                    (e) => setIsRecurring(e.target.checked) }
                />
                Recurring
                    <
                    /label> <
                    button onClick = { addTask } > Add Task < /button> <
                    /div> <
                    div className = "controls" >
                    <
                    label > Filter: < /label> <
                    select value = { filter }
                onChange = { handleFilterChange } >
                    <
                    option value = "all" > All < /option> <
                    option value = "completed" > Completed < /option> <
                    option value = "uncompleted" > Uncompleted < /option> <
                    /select> <
                    label > Sort: < /label> <
                    select value = { sort }
                onChange = { handleSortChange } >
                    <
                    option value = "default" > Default < /option> <
                    option value = "alphabetical" > Alphabetical < /option> <
                    option value = "time" > Time < /option> <
                    /select> <
                    /div> <
                    CircularProgressBar progress = { completionPercentage }
                /> <
                ul > {
                        sortedTasks.map((task, index) => ( <
                            li key = { index }
                            className = { `task-item ${checkTaskStatus(task)}` } >
                            <
                            span onClick = {
                                () => toggleCompletion(index) } > { task.text } - { new Date(`${task.date}T${task.time}`).toLocaleString() } < /span> <
                            button onClick = {
                                () => removeTask(index) } > Remove < /button> <
                            /li>
                        ))
                    } <
                    /ul> <
                    /div>
            );
        };

        export default TodoList;