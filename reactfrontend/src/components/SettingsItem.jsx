import styles from "../styles/settings-item.module.css";

const SettingsItem = ({children}) => {
    return(
        <div className={styles.item}>
            {children}
        </div>
    )
}

export default SettingsItem;