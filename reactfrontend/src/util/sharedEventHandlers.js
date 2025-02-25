import axios from "axios";
import { useNavigate } from "react-router-dom";

// Shared save recipe function
const handleSaveRecipe = async (recipe, setSaved, setErrors) => {
    // Extract title from recipe which is the first line. ( Generated recipe does not have a specific "title" attribute )
    const title = (recipe.slice(0, recipe.indexOf("\n"))).replace(/[+#*\n]|^\d+/g, " ").trim();
    
    try {
        await axios.post(import.meta.env.VITE_API_URL + 'recipes/', {
            title,
            recipe,
        }, {
            headers: {
                'Authorization': localStorage.getItem('jwt'),
            }
        })
        setSaved(true);
        alert("Saved Recipe");
    } catch (error) {
        setErrors(error);
    }
}

// Function which will handle clicks of items
// if selectMode / deleteMode state is active, the click will add the item to the state array of selectedItems
// if already in the state array the item will be removed from the array
// If not in selectMode / deleteMode the user will be redirected to show details of the item
const handleClickItem = (url, selectMode, selectedItems, setSelectedItems) => {
    const navigate = useNavigate();

    return function handleClick(id){
        if (!selectMode) {
            navigate(url + id);
        } else if (!selectedItems.includes(id)){
            setSelectedItems([...selectedItems, id]);
        } else {
            const filteredItems = selectedItems.filter((itemid) => itemid != id);
            setSelectedItems(filteredItems);
        }
    }
}

// Will add all items to the selectedItems state array.
// If button has been pressed ( determined by selectedAll state, the function will deselect all ) 
const handleSelectAllButton = (selectedAll, setSelectedAll, setSelectedItems, data) => {
    setSelectedAll(!selectedAll);
    if (selectedAll){
        const allIds = data.map(item => item.id);
        setSelectedItems(allIds);
    } else {
        setSelectedItems([]);
    }
}

// Will send a req to the server with the selectedItems to do an action eg DELETE
const handleConfirmButton = async (url, selectedItems, setSelectedItems, data, setData, setSelectMode, type, req, setEventErrors) => {
    try {
        await axios[req](import.meta.env.VITE_API_URL + url, { headers: {
            'Authorization': localStorage.getItem('jwt'),
        }})
        const filtereditems = data.filter(item => !selectedItems.includes(item.id));
        setData({...data, [type]: filtereditems });
    } catch (error) {
        console.log(error);
        setEventErrors(error);
    } finally {
        setSelectedItems([]);
        setSelectMode(false);
    }
}

// Will enable / disable the remove / add mode which is store in state
const handleModeButton = (setItems, setMode, mode, setSelectedAll, setEventErrors) => {
    setItems([]);
    setMode(!mode);
    setSelectedAll(true);
    setEventErrors(null);
}


export { handleSaveRecipe, handleClickItem, handleSelectAllButton, handleConfirmButton, handleModeButton }