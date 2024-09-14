
document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript is running');

    // JavaScript to display the current date in the desired format
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const loginDate = new Date().toLocaleDateString('en-GB', options);
  document.getElementById('loginDate').innerText = `Logged in on: ${loginDate}`;


  
// for adding ranch
document.getElementById('addRanchForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Fetch CSRF token directly from the form
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    fetch('/api/add-ranch/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json().then(data => ({status: response.status, data: data})))
    .then(({status, data}) => {
        if (status === 200 || status === 201) {
            // Hide any previous error message
            document.getElementById('ranchError').classList.add('d-none');

            // Show success toast notification
            const successToast = new bootstrap.Toast(document.getElementById('successToast'));
            successToast.show();

            // Optional: Reload the page after a delay to allow the user to see the notification
            setTimeout(() => {
                window.location.reload();
            }, 2000); // 2 seconds delay before reloading
        } else {
            // Show error inline notification
            const errorElement = document.getElementById('ranchError');
            errorElement.textContent = 'Failed to add ranch: ' + (data.error || 'Unknown error');
            errorElement.classList.remove('d-none');
        }
    })
    .catch(error => {
        // Show error inline notification for unexpected errors
        const errorElement = document.getElementById('ranchError');
        errorElement.textContent = 'Failed to add ranch due to an unexpected error.';
        errorElement.classList.remove('d-none');
    });
});


});


