import { Trash } from 'phosphor-react';
import styles from './NewTask.module.css'
import { TaskProps } from './App'

interface NewTaskProps extends TaskProps {
    onToggleTask: (id: string) => void;
    onDeleteTask: (id: string) => void;
  }

export function NewTask({content, id, isComplete, onToggleTask, onDeleteTask}: NewTaskProps) {
    function handleToggleTaskStatus() {
        onToggleTask(id)
        
    }

    function handleDeleteTask() {
        onDeleteTask(id)
    }

    return (
        <div className={styles.content}>
            <ol>
                <li className={styles.labels}>
                    <label className={isComplete ? styles.done : styles.noDone}>
                        <input 
                            type="checkbox" 
                            className={styles.check}
                            onClick={handleToggleTaskStatus}
                        />
                        {content}
                    </label >
                    <button
                        title="Delete task"
                        onClick={handleDeleteTask}
                    >
                        <Trash className={styles.trash} size={18} />
                    </button>
                </li>
            </ol>
        </div>
        
    );
}