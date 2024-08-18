document.addEventListener("DOMContentLoaded", function () {
    // Fetch American food data from the API
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=American')
        .then(response => response.json())
        .then(data => {
            // Select the container to display the dishes
            const dishesContainer = document.getElementById('western-dishes'); // Ensure this ID matches the container in your HTML

            // Dish descriptions
            const dishDescriptions = {
                "Chicken Fajita Mac and Cheese": "This indulgent dish combines creamy mac and cheese with a vibrant kick of fajita seasoning. Tender chunks of chicken and colorful bell peppers add a delightful crunch and flavor contrast. It's a satisfying and flavorful twist on a classic comfort food that brings together the best of both worlds.",
                "Banana Pancakes": "These light and fluffy pancakes are infused with the natural sweetness of ripe bananas, making them perfect for a sweet and satisfying breakfast or brunch. Served with a drizzle of syrup and topped with fresh fruit, they offer a delicious start to your day or a delightful treat at any time.",
                "BBQ Pork Sloppy Joes": "Tender, shredded pork is slow-cooked in a smoky BBQ sauce and then piled high on a soft bun, creating a messy but mouthwatering sandwich. With a combination of rich flavors and a satisfying texture, these Sloppy Joes are a great choice for a hearty meal that's both comforting and flavorful.",
                "Beef Brisket Pot Roast": "This classic dish features beef brisket slow-cooked to perfection with an array of vegetables in a savory, rich broth. The extended cooking time ensures that the meat becomes incredibly tender and absorbs all the flavors, making each bite a succulent and satisfying experience.",
                "Big Mac": "The iconic Big Mac is a fast-food classic known for its distinctive flavor combination. It includes two juicy beef patties, a special sauce, lettuce, cheese, pickles, and onions, all layered between a sesame seed bun. This burger offers a unique and satisfying taste that's been loved by many for decades."
            };


            // Define dishes you want to fetch
            const dishNames = [
                "Chicken Fajita Mac and Cheese",
                "Banana Pancakes",
                "BBQ Pork Sloppy Joes",
                "Beef Brisket Pot Roast",
                "Big Mac"
            ];

            // Fetch details for specific dishes
            const fetchPromises = dishNames.map(name =>
                fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
                    .then(response => response.json())
                    .then(data => data.meals ? data.meals[0] : null)
            );

            Promise.all(fetchPromises)
                .then(meals => {
                    meals.forEach(meal => {
                        if (meal) {
                            // Create a div for each dish
                            const dishDiv = document.createElement('div');
                            dishDiv.classList.add('dish');

                            // Add content to the div
                            dishDiv.innerHTML = `
                                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                                <div class="content">
                                    <h5>${meal.strMeal}</h5>
                                    <p>${dishDescriptions[meal.strMeal] || 'Description will go here...'}</p>
                                    <button class="get-recipe-btn" data-meal-id="${meal.idMeal}">Get Recipe</button>
                                </div>
                            `;

                            // Append the div to the container
                            dishesContainer.appendChild(dishDiv);
                        }
                    });

                    // Attach event listener to all "Get Recipe" buttons
                    document.querySelectorAll('.get-recipe-btn').forEach(button => {
                        button.addEventListener('click', function () {
                            const mealId = this.getAttribute('data-meal-id');
                            fetchRecipeDetails(mealId);
                        });
                    });

                    // Function to fetch and display recipe details
                    function fetchRecipeDetails(mealId) {
                        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
                            .then(response => response.json())
                            .then(data => {
                                const meal = data.meals[0];
                                const recipeTitle = document.getElementById('recipe-title');
                                const recipeInstructions = document.getElementById('recipe-instructions');
                                const recipeIngredients = document.getElementById('recipe-ingredients');

                                recipeTitle.textContent = meal.strMeal;
                                recipeInstructions.textContent = meal.strInstructions;

                                // Clear previous ingredients
                                recipeIngredients.innerHTML = '';

                                // Add ingredients
                                for (let i = 1; i <= 20; i++) {
                                    const ingredient = meal[`strIngredient${i}`];
                                    const measure = meal[`strMeasure${i}`];
                                    if (ingredient) {
                                        const li = document.createElement('li');
                                        li.textContent = `${measure ? measure + ' ' : ''}${ingredient}`;
                                        recipeIngredients.appendChild(li);
                                    }
                                }

                                // Show the recipe details modal with animation
                                const recipeDetails = document.getElementById('recipe-details');
                                recipeDetails.style.display = 'block';
                                recipeDetails.classList.remove('hide');
                                recipeDetails.classList.add('show');
                            })
                            .catch(error => {
                                console.error('Error fetching recipe details:', error);
                            });
                    }

                    // Close recipe details modal
                    document.getElementById('close-recipe').addEventListener('click', function () {
                        const recipeDetails = document.getElementById('recipe-details');
                        recipeDetails.classList.remove('show');
                        recipeDetails.classList.add('hide');
                        // Hide the modal after animation
                        recipeDetails.addEventListener('animationend', () => {
                            recipeDetails.style.display = 'none';
                        }, { once: true }); // Ensure this runs only once
                    });
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        });
});