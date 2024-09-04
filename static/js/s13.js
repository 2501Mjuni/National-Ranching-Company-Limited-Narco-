// Fetch and display registered birth cattle
$.ajax({
    url: '/api/lost-list/',  // Correct API endpoint for registered birth cattle
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        // Initialize DataTable with fetched data
        $('#lost-table').DataTable({
            data: data, // Data source from API
            columns: [
                { data: null, render: (data, type, row, meta) => meta.row + 1 }, // S/N
                { data: 'tag_number' }, // Tag Number
                { data: 'lost_date' }, // Birth Date
                { data: 'ranch' }, // Ranch (assuming this is the name, not the ID)
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
                searchPlaceholder: "Search Birth Cattle",
            },
            destroy: true // Allows reinitialization of DataTable
        });

        // Event handlers for buttons in the table
        $('#birth-table').on('click', '.view-btn', function () {
            var id = $(this).data('id');
            // Handle the view action here
            alert('View action for ID: ' + id);
        });

        $('#birth-table').on('click', '.edit-btn', function () {
            var id = $(this).data('id');
            // Handle the edit action here
            alert('Edit action for ID: ' + id);
        });

        $('#birth-table').on('click', '.delete-btn', function () {
            var id = $(this).data('id');
            // Handle the delete action here
            if (confirm('Are you sure you want to delete this birth record?')) {
                alert('Delete action for ID: ' + id);
            }
        });
    },
    error: function (xhr, status, error) {
        console.error('Failed to fetch birth cattle data:', error);
        alert('Error fetching data from the server. Please try again later.');
    }
});



// this is for birth cattle to submit data
document.getElementById('addLostForm').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Adding new lost record');

    // Collect form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Send POST request to the API
    fetch('/api/register-lost/', { // Correct API endpoint for registering birth cattle
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': document.querySelector('input[name="csrfmiddlewaretoken"]').value // Ensure CSRF token is retrieved from the form
        },
        body: JSON.stringify(data) // Convert form data to JSON
    })
    .then(response => response.json().then(data => ({status: response.status, data: data}))) // Parse JSON response
    .then(({status, data}) => {
        console.log('Response status:', status);
        console.log('Response data:', data);
        if (status === 200 || status === 201) {
            window.location.reload(); // Refresh the page to update the list
        } else {
            alert('Failed to add new lost record: ' + (data.error || 'Unknown error')); // Notify error
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to add lost record due to an unexpected error.'); // Notify unexpected error
    });
});



