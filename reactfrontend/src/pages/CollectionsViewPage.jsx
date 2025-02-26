import MainContainer from "../components/MainContainer";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import useGetData from "../util/useGetData";
import ItemsDisplay from "../components/ItemsDIsplay";
import EventErrorsDisplay from "../components/EventErrorsDisplay";
import CollectionsForm from "../components/CollectionsForm";
import ButtonContainer from "../components/ButtonContainer";
import { handleSelectAllButton, handleModeButton } from "../util/sharedEventHandlers";

import axios from "axios";

const CollectionsViewPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const { data, setData, errors, loading } = useGetData(`collections/${id}/collectionitems/`);

    const [selectedAll, setSelectedAll] = useState(true);
    const [removeMode, setRemoveMode] = useState(false);
    const [removeItems, setRemoveItems] = useState([]);

    const [editMode, setEditMode] = useState(false);
    const [newCollectionTitle, setNewCollectionTitle] = useState('');

    const [eventErrors, setEventErrors] = useState(null);

    // Event Handlers
    const handleClickItem = (recipeid) => {
        if (!removeMode) {
            navigate(`/savedrecipes/${recipeid}?collection=${id}`);
        } else if (!removeItems.includes(recipeid)){
            setRemoveItems([...removeItems, recipeid]);
        } else {
            const filteredItems = removeItems.filter((itemid) => itemid != recipeid);
            setRemoveItems(filteredItems);
        }
    }

    const handleEditModeButton = () => {
        setEditMode(!editMode);
        setRemoveMode(false);
        setEventErrors(null);
    }

    const handleAddButton = () => {
        navigate(`/collections/${id}/add`);
    }

    const handleConfirmRemoveModeButton = async () => {
        try {
            await axios.put(import.meta.env.VITE_API_URL + `collections/${id}/collectionitems/`, {
                recipeids: `[${removeItems}]`
            }, { headers: {
                'Authorization': localStorage.getItem('jwt'),
            }})
            const filteredCollectionItems = data.collectionitems.filter(item => !removeItems.includes(item.id));
            setData({...data, collectionitems: filteredCollectionItems });
        } catch (error) {
            setEventErrors(error);
        } finally {
            setRemoveItems([]);
            setRemoveMode(false);
        }
    }

    const handleEditCollection = async (e) => {
        e.preventDefault();
        setEventErrors(null);
        try {
            const response = await axios.put(import.meta.env.VITE_API_URL + `collections/${id}`, {
                title: newCollectionTitle,
            }, { headers: {
                'Authorization': localStorage.getItem('jwt'),
            }})
            const newCollection = response.data.collection
            setData({...data, collectiontitle: newCollection.title});
            setEditMode(false);
            setNewCollectionTitle('');
        } catch (error) {
            setEventErrors(error);
        }
    }

    return(
    <MainContainer>
        <ItemsDisplay data={data.collectionitems} errors={errors} loading={loading} handleClickItem={handleClickItem} selectItems={removeItems} eventErrors={eventErrors} title={`Collection: ${data.collectiontitle}`} emptymsg={"There are no items in this collection"}>
            <ButtonContainer>
                <button title="Return" onClick={() => navigate(`/collections/`)}><img src={"/return-svgrepo-com.svg"} alt="Return Button"/></button>
                <button title="Edit" onClick={handleEditModeButton}><img src={"/new-svgrepo-com.svg"} alt="Edit Button"/></button>
                <button title="Add to Collection" onClick={handleAddButton}><img src="/add-square-svgrepo-com.svg" alt="Add to Collection Button"/></button>
                <button title={removeMode ? "Cancel" : "Remove Collection Items"} onClick={() => handleModeButton(setRemoveItems, setRemoveMode, removeMode, setSelectedAll, setEventErrors)}>
                    <img src={`/${(removeMode ? "close-square" : "remove-square" )}-svgrepo-com.svg`} alt="Remove Collection Items Button"/>
                </button>
                { (removeMode) && 
                <>
                    <button title={selectedAll ? "Select All" : "Deselect All"} onClick={() => handleSelectAllButton(selectedAll, setSelectedAll, setRemoveItems, data.collectionitems)}>
                        <img src={`/${(selectedAll ? "all-layers" : "cancel-close-remove-app-dev-interface" )}-svgrepo-com.svg`} alt="Select All Button"/>
                    </button>
                    <button title="Confirm Remove Collection Items" onClick={handleConfirmRemoveModeButton}>
                        <img src={'/tick-checkbox-svgrepo-com.svg'} alt="Confirm Remove Collection Items Button"/>
                    </button>
                </>
                }
            </ButtonContainer>
            <CollectionsForm mode={editMode} onSubmit={handleEditCollection} setTitle={setNewCollectionTitle} buttonVal={"Edit"}/>
            <EventErrorsDisplay eventErrors={eventErrors} />
        </ItemsDisplay>
    </MainContainer>
    )
}

export default CollectionsViewPage;