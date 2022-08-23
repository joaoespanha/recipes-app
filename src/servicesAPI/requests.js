import * as URL from './endpoints';

const errorMessage = 'Sorry, we haven\'t found any recipes for these filters.';

export async function fetchFoods(currentSelected, inputSearch) {
  let complementURL = '';
  const formatedInputSearch = inputSearch.replaceAll(' ', '_');
  if (currentSelected === 'ingredient') {
    complementURL = `${URL.ingredientsFood}${formatedInputSearch}`;
  } else if (currentSelected === 'name') {
    complementURL = `${URL.nameFood}${formatedInputSearch}`;
  } else if (currentSelected === 'firstLetter') {
    complementURL = `${URL.firstLetterFood}${inputSearch}`;
  }
  try {
    const response = await fetch(complementURL);
    const data = await response.json();
    if (data.meals === null) {
      throw new Error(errorMessage);
    }
    return data.meals;
  } catch (error) {
    global.alert(error.message);
  }
}

export async function fetchDrinks(currentSelected, inputSearch) {
  let complementURL = '';
  const formatedInputSearch = inputSearch.replaceAll(' ', '_');
  if (currentSelected === 'ingredient') {
    complementURL = `${URL.ingredientsDrinks}${formatedInputSearch}`;
  } else if (currentSelected === 'name') {
    complementURL = `${URL.nameDrinks}${formatedInputSearch}`;
  } else if (currentSelected === 'firstLetter') {
    complementURL = `${URL.firstLetterDrink}${inputSearch}`;
  }
  try {
    const response = await fetch(complementURL);
    const data = await response.json();
    if (data.drinks === null) {
      throw new Error(errorMessage);
    }
    return data.drinks;
  } catch (error) {
    global.alert(error.message);
  }
}

export async function getStartRecipes(currentCategory) {
  let selectedUrl = '';
  if (currentCategory === 'foods') {
    selectedUrl = URL.nameFood;
  } else if (currentCategory === 'drinks') {
    selectedUrl = URL.nameDrinks;
  }
  const response = await fetch(selectedUrl);
  const data = await response.json();
  const selectedCategory = data?.meals ?? data.drinks;
  return selectedCategory;
  // if (data.meals) setApiResponse(data.meals);
  // if (data.drinks) setApiResponse(data.drinks);
}
