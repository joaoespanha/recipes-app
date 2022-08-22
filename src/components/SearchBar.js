import React from 'react';

export default function SearchBar() {
  return (
    <div>
      <form>
        <input data-testid="search-input" type="text" />
        <input
          data-testid="ingredient-search-radio"
          type="radio"
        />
        <input
          data-testid="name-search-radio"
          type="radio"
        />
        <input
          data-testid="first-letter-search-radio"
          type="radio"
        />
        <button data-testid="exec-search-btn" type="submit">Pesquisar</button>
      </form>
    </div>
  );
}
