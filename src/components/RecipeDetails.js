import React, { useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ReceipeContext from '../context/ReceipeContext';
import { getReceipeDetails } from '../servicesAPI/requests';

export default function RecipeDetails() {
  const { id } = useParams();
  const location = useLocation();
  const { shownReceipe, setShownReceipe } = useContext(ReceipeContext);

  const setCategory = () => {
    const { pathname } = location;
    const returnedCategory = pathname.match(/drinks/i) ?? pathname.match(/foods/i);
    console.log('category', returnedCategory[0]);
    return returnedCategory[0];
  };

  const getDetails = async () => {
    const category = setCategory();
    const receipe = await getReceipeDetails(category, id);
    console.log('receipe', receipe);
    setShownReceipe(receipe);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div>{shownReceipe[0].strAlcoholic}</div>
  );
}
