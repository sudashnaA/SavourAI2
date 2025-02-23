import styles from "../styles/formerrors.module.css"

const FormErrors = ({errors}) => {
    return (
        <ul className={styles.error}>
            {errors.map((error, index) => (
                <li key={index}>{error}</li>
            ))}
        </ul>
    )
}

export default FormErrors;