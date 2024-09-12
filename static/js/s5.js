// // this is for the login, 

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log("is running");

    // Get form data
    const email = document.querySelector('input[name="email"]').value;  // Use 'email' to match your API
    const password = document.querySelector('input[name="password"]').value;

    // Prepare the data to be sent as JSON
    const data = {
        email: email,
        password: password
    };

    // Send POST request to JWT login endpoint
    fetch('/api/users/login_ad/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  // Sending JSON data
        },
        body: JSON.stringify(data)  // Convert JavaScript object to JSON
    })
    .then(response => response.json())
    .then(data => {
        if (data.access) {
            // JWT token received, store it (e.g., localStorage or sessionStorage)
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);

            // Redirect to dashboard on successful login
            window.location.href = "/dashboard/index/";
        } else {
            // Show error message
            showNotification('Invalid username or password.');
        }
    })
    .catch(error => {
        // Handle network or other unexpected errors
        console.error('There was a problem with the fetch operation:', error);
        showNotification('An error occurred. Please try again later.');
    });
});

// Function to show notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    const messageSpan = document.getElementById('notification-message');
    messageSpan.textContent = message;
    notification.classList.remove('d-none');  // Show the notification
    setTimeout(() => {
        notification.classList.add('d-none');  // Hide after 5 seconds
    }, 5000);
}
