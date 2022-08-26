import React from 'react';
import BtnsMenu from './BtnsMenu';
import RecipeInstructions from './RecipeInstructions';

export default function RecipeInProgress() {
  // foto
  // titulo
  // categoria
  // btn para compartilhar
  // btn para favoritar
  // lista de ingredientes
  // instrucoes da receita
  // botao para fina
  const finishRecipe = () => {
    console.log('barabam');
  };
  return (
    <div>
      <RecipeInstructions />
      <BtnsMenu />
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ finishRecipe }
      >
        Finish Recipe

      </button>
    </div>
  );
}
