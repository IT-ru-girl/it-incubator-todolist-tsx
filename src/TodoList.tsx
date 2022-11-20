import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from './App';
//rsc
type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean) => void
}
//ЧТОБЫ РАЗРЕШИТЬ ИСПОЛЬЗОВАНИЕ ЭТОГО ТИПА В ФАЙЛЕ АРР ПИШЕМ EXPORT!!!!! И ТОЛЬКО ПОТОМ ПОЯВИТСЯ НАДПИСЬ В АРР ЧТО ЕГО МОЖНО ИМПОРТИРОВАТЬ
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
// crud
const TodoList = (props: TodoListPropsType) => {
    //props параметры компоненты всегда объект
    // выделяем в отдельную переменную, чтобы в списке было на что сослаться
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    //этот useState создается для изменения состояния title новой добавленной таски
    const getTasksListItem = (t: TaskType) => {
        const removeTask = (() => props.removeTask(t.id))
        const changeTaskStatus =(e:ChangeEvent<HTMLInputElement> )=> props.changeTaskStatus(t.id,e.currentTarget.checked)
        return (
            //чтобы реакт раздичал Ли нужен id для каждой
            <li key={t.id} className={t.isDone ? 'isDone' : 'notIsDone'}   >
                <input onChange={changeTaskStatus} type={'checkbox'} checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>X</button>
                {/*было так <button onClick={()=>props.removeTask(t.id)}>X</button>*/}
            </li>
        )
    }
    const taskList = props.tasks.map(getTasksListItem)

    const addTask = () => {
        const trimmedTitle= title.trim()
       if (trimmedTitle !== ""){
            props.addTask(trimmedTitle)
        } else {
           setError(true)
       }
        setTitle('')
    }
    const handlerCreator = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter)
    }
    // ф которая возвращает ф при нажатии на кнопку, все как раньше только закинутая в отд ф
    const onEnterDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTask()
    const onChangeSetLocalTitle = (e:ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const  errorMessage = error ? <div style={{ fontWeight: 'bold',color : 'hotpink' }} >title is required</div> : null
    //t=task один объект
    //     .map((t)
    // //скобки можно оставить
    //         //checked это галочка
    //      на выходе получится массив с Li
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    // вот так было onChange={(e) => setTitle(e.currentTarget.value)}
                    onChange={onChangeSetLocalTitle}
                    // вот так было onKeyDown ={(e)=>e.key==='Enter' && addTask()}
                    onKeyDown={onEnterDownAddTask}
                    className={error ? 'error': ''}
                />
                <button onClick={addTask}>+</button>
                {errorMessage}
            </div>
            <ul>
                {taskList}
                {/*// список можно создать прямо тут кодом без использования taskList,но jsx лучше держать чистым, но если он нигде не используется больше этот код , то можно*/}
                {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
            </ul>
            <div>
                <button className={props.filter === 'all'? 'activeBtn btn': 'btn'}    onClick={handlerCreator('all')}>All</button>
                <button className={props.filter === 'active'? 'activeBtn btn': 'btn'}  onClick={handlerCreator('active')}>Active</button>
                {/*вот так было <button onClick={()=>props.changeFilter('active')}>Active</button>*/}
                <button className={props.filter === 'completed'? 'activeBtn btn': 'btn'}  onClick={handlerCreator('completed')}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;