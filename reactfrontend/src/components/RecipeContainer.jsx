import style from "../styles/recipe-container.module.css";

const RecipeContainer = ({children}) => {
    return(
        <div className={style.recipecontainer}>
            {children}
        </div>
    )
}

export default RecipeContainer;