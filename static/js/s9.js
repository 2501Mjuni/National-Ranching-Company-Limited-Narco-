
// Fetch and display registered complementary cattle
$.ajax({
    url: '/api/complementary-list/',  // Correct API endpoint for complementary data
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        console.log('Complementary Data:', data);  // Log the data
        
        if (!Array.isArray(data)) {
            console.error('Data received is not an array:', data);
            return;
        }

        // Initialize DataTable with fetched data
        $('#complementary-table').DataTable({
            data: data,
            columns: [
                { data: null, render: (data, type, row, meta) => meta.row + 1, title: 'S/N' }, // S/N
                { data: 'tag_number', title: 'Tag Number' },
                { data: 'ranch', title: 'Ranch' }, // Assuming this is the name, not the ID
                { data: 'complementary_date', title: 'Complementary Date' },
                { data: 'reason', title: 'Reason' },
                {
                    data: null,
                    title: 'View',
                    render: function (data, type, row) {
                        return `<button class="btn btn-info btn-sm view-btn" data-tag-number="${row.tag_number}"><i class="bi bi-eye"></i> View</button>`;
                    }
                },
                {
                    data: null,
                    title: 'Actions',
                    render: function (data, type, row) {
                        return `
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Actions
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item edit-btn" href="#" data-id="${row.id}">Edit</a></li>
                                <li><a class="dropdown-item delete-btn" href="#" data-id="${row.id}">Delete</a></li>
                            </ul>
                        </div>`;
                    }
                }
            ],
            dom: '<"row"<"col-sm-6"l><"col-sm-6"f>>' +
                 '<"row"<"col-sm-12"tr>>' +
                 '<"row"<"col-sm-5"i><"col-sm-7"p>>',
            paging: true,
            pageLength: 20,
            lengthMenu: [5, 10, 15],
            searching: true,
            ordering: true,
            language: {
                search: "",
                searchPlaceholder: "Search Complementaries",
            },
            destroy: true // Allows reinitialization of DataTable
        });

        // Event handler for View button
        $('#complementary-table').on('click', '.view-btn', function () {
            var tagNumber = $(this).data('tag-number');  // Get tag number from data attribute
            
            if (!tagNumber) {
                console.error('Tag number is missing or undefined.');
                return;
            }
            
            // Fetch the cattle details from the API
            $.ajax({
                url: `/api/details-list/${tagNumber}/`,  // API endpoint for detailed view
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    console.log('API Response:', data);  // Log the entire response
                    
                    if (Array.isArray(data) && data.length > 0) {
                        var cattle = data[0];  // Get the first item in the array
                        console.log('Cattle Data:', cattle);  // Log the cattle data
                        
                        // Populate modal with data
                        $('#modal-tag-number').text(cattle.tag_number);
                        $('#modal-category').text(cattle.category_name);
                        $('#modal-subcategory').text(cattle.subcategory_name);
                        $('#modal-ranch').text(cattle.ranch_name);
                        $('#modal-status').text(cattle.status);
                        
                        // Show the modal
                        $('#cattleModal').modal('show');
                    } else {
                        console.error('No data received for tag number:', tagNumber);
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Failed to fetch cattle details:', error);
                }
            });
        });
    },
    error: function (xhr, status, error) {
        console.error('Failed to fetch complementary data:', error);
        alert('Error fetching data from the server. Please try again later.');
    }
});

// Handle form submission for adding a new complementary cattle record
document.getElementById('addComplementaryForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    console.log('Adding new complementary record');

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    fetch('/api/register-complementary/', { // Correct API endpoint for registering complementary cattle
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': document.querySelector('input[name="csrfmiddlewaretoken"]').value // Ensure CSRF token is retrieved from the form
        },
        body: JSON.stringify(data)
    })
    .then(response => 
        response.json().then(data => ({status: response.status, data: data}))
    )
    .then(({status, data}) => {
        console.log('Response status:', status);
        console.log('Response data:', data);
        if (status === 200) {
            window.location.reload(); // Refresh the page to update the list
        } else {
            alert('Failed to add new complementary record: ' + (data.error || 'Unknown error'));
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to add complementary record due to an unexpected error.');
    });
});