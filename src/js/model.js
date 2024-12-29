import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './helpers';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
    },
};

export const loadRecipe = async function(id) {
    try {
        const data = await getJSON(`${API_URL}${id}`);
        
        const {recipe} = data.data;
        state.recipe = {
          id: recipe.id,
          title: recipe.title,
          publisher: recipe.publisher,
          sourceURL: recipe.sourceURL,
          image: recipe.image_url,
          servings: recipe.servings,
          cookingTime: recipe.cooking_time,
          ingredients: recipe.ingredients,
        };
    
    } catch (err) {
        console.error(`${err}`);
        throw err;
    }
}

/* Async function because it will perform AJAX calls */
export const loadSearchResults = async function(query) {
try {
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);
    state.search.results = data.data.recipes.map(rec => {
        return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        }
    })
} catch (err) {
    throw err;
}
}
