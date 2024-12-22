import * as model from './model.js';
import RecipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { loadRecipe } from './model';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if(!id) return;
    RecipeView.renderSpinner();
    
    // 1) Loading Recipe
    await model.loadRecipe(id);
    
    // 2) Rendering Recipe
    RecipeView.render(model.state.recipe);

  } 
  catch(err) {
    alert(err);
  }
}

const browserEvents = ['hashchange', 'load'];
browserEvents.forEach(ev => window.addEventListener(ev, controlRecipes));