

// Fetch recovery data from the API for the recovery cattle
$.ajax({
    url: '/api/recovery-list/',  // Replace with your actual API endpoint
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        // Initialize DataTable with fetched data
        $('#recovery-table').DataTable({
            data: data, // Data source from API
            columns: [
                { data: null, render: (data, type, row, meta) => meta.row + 1 }, // S/N
                { data: 'tag_number' }, // Tag Number
                { data: 'ranch' }, // Ranch
                { data: 'recovery_date' }, // Recover Date
                { data: 'notes' }, // Notes
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
            dom: '<"row"<"col-sm-6"l><"col-sm-6"f>>' + // Custom length and search input placement
                 '<"row"<"col-sm-12"tr>>' +
                 '<"row"<"col-sm-5"i><"col-sm-7"p>>',
            paging: true, // Enable pagination
            pageLength: 20, // Default entries per page
            lengthMenu: [5, 10, 15], // Entries per page options
            searching: true, // Enable search functionality
            ordering: true, // Disable column ordering
            language: {
                search: "",
                searchPlaceholder: "Search Recoveries",
            },
            destroy: true // Allows reinitialization of DataTable
        });

        // Event handlers for View, Edit, and Delete buttons
        $('#recovery-table').on('click', '.view-btn', function () {
            var id = $(this).data('id');
            // Handle the view action here
            alert('View action for ID: ' + id);
        });

        $('#recovery-table').on('click', '.edit-btn', function () {
            var id = $(this).data('id');
            // Handle the edit action here
            alert('Edit action for ID: ' + id);
        });

        $('#recovery-table').on('click', '.delete-btn', function () {
            var id = $(this).data('id');
            // Handle the delete action here
            if (confirm('Are you sure you want to delete this recovery?')) {
                alert('Delete action for ID: ' + id);
            }
        });
    },
    error: function (xhr, status, error) {
        console.error('Failed to fetch recovery data:', error);
    }
});



// Handle form submission of new recovery cattle
document.getElementById('addRecoveryForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    console.log('for adding new recovery cattle');
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    fetch('/api/register-recovery/', {
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
            alert('Failed to add new recovery cattle: ' + (data.error || 'Unknown error'));
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to add recovery cattle due to an unexpected error.');
    });
});

