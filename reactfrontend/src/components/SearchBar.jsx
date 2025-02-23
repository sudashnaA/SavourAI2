import style from "../styles/search-bar.module.css";

const SearchBar = ({onChange}) => {
    return (
        <div className={style.searchbar}><label>Search:&nbsp;<input placeholder="Search..." onChange={(e) => onChange(e.target.value)}></input></label></div>
    )
}

export default SearchBar;