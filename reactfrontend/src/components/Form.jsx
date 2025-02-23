import style from "../styles/form.module.css";

const Form = ({children, handleSubmit}) => {
    return (
        <form onSubmit={(e) => handleSubmit(e)} className={style.form}>
            {children}
        </form>
    )
}

export default Form;