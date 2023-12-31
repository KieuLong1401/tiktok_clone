import styles from './HeaderOnly.module.scss'

import Header from '../components/Header'

function HeaderOnly({ children }) {
    return (
        <div>
            <Header />
            <div className={styles.container}>
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    )
}

export default HeaderOnly
