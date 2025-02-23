import styles from "../styles/item.module.css";
import { Link } from "react-router-dom";

const Item = ({name, handleClick, selected}) => {
    return(
        <div onClick={handleClick} className={`${styles.item} ${(selected && styles.selecteditem)}`}>
            <p onClick={handleClick}>{name}</p>
        </div>
    )
}

export default Item;