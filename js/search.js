let searchButton = document.getElementById('searchButton');
let searchResultsContainer = document.getElementById('searchResultsContainer');
let overlay = document.querySelector(".overlay");

searchButton.addEventListener('click', () => {
    overlay.classList.remove('overlayActive');
    searchResultsContainer.classList.add("top-1/2");
    searchResultsContainer.classList.remove("-top-1/2");
})

overlay.addEventListener('click', () => {
    overlay.classList.add('overlayActive');
    searchResultsContainer.classList.remove("top-1/2");
    searchResultsContainer.classList.add("-top-1/2");
})