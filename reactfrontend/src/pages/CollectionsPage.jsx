import { useState } from "react";
import MainContainer from "../components/MainContainer";
import useGetData from "../util/useGetData";
import ButtonContainer from "../components/ButtonContainer";
import CollectionsForm from "../components/CollectionsForm";
import EventErrorsDisplay from "../components/EventErrorsDisplay";
import ItemsDisplay from "../components/ItemsDIsplay";
import { handleClickItem, handleSelectAllButton, handleConfirmDeleteButton } from "../util/sharedEventHandlers";

import axios from "axios";

const CollectionsPage = () => {
    // Fetch collections
    const { data, setData, errors, loading } = useGetData("collections/");

    const [selectedAll, setSelectedAll] = useState(true);
    const [deleteMode, setDeleteMode] = useState(false);
    const [deleteItems, setDeleteItems] = useState([]);

    const [createMode, setCreateMode] = useState(false);
    const [newCollectionTitle, setNewCollectionTitle] = useState('');

    const [eventErrors, setEventErrors] = useState(null);

    // Event Handlers

    const handleCreateModeButton = () => {
        setCreateMode(!createMode);
        setDeleteMode(false);
        setEventErrors(null);
    }

    const handleDeleteModeButton = () => {
        setDeleteItems([]);
        setCreateMode(false)
        setDeleteMode(!deleteMode);
        setSelectedAll(true);
        setEventErrors(null);
    }

    const handleNewCollection = async (e) => {
        e.preventDefault();
        setEventErrors(null);
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + 'collections/', {
                title: newCollectionTitle,
            }, { headers: {
                'Authorization': localStorage.getItem('jwt'),
            }})
            const newCollection = response.data.collection
            setData({...data, collections: [...data.collections, newCollection]});
            setCreateMode(false);
        } catch (error) {
            setEventErrors(error);
        }
    }

    return(
    <MainContainer>
        <ItemsDisplay data={data.collections} errors={errors} loading={loading} handleClickItem={handleClickItem("/collections/", deleteMode, deleteItems, setDeleteItems)} selectItems={deleteItems} title={"Collections"} emptymsg={"You do not have any collections"}>
            <ButtonContainer>
                <button title="Create Collection" onClick={handleCreateModeButton}><img src={`/${(createMode ? "close-square" : "add-square" )}-svgrepo-com.svg`} alt="Create Collection Button"/></button>
                <button title={deleteMode ? "Cancel" : "Delete Collections"} onClick={handleDeleteModeButton}><img src={`/${(deleteMode ? "close-square" : "delete" )}-svgrepo-com.svg`} alt="Delete Collection Button"/></button>
                { (deleteMode) && 
                <>
                    <button title={selectedAll ? "Select All" : "Deselect All"} onClick={() => handleSelectAllButton(selectedAll, setSelectedAll, setDeleteItems, data.collections)}>
                        <img src={`/${(selectedAll ? "all-layers" : "cancel-close-remove-app-dev-interface" )}-svgrepo-com.svg`} alt="Select All Button"/>
                    </button>
                    <button title="Confirm Delete Collections" onClick={() => handleConfirmDeleteButton(`collections/many/[${deleteItems}]`, deleteItems, setDeleteItems, data.collections, setData, setDeleteMode, "collections", setEventErrors)}>
                        <img src={'/tick-checkbox-svgrepo-com.svg'} alt="Confirm Delete Collections Button"/>
                    </button>
                </>
                }
            </ButtonContainer>
            <CollectionsForm mode={createMode} onSubmit={handleNewCollection} setTitle={setNewCollectionTitle} buttonVal={"Create"} />
            <EventErrorsDisplay eventErrors={eventErrors} />
        </ItemsDisplay>
    </MainContainer>
    )
}

export default CollectionsPage;