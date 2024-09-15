
// this is for automatically log out after 10 inactivity
let inactivityTimer;
const inactivityLimit = 15 * 60 * 1000; // 10 minutes in milliseconds

function resetTimer() {
    console.log('Activity detected, resetting timer...');
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(logout, inactivityLimit);
}

function logout() {
    console.log('Inactivity limit reached, logging out...');
    // Perform logout and redirect to login page
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = "/Site/login/";
}


// Reset timer on user activity
window.onload = resetTimer;
document.onmousemove = resetTimer;
document.onkeydown = resetTimer; // Replaced onkeypress with onkeydown
document.ontouchstart = resetTimer; // For mobile devices
document.onclick = resetTimer; // Additional event for clicks



// JavaScript for logout
document.getElementById('logout-link').addEventListener('click', function(event) {
    event.preventDefault();  // Prevent default link behavior

    // Retrieve the access and refresh tokens from localStorage
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (!refreshToken) {
        console.error('No refresh token found.');
        return;
    }

    // Send POST request to the logout endpoint
    fetch('/api/users/logout_ad/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`  // Send access token in Authorization header
        },
        body: JSON.stringify({ refresh_token: refreshToken })
    })
    .then(response => {
        if (response.ok) {
            // Clear tokens from localStorage
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');

            // Redirect to login page
            window.location.href = "/Site/login/";
        } else {
            // Handle error response
            console.error('Logout failed:', response.statusText);
        }
    })
    .catch(error => {
        // Handle network or other unexpected errors
        console.error('There was a problem with the fetch operation:', error);
    });
});
