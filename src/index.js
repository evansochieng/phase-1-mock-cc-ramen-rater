// write your code here

// Fetch data from the local API and update the DOM
// Listen to user events and update the DOM

document.addEventListener('DOMContentLoaded', () => {
    //Display first ramen details
    displayFirstRamen()

    // Display ramen images
    displayRamenImages()

    // Display new ramens
    displayNewRamen();
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

    // Append the info to the DOM
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

// Display new ramen 
function displayNewRamen(){
    const form = document.querySelector('#new-ramen');

    // Listen to the user submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Grab the details of the new ramen
        const newRamenName = event.target["new-name"].value;
        const newRamenRestaurant = event.target["new-restaurant"].value;
        const newRamenImage = event.target['new-image'].value;
        const newRamenRating = event.target['new-rating'].value;
        const newRamenComment = event.target['new-comment'].value;
        
        // Add this ramen image to the images' div
        const img = document.createElement('img');
        img.src = newRamenImage;
        // Grab the div for the images
        const imgDiv = document.querySelector('#ramen-menu');
        imgDiv.appendChild(img);

        // Add listen to the click event on the ramen image
        // Display ramen details on click
        img.addEventListener('click', () => {
            // Append the info to the DOM
            // Add image
            const ramenImage = document.querySelector(".detail-image");
            ramenImage.src = newRamenImage;

            // Add name
            const ramenName = document.querySelector('.name');
            ramenName.textContent = newRamenName;

            // Add restaurant
            const ramenRestaurant = document.querySelector('.restaurant');
            ramenRestaurant.innerHTML = newRamenRestaurant;

            // Add rating
            const ramenRating = document.querySelector('#rating-display');
            ramenRating.innerText = newRamenRating;

            // Add comment
            const ramenComment = document.querySelector('#comment-display');
            ramenComment.textContent = newRamenComment;
        })
        // POST new ramen that is created
        const ramenDetails = {
            name: newRamenName,
            restaurant: newRamenRestaurant,
            rating: newRamenRating,
            comment: newRamenComment
        };
        postRamen(ramenDetails);

        //Reset form
        event.target.reset();
    })
}

// BONUS
// Display the first ramen's details immediately on page load
function displayFirstRamen(){
    fetch('http://localhost:3000/ramens/1')
    .then( (response) => response.json())
    .then( (result) => {
        displayRamenDetails(result);
    })
}

// Make a POST request to add new ramen to the server database
function postRamen(ramenDetails){
    fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(ramenDetails)
    })
    .then( (response) => response.json())
    .then( () => alert('Ramen created successfully!'))
}
