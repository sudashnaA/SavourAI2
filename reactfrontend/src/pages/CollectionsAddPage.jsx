import mainstyle from "../styles/main.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import FormErrors from "../components/FormErrors";
import useGetData from "../util/useGetData";
import ItemsDisplay from "../components/ItemsDIsplay";
import ButtonContainer from "../components/ButtonContainer";

import axios from "axios";

const CollectionsAddPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const { data, setData, errors, loading } = useGetData(`collections/${id}/recipesnotin/`);

    const [selectedAll, setSelectedAll] = useState(true);
    const [selectedItems, setSelectedItems] = useState([]);
    const itemSelected = selectedItems.length > 0;

    const [eventErrors, setEventErrors] = useState(null);

    // Event Handlers
    const handleClickItem = (id) => {
        if (!selectedItems.includes(id)){
            setSelectedItems([...selectedItems, id]);
        } else {
            const filteredDeleteItems = selectedItems.filter((itemid) => itemid != id);
            setSelectedItems(filteredDeleteItems);
        }
    }

    const handleSelectAllButton = () => {
        setSelectedAll(!selectedAll);
        if (selectedAll){
            const allIds = data.recipes.map(recipe => recipe.id);
            setSelectedItems(allIds);
        } else {
            setSelectedItems([]);
        }
    }

    const handleConfirmAddButton = async () => {
        try {
            await axios.post(import.meta.env.VITE_API_URL + `collections/${id}/collectionitems/`, {
                recipeids: `[${selectedItems}]`
            }, { headers: {
                'Authorization': localStorage.getItem('jwt'),
            }})
            const filteredItems = data.recipes.filter(item => !selectedItems.includes(item.id));
            setData({...data, recipes: filteredItems });
            setSelectedItems([]);
            setSelectedAll(false);
        } catch (error) {
            setEventErrors(error);
        }
    }

    return(
    <div className={mainstyle.container}>
        <ItemsDisplay data={data.recipes} errors={errors} loading={loading} handleClickItem={handleClickItem} selectItems={selectedItems} eventErrors={eventErrors} title={`Add to Collection: ${data.title}`} emptymsg={"There are no recipes to add to this collection"}>
        <ButtonContainer>
            <button title="Return" onClick={() => navigate(`/collections/${id}`)}><img src={"/return-svgrepo-com.svg"} alt="Return Button"/></button>
            <button title={selectedAll ? "Select All" : "Deselect All"} onClick={handleSelectAllButton}><img src={`/${(selectedAll ? "all-layers" : "cancel-close-remove-app-dev-interface" )}-svgrepo-com.svg`} alt="Select All Button"/></button>
            {itemSelected && <button title="Confirm Add Collection Items" onClick={handleConfirmAddButton}><img src={'/tick-checkbox-svgrepo-com.svg'} alt="Confirm Add Collection items Button"/></button>}
         </ButtonContainer>

        {(eventErrors) && ( eventErrors.status === 400 ? <FormErrors errors={eventErrors.response.data.errors}/> : <h2>A network error was encountered</h2>)}
        </ItemsDisplay>
    </div>
    )
}

export default CollectionsAddPage;