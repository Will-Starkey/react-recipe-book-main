import { useEffect, useState } from "react";
import "./App.css";
import MealDetail from "./MealDetail";

// TODO list
// Add the save meal button to the detail component
// Add a saved meals section
// Add a saved meals section to the app component
// Function to save meals

function App() {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [saved, setSaved] = useState([]);

  const handleSaveMeal = (meal) => {
    setSaved((prev) =>
      prev.some((m) => m.idMeal === meal.idMeal)
        ? prev.filter((m) => m.idMeal !== meal.idMeal)
        : [...prev, meal],
    );
  };

  const resetSaved = () => {
    setSaved([]);
  };

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken",
        );
        const data = await res.json();
        setMeals(data.meals || []);
        console.log("Meal data", data.meals);
      } catch (error) {
        console.error("Error fetching meals", error);
      }
    };

    fetchMeals();
  }, []);

  return (
    <div className="app-container">
      <div className="meal-list">
        <h2>🧑‍🍳 Recipes</h2>

        <ul>
          {meals.map((meal) => (
            <li
              key={meal.idMeal}
              className="meal-item"
              onClick={() => setSelectedMeal(meal)}
            >
              <div>{meal.strMeal}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="meal-detail">
        {selectedMeal ? (
          <>
            <MealDetail
              meal={selectedMeal}
              saved={saved}
              onToggleSave={handleSaveMeal}
            />
          </>
        ) : (
          <p className="fallback-message">Click a recipe to see details</p>
        )}
      </div>

      <div className="saved-meals">
        <div className="saved-list">
          <h2>💾 Favorite Recipes</h2>

          <button onClick={() => resetSaved()}>Clear List</button>

          <ul>
            {saved.map((meal) => (
              <li
                key={meal.idMeal}
                className="meal-item"
                onClick={() => setSelectedMeal(meal)}
              >
                <div>{meal.strMeal}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
