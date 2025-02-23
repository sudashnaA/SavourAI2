import axios from "axios";
import { useNavigate } from "react-router-dom";

const handleSaveRecipe = async (recipe, setSaved, setErrors) => {
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

const handleSelectAllButton = (selectedAll, setSelectedAll, setSelectItems, data) => {
    setSelectedAll(!selectedAll);
    if (selectedAll){
        const allIds = data.map(item => item.id);
        setSelectItems(allIds);
    } else {
        setSelectItems([]);
    }
}

export { handleSaveRecipe, handleClickItem, handleSelectAllButton }