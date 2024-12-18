import * as model from './model.js';
import RecipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { loadRecipe } from './model';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlRecipes = async function() {
  try {
    const id = window.location.hash.slice(1);

    if(!id) return;
    recipeView.renderSpinner();
    
    // 1) Loading Recipe
    await model.loadRecipe(id);
    const { recipe } = model.state; 
    
    // 2) Rendering Recipe
    recipeView.render(model.state.recipe);
    const recipeView = new recipeView(model.state.recipe);
  } 
  catch(err) {
    alert(err);
  }
}

showRecipe();

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));