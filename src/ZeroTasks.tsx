import styles from './ZeroTasks.module.css'
import clipBoardImg from './assets/Clipboard.svg'

export function ZeroTasks() {
    return (
        <div className={styles.zeroTasks}>
            <div className={styles.content}>
                <img src={clipBoardImg} />
                <span>Você ainda não tem tarefas cadastradas</span>
                <span className={styles.light}>Crie tarefas e organize seus itens a fazer</span>
            </div>
        </div>
    )
}