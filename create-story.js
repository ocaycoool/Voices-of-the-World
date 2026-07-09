const PATH = "https://script.google.com/macros/s/AKfycbxtUjlnaphC8TpsV-Ya8NHraDWAMaIHUfeuRjgnpNeGsKJPuTAlkOjgJOkXR4kvaFjqUA/exec";

function saveStory(data){
    return fetch(PATH, {
        method: "POST",
        mode: "no-cors", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)   
    });
}

const form = document.getElementById("story-form");

function handleSubmit(event){
    event.preventDefault(); 
    
    // 1. Find the submit button inside your form
    const submitButton = form.querySelector("button[type='submit']");
    
    // 2. Change the button to show it's loading and disable it
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    saveStory(data)
    .then(() => {
        alert("Story submitted successfully!");
        form.reset(); 
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
    })
    .finally(() => {
        // 3. Reset the button back to normal no matter what
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    });
}

form.addEventListener("submit", handleSubmit);
