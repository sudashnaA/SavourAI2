import styles from "../styles/items-container.module.css";

const ItemsContainer = ({children}) => {
    return(
        <div className={styles.itemscontainer}>
            {children}
        </div>
    )
}

export default ItemsContainer;