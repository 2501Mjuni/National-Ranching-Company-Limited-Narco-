
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
//             toastr.success('Ranch added successfully!', 'Success');
//             // Optionally close the modal after success
//             const modal = bootstrap.Modal.getInstance(document.getElementById('addRanchModal'));
//             modal.hide();
//             // Refresh the data or reload the page if needed
//             // window.location.reload();
//         } else {
//             toastr.error('Failed to add ranch: ' + (data.error || 'Unknown error'), 'Error');
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         toastr.error('Failed to add ranch due to an unexpected error.', 'Error');
//     });
// });




//  // Show toast function
//  function showToast(title, message, type = 'success') {
//     const toastContainer = document.querySelector('.toast-container');
//     const toastElement = document.createElement('div');
    
//     toastElement.className = `toast align-items-center text-bg-${type} border-0`;
//     toastElement.role = 'alert';
//     toastElement.ariaLive = 'assertive';
//     toastElement.ariaAtomic = 'true';
    
//     toastElement.innerHTML = `
//       <div class="d-flex">
//         <div class="toast-body">
//           <strong class="me-auto">${title}</strong>
//           ${message}
//         </div>
//         <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
//       </div>
//     `;
    
//     toastContainer.appendChild(toastElement);
    
//     const toast = new bootstrap.Toast(toastElement);
//     toast.show();
//   }

//   // Example form submission
//   document.getElementById('addRanchForm').addEventListener('submit', function(event) {
//     event.preventDefault();
    
//     const formData = new FormData(event.target);
//     const data = Object.fromEntries(formData.entries());

//     const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

//     fetch('/api/add-ranch/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-CSRFToken': csrfToken
//       },
//       body: JSON.stringify(data),
//     })
//     .then(response => response.json().then(data => ({status: response.status, data: data})))
//     .then(({status, data}) => {
//       if (status === 200 || status === 201) {
//         showToast('Success', 'Ranch added successfully!');
//         const modal = bootstrap.Modal.getInstance(document.getElementById('addRanchModal'));
//         modal.hide();
//       } else {
//         showToast('Error', 'Failed to add ranch: ' + (data.error || 'Unknown error'), 'danger');
//       }
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       showToast('Error', 'Failed to add ranch due to an unexpected error.', 'danger');
//     });
//   });






//  // Show toast function
//  function showToast(title, message, type = 'success') {
//     const toastContainer = document.querySelector('.toast-container');
//     const toastElement = document.createElement('div');
    
//     toastElement.className = `toast align-items-center text-bg-${type} border-0`;
//     toastElement.role = 'alert';
//     toastElement.ariaLive = 'assertive';
//     toastElement.ariaAtomic = 'true';
    
//     toastElement.innerHTML = `
//       <div class="d-flex">
//         <div class="toast-body">
//           <strong class="me-auto">${title}</strong>
//           ${message}
//         </div>
//       </div>
//     `;
    
//     toastContainer.appendChild(toastElement);
    
//     const toast = new bootstrap.Toast(toastElement, {
//       delay: 5000 // Auto-dismiss after 5 seconds
//     });
//     toast.show();
//   }

//   // Example form submission
//   document.getElementById('addRanchForm').addEventListener('submit', function(event) {
//     event.preventDefault();
    
//     const formData = new FormData(event.target);
//     const data = Object.fromEntries(formData.entries());

//     const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

//     fetch('/api/add-ranch/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-CSRFToken': csrfToken
//       },
//       body: JSON.stringify(data),
//     })
//     .then(response => response.json().then(data => ({status: response.status, data: data})))
//     .then(({status, data}) => {
//       if (status === 200 || status === 201) {
//         showToast('Success', 'Ranch added successfully!');
//         const modal = bootstrap.Modal.getInstance(document.getElementById('addRanchModal'));
//         modal.hide();
//       } else {
//         showToast('Error', 'Failed to add ranch: ' + (data.error || 'Unknown error'), 'danger');
//       }
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       showToast('Error', 'Failed to add ranch due to an unexpected error.', 'danger');
//     });
//   });





});


