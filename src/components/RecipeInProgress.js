import React, { useContext, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import BtnsMenu from './BtnsMenu';
import RecipeInstructions from './RecipeInstructions';
import ReceipeContext from '../context/ReceipeContext';
import { getReceipeDetails } from '../servicesAPI/requests';

export default function RecipeInProgress() {
  const { id } = useParams();
  const location = useLocation();
  const { pathname } = location;
  const { setShownReceipe } = useContext(ReceipeContext);

  const setCategory = () => {
    const returnedCategory = pathname.match(/drinks/i) ?? pathname.match(/foods/i);
    return returnedCategory[0];
  };

  const getDetails = async () => {
    const receipe = await getReceipeDetails(setCategory(), id);
    setShownReceipe(receipe);
  };

  useEffect(() => {
    getDetails();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <RecipeInstructions />
      <BtnsMenu />
    </div>
  );
}
