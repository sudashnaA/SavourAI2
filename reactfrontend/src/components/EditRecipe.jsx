import style from "../styles/edit-recipe.module.css"
import TextareaAutosize from 'react-textarea-autosize';

const EditRecipe = ({data, setData}) => {

    return (
        <div className={style.editrecipecontainer}>
            <p>Title:</p>
            <TextareaAutosize type="text" className={style.editrecipe} required value={data.recipe.title} onChange={(e) => setData({...data, recipe: { ...data.recipe, title: e.target.value}})}></TextareaAutosize>
            <p>Recipe:</p>
            <TextareaAutosize className={style.editrecipe} value={data.recipe.recipe} onChange={(e) => setData({...data, recipe: { ...data.recipe, recipe: e.target.value}})}></TextareaAutosize>
        </div>
    )
}

export default EditRecipe;