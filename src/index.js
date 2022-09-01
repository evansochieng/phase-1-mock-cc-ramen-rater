// write your code here

// Fetch data from the local API and update the DOM
// Listen to user events and update the DOM

document.addEventListener('DOMContentLoaded', () => {
    // Display ramen images
    displayImages()
})

// Display all the ramen images on the DOM
function displayImages(){
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
        }
    })
}
