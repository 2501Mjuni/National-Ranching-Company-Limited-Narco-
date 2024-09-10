
document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript is running');

   
    // for adding ranch
document.getElementById('addRanchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('for adding new ranch');

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Fetch CSRF token directly from the form
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    fetch('/api/add-ranch/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken  // Use the variable directly here
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json().then(data => ({status: response.status, data: data})))
    .then(({status, data}) => {
        console.log('Response status:', status);
        console.log('Response data:', data);
        if (status === 200 || status === 201) {
            window.location.reload();
        } else {
            alert('Failed to add ranch: ' + (data.error || 'Unknown error'));
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to add ranch due to an unexpected error.');
    });

});


});


