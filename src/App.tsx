import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';
import {v1} from 'uuid';
//rsc


export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    //bll бизнес
    //почему нельзя назвать не title  а оставить todoListTitile
    const todoListTitle = 'What to learn'
    //захардкоджено 5 объектов
    // let tasks:Array<TaskType> = [
    //     {id: 1, title: "HTML&CSS", isDone: true},
    //     {id: 2, title: "JS/TS", isDone: true},
    //     {id: 3, title: "React", isDone: false},
    //     {id: 10, title: "Redux", isDone: false},
    //     {id: 11, title: "Rtk", isDone: false},
    // ]
//result Меняем на [tasks, setTasks]
    const [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS/TS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Rtk', isDone: false},
        ]
    )
    const [filter, setFilter] = useState<FilterValuesType>('all')
    //  у нас вылетает массив и мы его на ходу раскидываем в переменные tasks  и setTasks

    //   let tasks= result[0] в таск мы пишем первое, вернувшиееся из state а в setTasks - второе, Первый элемент обозначает текущее значение, а второй является функцией, позволяющей менять это значение.
    //   const setTasks= result[1]
//если стоят круглые скобки функция useState будет всегда вызываться когда перерисовывается компонента APP, и она ыозвращает массив
//2 урок
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter((t) => t.id !== taskId))
    }
//gui графическая

    const changeFilter = (filter: FilterValuesType) => {//filter =nameButton из таски про фильтр
        setFilter(filter)
    }
// 3 урок
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask, ...tasks]) }
        // const copyTask =[...tasks]
        // copyTasks.push(newTask)
        // setTasks(copyTasks) выбираем скопированный массив и передаем наверх в usestate


    //4
    const changeTaskStatus=(taskId: string, newStatus: boolean)=>{
         const updatedTasks: Array<TaskType> =
        tasks.map(t=> t.id === taskId ? {...t, isDone: newStatus}  : t ) //{id: v1(), title: 'JS/TS', isDone: true}, это значит ...spread оператор, когда он , старое значение isDone затирается
        setTasks(updatedTasks)
        //setTasks(tasks.map(t=> t.id === taskId ? {...t, isDone: newStatus}  : t ))
    }
//3 урок
    const getFilteredTasks =(t: Array<TaskType>, f: FilterValuesType)=>{
        let tasksForTodoList = t;
        if (f === 'active') {
            tasksForTodoList = t.filter(t => !t.isDone)
        }
        if (f === 'completed') {
            tasksForTodoList = t.filter(t => t.isDone)
        }
        return  tasksForTodoList
    }
    //1 урок
        //было вот это
        // let tasksForTodoList = tasks;
        // //текущее состояние равно всем таскам
        // if (filter === 'active') {
        //     tasksForTodoList = tasks.filter(t => !t.isDone)
        // }
        // if (filter === 'completed') {
        //     tasksForTodoList = tasks.filter(t => t.isDone === true)
        // }
        return(
        <div className="App">
            <TodoList
                tasks={getFilteredTasks(tasks, filter)}
               // было вот так tasks={tasksForTodoList}
                filter={filter}
                title={todoListTitle}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;

