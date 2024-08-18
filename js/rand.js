document.addEventListener("DOMContentLoaded", function() {
    const apiURL = "https://www.themealdb.com/api/json/v1/1/random.php";

    async function fetchFood(elementId) {
        // Check if data is already in cookies
        const mealData = getCookie(elementId);

        if (mealData) {
            // If data is found in the cookie, use it
            const meal = JSON.parse(mealData);
            displayMealData(elementId, meal);
        } else {
            try {
                // Fetch new data asynchronously
                const response = await fetch(apiURL);
                const data = await response.json();
                const meal = data.meals[0];

                // Store fetched data in cookie
                setCookie(elementId, JSON.stringify(meal), 2); // 2 minutes
                displayMealData(elementId, meal);
            } catch (error) {
                console.error("Error fetching food:", error);
            }
        }
    }

    function displayMealData(elementId, meal) {
        document.getElementById(`${elementId}-name`).textContent = meal.strMeal;
        document.getElementById(`${elementId}-category`).textContent = meal.strCategory;
        document.getElementById(`${elementId}-image`).src = meal.strMealThumb;
        document.getElementById(`${elementId}-ingredients`).innerHTML = getIngredientsList(meal);
        document.getElementById(`${elementId}-instructions`).textContent = meal.strInstructions;
        document.getElementById(`${elementId}-video`).src = convertToEmbedUrl(meal.strYoutube);
    }

    function getIngredientsList(meal) {
        let ingredients = "";
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient) {
                ingredients += `<li class="list-group-item">${measure} ${ingredient}</li>`;
            }
        }
        return ingredients;
    }

    function convertToEmbedUrl(youtubeUrl) {
        return youtubeUrl.replace("watch?v=", "embed/");
    }

    // Cookie helper functions
    function setCookie(name, value, minutes) {
        const date = new Date();
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Fetch and display two random foods asynchronously
    fetchFood("food1");
    fetchFood("food2");
});
