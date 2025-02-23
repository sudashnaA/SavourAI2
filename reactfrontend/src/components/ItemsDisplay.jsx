import { useState } from "react";
import ItemsContainer from "./ItemsContainer";
import Item from "./Item";
import Loader from "./Loader";
import FormErrors from "./FormErrors";
import SearchBar from "./SearchBar";

const ItemsDisplay = ({data, errors, loading, handleClickItem, selectItems, children, title, emptymsg}) => {
    const [search, SetSearch] = useState('');
    
     // Filter data using the search params
     let filteredData;
     if (!errors && !loading){
         filteredData = data.filter(item => item.title.toLowerCase().match(search.trim().toLowerCase()));
     }

    return(
        <>
        { (loading) ? <Loader/>
        : (errors) ? <p>A network error was encountered</p> :
        <>
            <h1>{title}</h1>

            {/* Buttons will go here */}
            {children}

            { (data.length > 0) && <SearchBar onChange={SetSearch}/>}

            <ItemsContainer>
                { (data.length <= 0) ? <h2>{emptymsg}</h2> :
                <>
                    {filteredData.map(item => (
                        <Item handleClick={() => handleClickItem(item.id)} key={item.id} name={item.title} selected={selectItems.includes(item.id)}/>
                    ))}
                </>
                }
            </ItemsContainer>
        </>
        }
        </>
    )
}

export default ItemsDisplay;