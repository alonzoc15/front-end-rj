"use strict"

var counter = 0;
var key = "";
document.querySelector("#submitform").addEventListener("submit", getrecipe);

function getrecipe(e) {
    const submit = document.querySelector(".submit").value;
    fetch(`https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/?i=onions,garlic&q=${submit}&p=3`)
        .then(response => {
            if (response.status != 200) {
                document.querySelector("#recipeList").innerHTML = "NO RESULTS";
                console.log("Error");
                throw error(response.statusText);
            } else {
                return response.json();
            }
        })
        .then(data => {
            if (data.results.length == 0) {
            //tell the user no response
            //use innerHTML to tell the user no response
                console.log("NO RESULTS");
            } else {
                createRecipeCard(data);
            }
            console.log(data);
        })
        .catch(err => console.log(err));
    e.preventDefault();
}

function createRecipeCard(data) {
    //manipulate data
    let recipes = data.results;
    //loop through recipes
    const recipeList = document.getElementById("recipelist");
    recipeList.innerHTML = "";
    for (let index = 0; index < recipes.length; index++) {
        //create outer div to house all elements
        const cardDiv = document.createElement("div");
        //const warningDiv
        //create title  
        // const title = document.createElement("h1");
        // title.innerHTML = recipes[index].title;
        //create anchor tag for link
        const link = document.createElement("a");
        link.href = recipes[index].href;
        link.innerHTML = recipes[index].title;
        link.style.color = "white";
        link.style.border = "1px solid black";
        link.style.borderRadius = "2px";
        link.style.padding = "5px 5px 5px 5px";
        link.style.boxShadow = "0 1px 4px rgba(0, 0, 0, .6)";
        link.style.transition = "background-color .3s";
        link.style.backgroundColor = "black";
        //var css = 'a:hover{ background-color: #00ff00 }';
        //link.style.cssText = css;
        //get ingredients as string
        const ingredientsString = recipes[index].ingredients;
        //split ingredients string by ', ' into array
        const ingredientsArray = ingredientsString.split(', ');
        //create div to hold ingredients
        const ingredientsDiv = document.createElement("div");
        ingredientsDiv.style.padding = "5px 5px 5px 5px";
        //ingredientsDiv.style.border = "1px solid black";
        //create list for ingredients
        const ingredientsList = document.createElement("ol");
        //loop through ingredients array
        for (let j = 0; j < ingredientsArray.length; j++) {
            // if(ingredientsArray[j].toUpperCase() == "BREAD"){
            //   //tell people not to eat it
            // }
            // if(ingredientsArray[j].toUpperCase() == "RED CHILLIES" || ingredientsArray[j].toUpperCase() == "JALAPENOS"){
            //   //show a red pepper for hot
            // }
            const ingredient = document.createElement("li");
            ingredient.innerHTML = ingredientsArray[j];
            // getIngredientProperty(ingredientsArray[j]);
            switch (ingredientsArray[j].toLowerCase()) {
                case "bread":
                case "cornmeal":
                case " white rice":
                case "oats":
                case "potato":
                case "sugar":
                case "ice cream":
                case "white bread":
                case "rice":

                    ingredient.innerHTML += "<notification style='background: #4900D8;'> <-This Ingredient has 'bad' carbs, if on a keto diet avoid this ingredient</notification>";
                    //console.log("This has carbs");
                    break;
                case "lemon":
                case "lemon juice":
                case "limes":
                case "lime":
                case "lemons":
                case "pomegranate":
                case "grapefruit":
                case "red pepper":
                case "pineapple":
                case "barbecue":
                case "red chilies":
                case "jalapeno":
                case "tomato":
                case "tomato sauce":

                    ingredient.innerHTML += "<notification style='background: #00D154;'> <-This Ingredient has a high PH level, avoid if your diet requires low acidic foods</notification>";
                    break;
                case "avocado":
                case "apple":
                case "oats":
                case "blueberry":
                case "strawberry":
                case "peach":
                case "prune":
                case "broccali":
                case "pear":


                    ingredient.innerHTML += "<notification style='background: #EB00D9;'> <-This ingredient is considered a good carb, and is good for your brain!</notification>";
                    break;
            }
            ingredientsList.appendChild(ingredient);
        }
        ingredientsDiv.appendChild(ingredientsList);
        //cardDiv.appendChild(title);
        const brTag = document.createElement("br");
        cardDiv.appendChild(brTag);
        cardDiv.appendChild(link);
        //cardDiv.appendChild(brTag);
        cardDiv.appendChild(ingredientsDiv);
        recipeList.appendChild(cardDiv);
    }
}
// function getIngredientProperty(ingredient, ingredientElement){
//   fetch("")
//     .then(response => function(result){
//append result to ingredient
//ingredientElement.innerHTML += result.data;
// })

// }