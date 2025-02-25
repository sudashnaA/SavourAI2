import mainstyle from "../styles/main.module.css";
import { useState } from "react";
import useGetData from "../util/useGetData";
import ItemsDisplay from "../components/ItemsDIsplay";
import ButtonContainer from "../components/ButtonContainer";
import { handleClickItem, handleSelectAllButton, handleConfirmButton, handleModeButton } from "../util/sharedEventHandlers";

const SavedRecipePage = () => {

    const { data, setData, errors, loading } = useGetData("recipes/");

    const [selectedAll, setSelectedAll] = useState(true);
    const [deleteMode, setDeleteMode] = useState(false);
    const [deleteItems, setDeleteItems] = useState([]);

    const [eventErrors, setEventErrors] = useState(null);

    return(
    <div className={mainstyle.container}>
        <ItemsDisplay data={data.recipes} errors={errors} loading={loading} handleClickItem={handleClickItem("/savedrecipes/", deleteMode, deleteItems, setDeleteItems)} selectItems={deleteItems} eventErrors={eventErrors} title={"Recipes"} emptymsg={"You do not have any recipes"}>
        <ButtonContainer>
                <button title={deleteMode ? "Cancel" : "Delete Recipes"} onClick={() => handleModeButton(setDeleteItems, setDeleteMode, deleteMode, setSelectedAll, setEventErrors)}>
                    <img src={`/${(deleteMode ? "close-square" : "delete" )}-svgrepo-com.svg`} alt="Delete Recipes Button"/>
                </button>
                { (deleteMode) && 
                <>
                    <button title={selectedAll ? "Select All" : "Deselect All"} onClick={() => handleSelectAllButton(selectedAll, setSelectedAll, setDeleteItems, data.recipes)}>
                        <img src={`/${(selectedAll ? "all-layers" : "cancel-close-remove-app-dev-interface" )}-svgrepo-com.svg`} alt="Select All Button"/>
                    </button>
                    <button title="Confirm Delete Recipes" onClick={() => handleConfirmButton(`recipes/many/[${deleteItems}]`, deleteItems, setDeleteItems, data.recipes, setData, setDeleteMode, "recipes", "delete", setEventErrors)}>
                        <img src={'/tick-checkbox-svgrepo-com.svg'} alt="Confirm Delete Recipes Button"/>
                    </button>
                </>
                }
         </ButtonContainer>

        {(eventErrors) && ( eventErrors.status === 400 ? <FormErrors errors={eventErrors.response.data.errors}/> : <h2>A network error was encountered</h2>)}
        </ItemsDisplay>
    </div>
    )
}

export default SavedRecipePage;