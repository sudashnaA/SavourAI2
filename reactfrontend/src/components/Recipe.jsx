import style from "../styles/recipe.module.css"

const Recipe = ({recipe, generated}) => {

    const formatRecipeData = (recipe) => {
        recipe = decodeURIComponent(recipe);
        recipe = recipe.split(/\r?\n/).filter(function(s){return s})
    
        const recipeitems = recipe.map((element, index) => {
            const firstChar = element.substring(0,1);
    
            if (firstChar === "*" || firstChar === "#")
            {
                if (!generated && index === 0){
                    return <div key={index}></div>
                } else {
                    return <h2 key={index}>{element.replace(/[+#*\n]|^\d+/g, " ")}</h2>
                }
            }
            else{
                return <p key={index}>{element.replace(/[+#*\n]|^\d+/g, " ")}</p>
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