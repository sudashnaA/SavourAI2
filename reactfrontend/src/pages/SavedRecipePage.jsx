import mainstyle from "../styles/main.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useGetData from "../util/useGetData";
import ItemsDisplay from "../components/ItemsDIsplay";
import ButtonContainer from "../components/ButtonContainer";

import axios from "axios";

const SavedRecipePage = () => {
    const navigate = useNavigate();

    const { data, setData, errors, loading } = useGetData("recipes/");

    const [selectedAll, setSelectedAll] = useState(true);
    const [deleteMode, setDeleteMode] = useState(false);
    const [deleteItems, setDeleteItems] = useState([]);

    const [eventErrors, setEventErrors] = useState(null);

    // Event Handlers
    const handleClickItem = (id) => {
        if (!deleteMode) {
            navigate(`/savedrecipes/${id}`);
        } else if (!deleteItems.includes(id)){
            setDeleteItems([...deleteItems, id]);
        } else {
            const filteredDeleteItems = deleteItems.filter((itemid) => itemid != id);
            setDeleteItems(filteredDeleteItems);
        }
    }

    const handleSelectAllButton = () => {
        setSelectedAll(!selectedAll);
        if (selectedAll){
            const allIds = data.recipes.map(recipe => recipe.id);
            setDeleteItems(allIds);
        } else {
            setDeleteItems([]);
        }
    }


    const handleDeleteModeButton = () => {
        setDeleteItems([]);
        setDeleteMode(!deleteMode);
        setSelectedAll(true);
        setEventErrors(null);
    }

    const handleConfirmDeleteButton = async () => {
        try {
            await axios.delete(import.meta.env.VITE_API_URL + `recipes/many/[${deleteItems}]`, { headers: {
                'Authorization': localStorage.getItem('jwt'),
            }})
            const filteredRecipes = data.recipes.filter(recipe => !deleteItems.includes(recipe.id));
            setData({...data, recipes: filteredRecipes });
        } catch (error) {
            console.log(error);
            setEventErrors(error);
        } finally {
            setDeleteItems([]);
            setDeleteMode(false);
        }
    }

    return(
    <div className={mainstyle.container}>
        <ItemsDisplay data={data.recipes} errors={errors} loading={loading} handleClickItem={handleClickItem} selectItems={deleteItems} eventErrors={eventErrors} title={"Recipes"} emptymsg={"You do not have any recipes"}>
        <ButtonContainer>
                <button title={deleteMode ? "Cancel" : "Delete Recipes"} onClick={handleDeleteModeButton}><img src={`/${(deleteMode ? "close-square" : "delete" )}-svgrepo-com.svg`} alt="Delete Recipes Button"/></button>
                { (deleteMode) && 
                <>
                    <button title={selectedAll ? "Select All" : "Deselect All"} onClick={handleSelectAllButton}><img src={`/${(selectedAll ? "all-layers" : "cancel-close-remove-app-dev-interface" )}-svgrepo-com.svg`} alt="Select All Button"/></button>
                    <button title="Confirm Delete Recipes" onClick={handleConfirmDeleteButton}><img src={'/tick-checkbox-svgrepo-com.svg'} alt="Confirm Delete Recipes Button"/></button>
                </>
                }
         </ButtonContainer>

        {(eventErrors) && ( eventErrors.status === 400 ? <FormErrors errors={eventErrors.response.data.errors}/> : <h2>A network error was encountered</h2>)}
        </ItemsDisplay>
    </div>
    )
}

export default SavedRecipePage;