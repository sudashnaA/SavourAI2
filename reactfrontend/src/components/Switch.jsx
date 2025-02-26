import styles from "../styles/switch.module.css";

const Switch = ({on, setOn}) => {
    return (
        <>
            <label className={styles.switch}>
            <input type="checkbox" onChange={setOn} checked={on}></input>
            <span className={styles.slider}></span>
            </label>
        </>
    )
}

export default Switch;