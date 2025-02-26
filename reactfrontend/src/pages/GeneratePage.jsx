import MainContainer from "../components/MainContainer";
import Form from "../components/Form"
import RecipeContainer from "../components/RecipeContainer";
import Recipe from "../components/Recipe";
import ButtonContainer from "../components/ButtonContainer";
import { useState } from "react";
import axios from "axios";
import EventErrorsDisplay from "../components/EventErrorsDisplay";
import Loader from "../components/Loader";
import { handleSaveRecipe } from "../util/sharedEventHandlers";

const GeneratePage = () => {
    // State for the form
    const [showCustom, setShowCustom] = useState(false);
    const [customRecipe, setCustomRecipe] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [recipe, setRecipe] = useState('random');
    const [requests, setRequests] = useState('');

    const [submitted, setSubmitted] = useState(false);
    const [saved, setSaved] = useState(false);

    // State for request
    const [generatedRecipe, setGeneratedRecipe] = useState('');
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const handleChangeRecipe = (e) => {
        setRecipe(e.target.value);
        if (e.target.value === "custom"){
            setShowCustom(true);
        } else {
            setShowCustom(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(null);
        setLoading(true);
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + 'recipes/generate', {
                ingredients,
                recipetype: showCustom ? customRecipe : recipe,
                requests,
            }, {
                headers: {
                    'Authorization': localStorage.getItem('jwt'),
                }
            })
            setGeneratedRecipe(response.data.recipe);
            setSubmitted(true);
        } catch (error) {
           setErrors(error);
        } finally {
            setLoading(false);
        }
    }

    const handleNewRecipe = () => {
        setShowCustom(false);
        setIngredients('');
        setRecipe('random');
        setRequests('');
        setSubmitted(false);
        setGeneratedRecipe('');
        setCustomRecipe('');
        setSaved(false);
    }

    return(
    <MainContainer>
        <h1>Generate Recipe:</h1>
        <Form handleSubmit={handleSubmit}>
            <label> Ingredients: <input type="text" value={ingredients} disabled={submitted ? true : false} required onChange={(e) => setIngredients(e.target.value)}></input></label>
            <label> Recipe Type: <select type="select" value={recipe} disabled={submitted ? true : false} onChange={handleChangeRecipe}>
                <option value="random">Random</option>
                <option value="burger">Burger</option>
                <option value="sandwich">Sandwich</option>
                <option value="pizza">Pizza</option>
                <option value="pasta">Pasta</option>
                <option value="roti">Roti</option>
                <option value="hotdog">Hot Dog</option>
                <option value="curry">Curry</option>
                <option value="roast">Roast</option>
                <option value="icecream">Ice Cream</option>
                <option value="kebab">Kebab</option>
                <option value="custom">Custom</option>
            </select></label>
            {showCustom && <label> Custom Type: <input type="text" disabled={submitted ? true : false} onChange={(e) => setCustomRecipe(e.target.value)}></input></label>}
            <label> Requests:&nbsp;&nbsp;&nbsp; <input type="text" value={requests} disabled={submitted ? true : false} onChange={(e) => setRequests(e.target.value)}></input></label>
            <input type="submit" disabled={submitted ? true : false} value={"Generate Recipe"}></input>
        </Form>
        {loading && <Loader />}
        {<EventErrorsDisplay eventErrors={errors} />}
        {submitted && (
        <RecipeContainer>
            <Recipe recipe={generatedRecipe} generated={true} />
            <ButtonContainer>
                <button onClick={handleNewRecipe} title="New Recipe"><img src = "/new-svgrepo-com.svg" alt="New Recipe Button"/></button>
                <button onClick={() => handleSaveRecipe(generatedRecipe, setSaved, setErrors)} disabled={saved ? true : false} title="Save Recipe"><img src = "/save-floppy-svgrepo-com.svg" alt="Save Recipe Button"/></button>
            </ButtonContainer>
        </RecipeContainer>
        )
        }
    </MainContainer>
    )
}

export default GeneratePage;