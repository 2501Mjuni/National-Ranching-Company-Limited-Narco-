

document.getElementById('addCattleBtn').addEventListener('click', function() {
    console.log('is load' )
    window.location.href = '/dashboard/register';
  });


// handling submision of slaugheted cattle
document.getElementById('register-complementary-form').addEventListener('submit', function(event) {
  event.preventDefault(); 

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  fetch('/api/register-complementary/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': '{{ csrf_token }}'
      },
      body: JSON.stringify(data),
  })
  .then(response => response.json().then(data => ({status: response.status, data: data})))
  .then(({status, data}) => {
      console.log('Response status:', status);
      console.log('Response data:', data);
      if (status === 200) {
          window.location.href = '/dashboard/slaughter_list/'; 
      } else {
          console.log('Failed to register slaughter.');
      }
  })
  .catch(error => {
      console.error('Error:', error);
      console.log('Failed to register slaughter due to an unexpected error.');
  });
});


// handling submision of bought cattle
document.getElementById('register-bought-cattle-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
  
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
  
    fetch('/api/register-bought/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': '{{ csrf_token }}'
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json().then(data => ({status: response.status, data: data})))
    .then(({status, data}) => {
        console.log('Response status:', status);
        console.log('Response data:', data);
        if (status === 200) {
            window.location.href = '/dashboard/slaughter_list/'; 
        } else {
            console.log('Failed to register slaughter.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        console.log('Failed to register slaughter due to an unexpected error.');
    });
  });
  

  // handling submision of new birth cattle
document.getElementById('register-birth-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
  
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
  
    fetch('/api/register-new-birth/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': '{{ csrf_token }}'
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json().then(data => ({status: response.status, data: data})))
    .then(({status, data}) => {
        console.log('Response status:', status);
        console.log('Response data:', data);
        if (status === 200) {
            window.location.href = '/dashboard/slaughter_list/'; 
        } else {
            console.log('Failed to register slaughter.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        console.log('Failed to register slaughter due to an unexpected error.');
    });
  });
  