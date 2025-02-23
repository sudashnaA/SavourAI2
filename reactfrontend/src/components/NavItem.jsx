import styles from "../styles/sidebar.module.css"

const NavItem = ({handleClick, lastClicked, url, text}) => {

    return (
        <p onClick={() => handleClick(url)} className={`${lastClicked === url && styles.active }`}>{text}</p>
    )
}

export default NavItem;