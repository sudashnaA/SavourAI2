import styles from "../styles/header.module.css"

const Header = () => {
    return(
        <div className={styles.header}>
            <h1 className={styles.title}>SavourAI</h1>
            <div className={styles.logocontainer}><img src="/chef-hat-svgrepo-com.svg" alt="Chef Hat Graphic"/></div>
        </div>
    )
}

export default Header;