import MainContainer from "../components/MainContainer";
import RecipeTitle from "../components/RecipeTitle";
import RecipeContainer from "../components/RecipeContainer";
import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import EventErrorsDisplay from "../components/EventErrorsDisplay";
import useGetData from "../util/useGetData";
import Recipe from "../components/Recipe";
import EditRecipe from "../components/EditRecipe";
import Loader from "../components/Loader";
import ButtonContainer from "../components/ButtonContainer";

import axios from "axios";

const SavedRecipeViewPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [searchParams] = useSearchParams();

    const { data, setData, errors, loading } = useGetData(`recipes/${id}`);
    const [revertData, setRevertData] = useState('');

    useEffect(() => {
        const fetchEditRecipeData = async () => {
           if (!errors && !loading){
                setRevertData(data);
           }
        };

        fetchEditRecipeData();
    }, [loading]);

    // State for edit mode
    const [editMode, setEditMode] = useState(false);

    // State for errors
    const [eventErrors, setEventErrors] = useState(null);

    // Event handlers
    const handleReturnButton = () => {
        const collection = searchParams.get("collection");
        (collection) ? navigate(`/collections/${collection}`) : navigate("/savedrecipes");
    }

    const handleDeleteButton = async () => {
        try {
            await axios.delete(import.meta.env.VITE_API_URL + `recipes/${id}`, {
                headers: {
                    'Authorization': localStorage.getItem('jwt'),
                }
            })
            navigate("/savedrecipes");
        } catch (error) {
           setEventErrors(error);
        }
    }

    const handleSaveEditsButton = async () => {
        setEventErrors(null);
        try {
            await axios.put(import.meta.env.VITE_API_URL + `recipes/${id}`, {
                title: data.recipe.title,
                recipe: data.recipe.recipe,
            }, { headers: {
                'Authorization': localStorage.getItem('jwt'),
            }})
            setEditMode(false);
            setRevertData(data);
        } catch (error) {
            setEventErrors(error);
        }
    }

    const handleCancelEditsButton = async () => {
        setEventErrors(null);
        setData(revertData);
        setEditMode(false);
    }

    return(
    <MainContainer>

        { (loading) ? <Loader/>
        : (errors) ? ((errors.status === 404) ? <h2>Recipe not found</h2> : <h2>A network error was encountered</h2>) 
        :
        <>
            <EventErrorsDisplay eventErrors={eventErrors}/>
            <ButtonContainer>
                <button title="Return" onClick={handleReturnButton}><img src = "/return-svgrepo-com.svg" alt="Return Button"/></button>
                <button title="Delete Recipe" onClick={handleDeleteButton}><img src = "/delete-svgrepo-com.svg" alt="Delete Recipe Button"/></button>
                {(!editMode) ? <button title="Edit Recipe" onClick={() => setEditMode(true)}><img src = "/new-svgrepo-com.svg" alt="Edit Recipe Button"/></button>
                : <>
                    <button title="Save Edits" onClick={handleSaveEditsButton}><img src = "/save-floppy-svgrepo-com.svg" alt="Save Edits Button"/></button>
                    <button title="Cancel Edits" onClick={handleCancelEditsButton}><img src = "/close-square-svgrepo-com.svg" alt="Cancel Edits Button"/></button>
                </>}
                
            </ButtonContainer>
            <RecipeContainer>
                {(!editMode) 
                ?
                <>
                    <RecipeTitle><h2>{data.recipe.title}</h2></RecipeTitle>
                    <Recipe recipe={data.recipe.recipe} generated={false}/>
                </>
                :
                <EditRecipe data={data} setData={setData}/>
                }
            </RecipeContainer>
        </>
        }
    </MainContainer>
    )
}

export default SavedRecipeViewPage;