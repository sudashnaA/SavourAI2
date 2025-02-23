import mainstyle from "../styles/main.module.css";
import useGetData from "../util/useGetData";
import RecipeContainer from "../components/RecipeContainer";
import Recipe from "../components/Recipe";
import Loader from "../components/Loader";
import ButtonContainer from "../components/ButtonContainer";
import FormErrors from "../components/FormErrors";
import { handleSaveRecipe } from "../util/sharedEventHandlers";
import { useState } from "react";

const RecipeOfTheDayPage = () => {
    const { data, errors, loading } = useGetData(`recipeoftheday/`);

    const [saved, setSaved] = useState(false);
    const [eventErrors, setEventErrors] = useState(null);

    return (
        <div className={mainstyle.container}>
            <h1>Recipe of the Day</h1>

            { (loading) ? <Loader/>
            : (errors) ? ((errors.status === 404) ? <h2>Recipe not found</h2> : <h2>A network error was encountered</h2>) 
            :
            <>
                {(eventErrors) && ( eventErrors.status === 400 ? <FormErrors errors={eventErrors.response.data.errors}/> : <h2>Error Saving Recipe</h2>)}
                <ButtonContainer>
                    <button onClick={() => handleSaveRecipe(data.recipe.recipe, setSaved, setEventErrors)} disabled={saved ? true : false} title="Save Recipe"><img src = "/save-floppy-svgrepo-com.svg" alt="Save Recipe Button"/></button>
                </ButtonContainer>
                <RecipeContainer>
                    <h2>{data.recipe.title}</h2>
                    <Recipe recipe={data.recipe.recipe} generated={false}/>
                </RecipeContainer>
            </>
            }
        </div>
    );
}

export default RecipeOfTheDayPage;