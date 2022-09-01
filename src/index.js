// write your code here

// Fetch data from the local API and update the DOM
// Listen to user events and update the DOM

document.addEventListener('DOMContentLoaded', () => {
    // Display ramen images
    displayRamenImages()
})

// Display all the ramen images on the DOM
function displayRamenImages(){
    fetch('http://localhost:3000/ramens')
    .then( (response) => response.json())
    .then( (result) => {
        // Grab the div for the images
        const imgDiv = document.querySelector('#ramen-menu');
        // Add the images to the div
        for (let ramen of result){
            const img = document.createElement('img');
            img.src = ramen.image;
            imgDiv.appendChild(img);

            // Listen to the click event on the image
            // Display that ramen's details
            img.addEventListener('click', () => {
                displayRamenDetails(ramen);
            })
        }
    })
}

// Display information about a ramen when clicked
function displayRamenDetails(ramen){
    // Capture ramen info
    const name = ramen.name;
    const restaurant = ramen.restaurant;
    const image = ramen.image;
    const rating = ramen.rating;
    const comment = ramen.comment;

    // Append thge info to the DOM
    // Add image
    const ramenImage = document.querySelector(".detail-image");
    ramenImage.src = image;

    // Add name
    const ramenName = document.querySelector('.name');
    ramenName.textContent = name;

    // Add restaurant
    const ramenRestaurant = document.querySelector('.restaurant');
    ramenRestaurant.innerHTML = restaurant;

    // Add rating
    const ramenRating = document.querySelector('#rating-display');
    ramenRating.innerText = rating;

    // Add comment
    const ramenComment = document.querySelector('#comment-display');
    ramenComment.textContent = comment;
}
