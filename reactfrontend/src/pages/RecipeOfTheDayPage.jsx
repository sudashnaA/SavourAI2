import useGetData from "../util/useGetData";
import RecipeContainer from "../components/RecipeContainer";
import MainContainer from "../components/MainContainer";
import Recipe from "../components/Recipe";
import RecipeTitle from "../components/RecipeTitle";
import Loader from "../components/Loader";
import ButtonContainer from "../components/ButtonContainer";
import EventErrorsDisplay from "../components/EventErrorsDisplay";
import { handleSaveRecipe } from "../util/sharedEventHandlers";
import { useState } from "react";

const RecipeOfTheDayPage = () => {
    const { data, errors, loading } = useGetData(`recipeoftheday/`);

    const [saved, setSaved] = useState(false);
    const [eventErrors, setEventErrors] = useState(null);

    return (
        <MainContainer>
            <h1>Recipe of the Day</h1>
            { (loading) ? <Loader/>
            : (errors) ? ((errors.status === 404) ? <h2>Recipe not found</h2> : <h2>A network error was encountered</h2>)
            :
            <>
                <EventErrorsDisplay eventErrors={eventErrors}/>
                <ButtonContainer>
                    <button onClick={() => handleSaveRecipe(data.recipe.recipe, setSaved, setEventErrors)} disabled={saved ? true : false} title="Save Recipe"><img src = "/save-floppy-svgrepo-com.svg" alt="Save Recipe Button"/></button>
                </ButtonContainer>
                <RecipeContainer>
                    <RecipeTitle><h2>{data.recipe.title}</h2></RecipeTitle>
                    <Recipe recipe={data.recipe.recipe} generated={false}/>
                </RecipeContainer>
            </>
            }
        </MainContainer>
    );
}

export default RecipeOfTheDayPage;