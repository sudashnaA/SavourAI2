import style from "../styles/button-container.module.css";

const ButtonContainer = ({children}) => {
    return(
         <div className={style.buttoncontainer}>
            {children}
        </div>
    )
}

export default ButtonContainer;