document.addEventListener("DOMContentLoaded", () => {
    const dogListElement = document.getElementById("dog-list");
    const searchButton = document.getElementById("search-button");
    const clearButton = document.getElementById("clear-button");
    const searchInput = document.getElementById("search-input");
    let allDogs = []; // Array to store all dog data

// Fetch dog data from server
fetch("https://json-server-vercel-h7ro.vercel.app/dogs")
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Log the data to see its structure
        allDogs = data; // Assign the array directly to allDogs
        displayDogs(allDogs); // Call the display function
    })
    .catch(error => console.error("Error fetching dog data:", error));


// Function to display dogs
function displayDogs(dogs) {
    dogListElement.innerHTML = ""; // Clear previous results
    dogs.forEach(dog => {
        const dogItem = document.createElement("div");
        dogItem.className = "dog-item";
        dogItem.innerHTML = `
            <h3>${dog.name}</h3>
            <img src="${dog.image}" alt="${dog.name}" />
            <p>Breed: ${dog.breed}</p>
            <p>Sex: ${dog.sex}</p>
            <button class="read-more-button">Read More</button>
            <button class="adopt-button">Adopt</button>
            <div class="dog-details" style="display: none;">
                <p>Age: ${dog.age} years</p>
                <p>Size: ${dog.size || 'Medium'}</p>
                <p>Description: ${dog.description}</p>
            </div>
            <div class="adopt-form" style="display: none;">
                <h4>Please fill in your details and we'll reach out as soon as we can:</h4>
                <label for="name-${dog.id}">Name:</label>
                <input type="text" id="name-${dog.id}" required>
                <label for="phone-${dog.id}">Phone Number:</label>
                <input type="tel" id="phone-${dog.id}" required>
                <label for="email-${dog.id}">Email:</label>
                <input type="email" id="email-${dog.id}" required>
                <button class="submit-adopt">Submit</button>
            </div>
        `
const nameInput = dogItem.querySelector(`#name-${dog.id}`);
const phoneInput = dogItem.querySelector(`#phone-${dog.id}`);
const emailInput = dogItem.querySelector(`#email-${dog.id}`);

// Focus and blur events for form inputs
nameInput.addEventListener("focus", () => {
    nameInput.style.border = "2px solid blue";
});
nameInput.addEventListener("blur", () => {
    nameInput.style.border = "";
});

phoneInput.addEventListener("focus", () => {
    phoneInput.style.border = "2px solid blue";
});
phoneInput.addEventListener("blur", () => {
    phoneInput.style.border = "";
});

emailInput.addEventListener("focus", () => {
    emailInput.style.border = "2px solid blue";
});
emailInput.addEventListener("blur", () => {
    emailInput.style.border = "";
});
        
dogListElement.appendChild(dogItem);

//Input event listener
searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredDogs = allDogs.filter(dog => dog.breed.toLowerCase().includes(searchTerm));
    displayDogs(filteredDogs);
});

// Event listener to the "Read More" button
const readMoreButton = dogItem.querySelector(".read-more-button");
readMoreButton.addEventListener("click", () => {
    const dogDetails = dogItem.querySelector(".dog-details");
    dogDetails.style.display = dogDetails.style.display === "none" ? "block" : "none";
    readMoreButton.textContent = dogDetails.style.display === "block" ? "Read Less" : "Read More";
});

// Event listener to the "Adopt" button
const adoptButton = dogItem.querySelector(".adopt-button");
adoptButton.addEventListener("click", () => {
    const adoptForm = dogItem.querySelector(".adopt-form");
    adoptForm.style.display = adoptForm.style.display === "none" ? "block" : "none";
});

// Event listener to the "Submit" button in the adopt form
const submitButton = dogItem.querySelector(".submit-adopt");
submitButton.addEventListener("click", () => {
    const name = dogItem.querySelector(`#name-${dog.id}`).value;
    const phone = dogItem.querySelector(`#phone-${dog.id}`).value;
    const email = dogItem.querySelector(`#email-${dog.id}`).value;

    if (name && phone && email) {
        // Here you can handle the submission, e.g., send data to your server
        alert(`Thank you, ${name}! Your adoption request has been submitted.`);
        // Optionally reset the form
        dogItem.querySelector(".adopt-form").reset();
        dogItem.querySelector(".adopt-form").style.display = "none"; // Hide form after submission
    } else {
        alert("Please fill in all fields.");
    }
   });
 });
}

// Search functionality
searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredDogs = allDogs.filter(dog => dog.breed.toLowerCase().includes(searchTerm));
    displayDogs(filteredDogs);
});

// Clear functionality
clearButton.addEventListener("click", () => {
    searchInput.value = ""; // Clear the search input
    displayDogs(allDogs); // Display all dogs again
 });
})