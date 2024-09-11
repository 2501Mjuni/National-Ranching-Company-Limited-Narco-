// this is for the registration
document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch('/api/users/admin/register/', {
        method: 'POST',
        body: formData,
    }).then(response => response.json())
      .then(data => {
        if (data.redirect) {
            window.location.href = data.redirect;
        } else {
            console.log(data);
        }
    });
});


// this is for the login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch('/api/users/login/', {
        method: 'POST',
        body: formData,
    }).then(response => response.json())
      .then(data => {
        if (data.redirect) {
            window.location.href = data.redirect;
        } else {
            console.log(data);
        }
    });
});
