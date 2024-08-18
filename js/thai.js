document.addEventListener("DOMContentLoaded", function() {
    const apiURL = "https://www.themealdb.com/api/json/v1/1/filter.php?a=Thai";
    const foodContainer = document.getElementById("thai-food-container");
    const foodDetail = document.getElementById("food-detail");
    const backButton = document.getElementById("back-button");

    // Fetch the list of Thailand food items
    function fetchThaiFood() {
        fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                const meals = data.meals.slice(0, 9); // Select the first 9 meals
                meals.forEach(meal => {
                    const foodItem = document.createElement("div");
                    foodItem.classList.add("food-item");

                    foodItem.innerHTML = `
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <h2>${meal.strMeal}</h2>
                        <button class="butn btn-primary view-recipe" data-id="${meal.idMeal}">View Recipe</button>
                    `;

                    foodContainer.appendChild(foodItem);
                });

                // Add event listeners to the "View Recipe" buttons
                document.querySelectorAll(".view-recipe").forEach(button => {
                    button.addEventListener("click", function() {
                        const mealId = this.getAttribute("data-id");
                        fetchFoodDetails(mealId);
                    });
                });
            })
            .catch(error => console.error("Error fetching Thai food:", error));
    }

    // Fetch and display food details
    function fetchFoodDetails(mealId) {
        const cachedMeal = getCookie(mealId);

        if (cachedMeal) {
            // Use cached data if available
            const meal = JSON.parse(cachedMeal);
            displayMealDetails(meal);
        } else {
            const lookupAPIUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

            fetch(lookupAPIUrl)
                .then(response => response.json())
                .then(data => {
                    const meal = data.meals[0];
                    setCookie(mealId, JSON.stringify(meal), 5); // Store data in cookie with a 5-minute expiration
                    displayMealDetails(meal);
                })
                .catch(error => console.error("Error fetching food details:", error));
        }
    }

    function displayMealDetails(meal) {
        document.getElementById("food-detail-image").src = meal.strMealThumb;
        document.getElementById("food-detail-name").textContent = meal.strMeal;
        document.getElementById("food-detail-category").textContent = `Category: ${meal.strCategory}`;
        document.getElementById("food-detail-ingredients").innerHTML = getIngredientsList(meal);
        document.getElementById("food-detail-instructions").textContent = meal.strInstructions;
        document.getElementById("food-detail-video").src = convertToEmbedUrl(meal.strYoutube);

        foodContainer.style.display = "none"; // Hide the food list
        foodDetail.style.display = "block";   // Show the food details
    }

    /* Compute measure with respective ingredient */
    function getIngredientsList(meal) {
        let ingredients = "";
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient) {
                ingredients += `<li>${measure} ${ingredient}</li>`;
            }
        }
        return ingredients;
    }

    // Convert YouTube URL to embed URL
    function convertToEmbedUrl(youtubeUrl) {
        return youtubeUrl.replace("watch?v=", "embed/");
    }

    // Set a cookie with a 5-minute expiration
    function setCookie(name, value, minutes) {
        const date = new Date();
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    // Get the value of a specific cookie
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

    // Back button event to go back to the food list
    backButton.addEventListener("click", function() {
        foodDetail.style.display = "none";
        foodContainer.style.display = "flex";
    });

    fetchThaiFood();
});
