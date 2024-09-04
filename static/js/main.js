
document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript is running');

    function getCSRFToken() {
        return document.querySelector('input[name="csrfmiddlewaretoken"]').value;
    }

  
    document.getElementById('register-cattle-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        fetch('/api/register-cattle/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken()
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json().then(data => ({status: response.status, data: data})))
        .then(({status, data}) => {
            console.log('Response status:', status);
            console.log('Response data:', data);
            if (status === 201) {
                window.location.href = '/dashboard/cattle_list/';
            } else {
                console.log('Failed to register cattle.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            console.log('Failed to register cattle due to an unexpected error.');
        });
    });


    // for adding ranch
    document.getElementById('addRanchForm').addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('for adding new ranch');

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        fetch('/api/add-ranch/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken()
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json().then(data => ({status: response.status, data: data})))
        .then(({status, data}) => {
            console.log('Response status:', status);
            console.log('Response data:', data);
            if (status === 201) {
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
