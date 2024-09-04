// Fetch and populate both current and new ranch dropdowns
fetch('/api/ranches/')
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    const newRanchSelect = document.getElementById('new_ranch_id');

    if (newRanchSelect) {
        // Clear existing options
        newRanchSelect.innerHTML = '<option value="">None</option>';

        // Add options to the new ranch select dropdown
        data.forEach(ranch => {
            const option = document.createElement('option');
            option.value = ranch.id;
            option.textContent = ranch.name;
            newRanchSelect.appendChild(option);
        });
    } else {
        console.error('New ranch select element not found');
    }
})
.catch(error => {
    console.error('Error fetching ranches:', error);
});
// for the current ranch
fetch('/api/ranches/')
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    const currentRanchSelect = document.getElementById('current_ranch_id');

    if (currentRanchSelect) {
        // Clear existing options
        currentRanchSelect.innerHTML = '';

        // Add options to the current ranch select dropdown
        data.forEach(ranch => {
            const option = document.createElement('option');
            option.value = ranch.id;
            option.textContent = ranch.name;
            currentRanchSelect.appendChild(option);
        });
    } else {
        console.error('Current ranch select element not found');
    }
})
.catch(error => {
    console.error('Error fetching ranches:', error);
});

// for cattle count
fetch('/api/cattle-count/')
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    const countElement = document.querySelector('.small-box .inner h3');

    if (countElement) {
        countElement.textContent = data.count;
    } else {
        console.error('Element to update not found');
    }
})
.catch(error => {
    console.error('Error fetching cattle count:', error);
});


