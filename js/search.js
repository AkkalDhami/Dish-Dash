let searchButton = document.getElementById('searchButton');
let searchBottomButton = document.getElementById('searchBottomButton');
let searchResultsContainer = document.getElementById('searchResultsContainer');
let overlay1 = document?.querySelector(".overlay");

searchBottomButton.addEventListener('click', () => {
    overlay1.classList.remove('overlayActive');
    searchResultsContainer.classList.add("top-1/2");
    searchResultsContainer.classList.remove("-top-1/2");
})

searchButton.addEventListener('click', () => {
    overlay1.classList.remove('overlayActive');
    searchResultsContainer.classList.add("top-1/2");
    searchResultsContainer.classList.remove("-top-1/2");
})

overlay1.addEventListener('click', () => {
    overlay1.classList.add('overlayActive');
    searchResultsContainer.classList.remove("top-1/2");
    searchResultsContainer.classList.add("-top-1/2");
})