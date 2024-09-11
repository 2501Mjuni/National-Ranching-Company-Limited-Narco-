
document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript is running');

   
    // for adding ranch
// document.getElementById('addRanchForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     console.log('for adding new ranch');

//     const formData = new FormData(event.target);
//     const data = Object.fromEntries(formData.entries());

//     // Fetch CSRF token directly from the form
//     const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

//     fetch('/api/add-ranch/', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'X-CSRFToken': csrfToken  // Use the variable directly here
//         },
//         body: JSON.stringify(data),
//     })
//     .then(response => response.json().then(data => ({status: response.status, data: data})))
//     .then(({status, data}) => {
//         console.log('Response status:', status);
//         console.log('Response data:', data);
//         if (status === 200 || status === 201) {
//             window.location.reload();
//         } else {
//             alert('Failed to add ranch: ' + (data.error || 'Unknown error'));
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         alert('Failed to add ranch due to an unexpected error.');
//     });

// });


// // for adding ranch
// document.getElementById('addRanchForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     console.log('for adding new ranch');

//     const formData = new FormData(event.target);
//     const data = Object.fromEntries(formData.entries());

//     // Fetch CSRF token directly from the form
//     const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;


//     fetch('/api/add-ranch/', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'X-CSRFToken': csrfToken  // Use the variable directly here
//         },
//         body: JSON.stringify(data),
//     })
//     .then(response => response.json().then(data => ({status: response.status, data: data})))
//     .then(({status, data}) => {
//         console.log('Response status:', status);
//         console.log('Response data:', data);
//         if (status === 200 || status === 201) {
//             // Show success toastr notification
//             toastr.success('Ranch added successfully!');

//             // Optional: Reload the page after a delay to allow the user to see the notification
//             setTimeout(() => {
//                 window.location.reload();
//             }, 2000); // 2 seconds delay before reloading
//         } else {
//             // Show error toastr notification
//             toastr.error('Failed to add ranch: ' + (data.error || 'Unknown error'));
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         toastr.error('Failed to add ranch due to an unexpected error.');
//     });
// });



// document.getElementById('addRanchForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     console.log('for adding new ranch');

//     const formData = new FormData(event.target);
//     const data = Object.fromEntries(formData.entries());

//     // Fetch CSRF token directly from the form
//     const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

//     fetch('/api/add-ranch/', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'X-CSRFToken': csrfToken
//         },
//         body: JSON.stringify(data),
//     })
//     .then(response => response.json().then(data => ({status: response.status, data: data})))
//     .then(({status, data}) => {
//         console.log('Response status:', status);
//         console.log('Response data:', data);
//         if (status === 200 || status === 201) {
//             toastr.success('Ranch added successfully!');
//             setTimeout(() => {
//                 window.location.reload();
//             }, 2000);
//         } else if (data.error && data.error.includes('already exists')) {
//             toastr.error('Failed to add ranch, because the ranch already exists.');
//         } else {
//             toastr.error('Failed to add ranch: ' + (data.error || 'Unknown error'));
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         toastr.error('Failed to add ranch due to an unexpected error.');
//     });
// });





// for submision of ranch
// function showInlineNotification(message, type) {
//     const notificationArea = document.getElementById('notificationArea');
//     notificationArea.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
// }

// document.getElementById('addRanchForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     const formData = new FormData(event.target);
//     const data = Object.fromEntries(formData.entries());

//     const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

//     fetch('/api/add-ranch/', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'X-CSRFToken': csrfToken
//         },
//         body: JSON.stringify(data),
//     })
//     .then(response => response.json().then(data => ({status: response.status, data: data})))
//     .then(({status, data}) => {
//         if (status === 200 || status === 201) {
//             showInlineNotification('Ranch added successfully!', 'success');
//             setTimeout(() => {
//                 window.location.reload();
//             }, 2000); // Optional: Delay before reloading the page
//         } else if (data.error && data.error.includes('already exists')) {
//             showInlineNotification(' The ranch already exists.', 'danger');
//         } else {
//             showInlineNotification('Failed to add ranch: ' + (data.error || 'Unknown error'), 'danger');
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         showInlineNotification('Failed to add ranch due to an unexpected error.', 'danger');
//     });
// });





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


