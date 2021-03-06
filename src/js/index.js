import Search from './models/Search';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader } from './views/base';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';

const state = {};



// Search Controller

const controlSearch = async () => {
    // 1. Get query from view
    const query = searchView.getInput();
    

    if (query) {
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        try {
            // 4. Serch for recipes
            await state.search.getResults();

            // 5. Redner results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (err) {
            alert('Something went wrong with the search.');
            clearLoader();
        }
    }
};

elements.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    controlSearch()
});

elements.searchResPages.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-inline')
    if (btn) {
        const goToPage= parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage)
    }
});

// Recipe Controller

const controlRecipe = async () => {
    // Get Id from url
    const id = window.location.hash.replace('#', '');
    
    if (id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight Selected
        if (state.search) searchView.highlightSelected(id)

        // Create new recipe object
        state.recipe = new Recipe(id)
        
        try {
            // Get recipe data
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Calculate servinge and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render recipe
            clearLoader();
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
                );

        } catch (err) {
            
            alert('Error processing recipe', err)
        }
       
    }

}

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe)
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe))

// Shopping List Controller

const controlList = () => {
    // Create list if none exists
    if (!state.list) state.list = new List();

    // Add each ingredient to list
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item)
    })
};

//Handle update and delete list items

elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // Handle Delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from state
        state.list.deleteItem(id);

        // Delete from UI
        listView.deleteItem(id);

        // Handle the count update
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});

// Likes Controller

const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;

    //User has not yet liked current recipe
    if (!state.likes.isLiked(currentID)) {
        // Add like to state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );

        // Toggle like button
            likesView.toggleLikeBtn(true);

        // Add like to UI list
            likesView.renderLike(newLike);

        // User has liked current recipe
    } else {
        // Remove like from state
        state.likes.deleteLike(currentID);

        // Toggle like button
        likesView.toggleLikeBtn(false);

        // Remove like from UI list
        likesView.deleteLike(currentID)
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes())
};

// Restore liked recipes on page loads

window.addEventListener('load', () => {
    state.likes = new Likes();

    // Restore Likes
    state.likes.readStorage();

    // Toggle the like menu
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // Render the existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like));
})


//Hangling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // Derease button is clicked
        if ( state.recipe.servings > 1) {
        state.recipe.updateServings('dec')
        recipeView.updateServingsIngredients(state.recipe);
        }
        
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // Derease button is clicked
        state.recipe.updateServings('inc')
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // Add ingredients to shopping list
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        // Add like
        controlLike();
    }
    
})


