


  // Handle form submission for registering lost cattle
  document.getElementById('register-lost-form').addEventListener('submit', function(event) {
    event.preventDefault();
   

    const formData = new FormData(event.target); 
    const data = Object.fromEntries(formData.entries());

    fetch('/api/register-death-api/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'X-CSRFToken': document.querySelector('input[name="csrfmiddlewaretoken"]').value 
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'Cattle registered as lost successfully') {
            console.log("Redirecting to /dashboard/death_list/");
            window.location.href = '/dashboard/death_list/';
        } else {
            console.error('Error:', data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});


