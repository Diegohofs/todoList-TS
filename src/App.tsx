import { FormEvent, useState } from 'react'
import styles from './App.module.css'
import logoImg from './assets/images/logo-todo.png'
import plusImg from './assets/plus.svg'
import { NewTask } from './Newtask'
import { v4 as uuidv4 } from 'uuid';
import { ZeroTasks } from './ZeroTasks'

export interface TaskProps {
  id: string;
  content: string;
  isComplete: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<TaskProps[]>([])
  const [newTasks, setNewTasks] = useState('')
  
  const tasksDone = tasks.reduce((completed, task) => {
    return task.isComplete ? completed + 1 : completed
  }, 0)

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    if(!newTasks) {
      return
    }

    const newTask = {
      id: uuidv4(),
      content: newTasks,
      isComplete: false
    }

    setTasks(state => [...state, newTask])

    setNewTasks('')
  }

  function handleNewTask(event: React.ChangeEvent<HTMLInputElement>) {
    const createATask = event.currentTarget.value

    setNewTasks(createATask)

  }

  function onToggleTask(id: string) {
    const completedTasks = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    } : task)
    setTasks(completedTasks)
  }

  function onDeleteTask(id: string) {
    const tasksWithoutDeleteOne = tasks.filter(task => task.id !== id)

    setTasks(tasksWithoutDeleteOne)
  }

  
  return (
    <>
      <header className={styles.header}>
        <img src={logoImg} />
      </header>
      <div className={styles.container}>
        <main>
          <form className={styles.newTask}>
            <input
              value={newTasks}
              onChange={handleNewTask}
              placeholder="Adicionar nova tarefa"
            />
            <button
              type="submit"
              onClick={handleCreateNewTask}
            >
              <span>Criar</span>
              <img src={plusImg} alt="Imagem com o simbolo de mais" />
            </button>
          </form>
        </main>

        <div className={styles.tasksTitle}>
          <span className={styles.tasksCount}>Tarefas criadas <span>{tasks.length}</span> </span>
          <span className={styles.tasksDone}>Concluídas <span>{tasksDone} de {tasks.length} </span></span>
        </div>
        {tasks.length === 0 ? (<ZeroTasks />) :
          (tasks.map(task => {
            return <NewTask
              content={task.content}
              key={task.id}
              id={task.id}
              isComplete={task.isComplete}
              onToggleTask={onToggleTask}
              onDeleteTask={onDeleteTask}
              
            />
          })
          )
        }

      </div>
    </>
  )
}

