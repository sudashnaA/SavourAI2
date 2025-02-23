import mainstyle from "../styles/main.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import useGetData from "../util/useGetData";
import ItemsDisplay from "../components/ItemsDIsplay";
import FormErrors from "../components/FormErrors";
import Form from "../components/Form";
import ButtonContainer from "../components/ButtonContainer";

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

    const handleSelectAllButton = () => {
        setSelectedAll(!selectedAll);
        if (selectedAll){
            const allIds = data.collectionitems.map(collection => collection.id);
            setRemoveItems(allIds);
        } else {
            setRemoveItems([]);
        }
    }

    const handleAddButton = () => {
        navigate(`/collections/${id}/add`);
    }

    const handleRemoveModeButton = () => {
        setRemoveItems([]);
        setRemoveMode(!removeMode);
        setSelectedAll(true);
        setEventErrors(null);
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
    <div className={mainstyle.container}>
        <ItemsDisplay data={data.collectionitems} errors={errors} loading={loading} handleClickItem={handleClickItem} selectItems={removeItems} eventErrors={eventErrors} title={`Collection: ${data.collectiontitle}`} emptymsg={"There are no items in this collection"}>
            <ButtonContainer>
                <button title="Return" onClick={() => navigate(`/collections/`)}><img src={"/return-svgrepo-com.svg"} alt="Return Button"/></button>
                <button title="Edit" onClick={() => setEditMode(!editMode)}><img src={"/new-svgrepo-com.svg"} alt="Edit Button"/></button>
                <button title="Add to Collection" onClick={handleAddButton}><img src="/add-square-svgrepo-com.svg" alt="Add to Collection Button"/></button>
                <button title={removeMode ? "Cancel" : "Remove Collection Items"} onClick={handleRemoveModeButton}><img src={`/${(removeMode ? "close-square" : "remove-square" )}-svgrepo-com.svg`} alt="Remove Collection Items Button"/></button>
                { (removeMode) && 
                <>
                    <button title={selectedAll ? "Select All" : "Deselect All"} onClick={handleSelectAllButton}><img src={`/${(selectedAll ? "all-layers" : "cancel-close-remove-app-dev-interface" )}-svgrepo-com.svg`} alt="Select All Button"/></button>
                    <button title="Confirm Remove Collection Items" onClick={handleConfirmRemoveModeButton}><img src={'/tick-checkbox-svgrepo-com.svg'} alt="Confirm Remove Collection Items Button"/></button>
                </>
                }
            </ButtonContainer>
            { editMode &&
                <Form handleSubmit={handleEditCollection}>
                    <div><input required onChange={(e) => setNewCollectionTitle(e.target.value)} type="text" placeholder="Enter New Title"></input> <input type="submit" value="Submit"></input></div>
                </Form>
            }

            {(eventErrors) && ( eventErrors.status === 400 ? <FormErrors errors={eventErrors.response.data.errors}/> : <h2>A network error was encountered</h2>)}
        </ItemsDisplay>
    </div>
    )
}

export default CollectionsViewPage;