document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript is running');

    fetch('/api/ranches/')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const ranchSelect = document.getElementById('ranch_id');
        if (ranchSelect) {
            console.log('Ranch select:', ranchSelect);

            // Add options to the ranch select dropdown
            data.forEach(ranch => {
                const option = document.createElement('option');
                option.value = ranch.id; 
                option.textContent = ranch.name; 
                ranchSelect.appendChild(option); 
            });
        } else {
            console.error('Ranch select element not found');
        }
    })
    .catch(error => {
        console.error('Error fetching ranches:', error);
    });


// Fetch categories and populate the category select dropdown
fetch('/api/categories/')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const categorySelect = document.getElementById('category_id');
        if (categorySelect) {
            console.log('Category select:', categorySelect);

            // Add options to the category select dropdown
            data.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name; 
                categorySelect.appendChild(option); 
            });
        } else {
            console.error('Category select element not found');
        }
    })
    .catch(error => {
        console.error('Error fetching categories:', error);
    });

// Fetch subcategories based on the selected category
const categorySelect = document.getElementById('category_id');
if (categorySelect) {
    categorySelect.addEventListener('change', function() {
        const categoryId = this.value; 
        fetch(`/api/subcategories/?category_id=${categoryId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const subcategorySelect = document.getElementById('subcategory_id');
                if (subcategorySelect) {
                    console.log('Subcategory select:', subcategorySelect);

                    subcategorySelect.innerHTML = ''; 

                    // Add options to the subcategory select dropdown
                    data.forEach(subcategory => {
                        const option = document.createElement('option');
                        option.value = subcategory.id; 
                        option.textContent = subcategory.name; 
                        subcategorySelect.appendChild(option); 
                    });
                } else {
                    console.error('Subcategory select element not found');
                }
            })
            .catch(error => {
                console.error('Error fetching subcategories:', error);
            });
    });
} else {
    console.error('Category select element not found for event listener');
}

});
