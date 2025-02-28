import style from "../styles/recipe.module.css"

const Recipe = ({recipe, generated}) => {

    const formatRecipeData = (recipe) => {
        recipe = decodeURIComponent(recipe);
        recipe = recipe.split(/\r?\n/).filter(function(s){return s})
    
        const recipeitems = recipe.map((element, index) => {
            const firstChar = element.substring(0,1);
    
            if (firstChar === "*" || firstChar === "#")
            {
                return(
                    (!generated && index === 0) ? <div key={index}></div> : <div key={index} className={style.titlecontainer}><h2>{element.replace(/[+#*\n]|^\d+/g, " ")}</h2></div>
                )
            }
            else{
                const content = element.replace(/[+#*\n]|^\d+/g, " ");
                return((index === recipe.length - 1) ? <div className={style.titlecontainer} key={index}><p>{content}</p></div> : <p key={index}>{content}</p>)
            }
        })
        return recipeitems;
    }

    return (
        <div className={`${style.output} ${(generated) ? style.typewriter : ''}`}>
            {formatRecipeData(recipe)}
        </div>
    )
}

export default Recipe;