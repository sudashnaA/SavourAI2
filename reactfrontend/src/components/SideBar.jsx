import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavItem from "./NavItem";
import styles from "../styles/sidebar.module.css"

const SideBar = () => {
    const navigate = useNavigate();
    const [lastClicked, setLastClicked] = useState('');
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleClick = (location) => {
        setLastClicked(location);
        navigate(location);
        setOpen(false);
    }

    return(
        <div id="sidebarcontainer">
        <div id="sidebar" className={`${styles.sidebar} ${open ? styles.open : styles.closed}`}>
            <p onClick={handleOpen} className={styles.closebtn}>&times;</p>
            <NavItem url={"/home"} text={"Home"} lastClicked={lastClicked} handleClick={handleClick}/>
            <NavItem url={"/generate"} text={"Generate Recipe"} lastClicked={lastClicked} handleClick={handleClick}/>
            <NavItem url={"/savedrecipes"} text={"Saved Recipes"} lastClicked={lastClicked} handleClick={handleClick}/>
            <NavItem url={"/collections"} text={"Collections"} lastClicked={lastClicked} handleClick={handleClick}/>
            <NavItem url={"/recipeoftheday"} text={"Recipe of the Day"} lastClicked={lastClicked} handleClick={handleClick}/>
            <NavItem url={"/settings"} text={"Settings"} lastClicked={lastClicked} handleClick={handleClick}/>

            <p onClick={() => handleClick("/logout")}>Logout</p>
        </div>
        {!open && <button onClick={handleOpen} className={styles.openbtn}>&#9776;</button>}
        </div>
    )
}

export default SideBar;