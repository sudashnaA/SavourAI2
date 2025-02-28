import styles from "../styles/recipe-title.module.css";

const RecipeTitle = ({children}) => {
    return(
        <div className={styles.titlecontainer}>
            {children}
        </div>
    )
}

export default RecipeTitle;