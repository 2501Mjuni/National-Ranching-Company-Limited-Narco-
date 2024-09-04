
// This is for complementary cattle
// Fetch and display registered complementary cattle
$.ajax({
    url: '/api/complementary-list/',  // Correct API endpoint for registered complementary cattle
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        // Initialize DataTable with fetched data
        $('#complementary-table').DataTable({
            data: data, // Data source from API
            columns: [
                { data: null, render: (data, type, row, meta) => meta.row + 1 }, // S/N
                { data: 'tag_number' }, // Tag Number
                { data: 'ranch' }, // Ranch (assuming this is the name, not the ID)
                { data: 'complementary_date' }, // Complementary Date
                { data: 'reason' }, // Reason
                {
                    data: null,
                    render: function (data, type, row) {
                        return `<button class="btn btn-info btn-sm view-btn" data-id="${row.id}"><i class="bi bi-eye"></i> View</button>`;
                    }
                }, // View Button
                {
                    data: null,
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
                } // Actions Dropdown
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

        // // Event handlers for buttons in the table
        // $('#complementary-table').on('click', '.view-btn', function () {
        //     var id = $(this).data('id');
        //     // Handle the view action here
        //     alert('View action for ID: ' + id);
        // });

        // $('#complementary-table').on('click', '.edit-btn', function () {
        //     var id = $(this).data('id');
        //     // Handle the edit action here
        //     alert('Edit action for ID: ' + id);
        // });

        // $('#complementary-table').on('click', '.delete-btn', function () {
        //     var id = $(this).data('id');
        //     // Handle the delete action here
        //     if (confirm('Are you sure you want to delete this complementary record?')) {
        //         alert('Delete action for ID: ' + id);
        //     }
        // });
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


