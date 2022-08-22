import * as URL from '../helpers/endpoints';

async function fetchFoods(currentSelected, inputSearch) {
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
      throw new Error('URL inválida');
    }
    return data.meals;
  } catch (error) {
    console.log(error.message);
  }
}

export default fetchFoods;
