// Fetch and display registered cattle
$.ajax({
    url: '/api/cattle-list/',  // Correct API endpoint for cattle list
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        // Initialize DataTable with fetched data
        $('#cattle-table').DataTable({
            data: data, // Data source from API
            columns: [
                { data: null, render: (data, type, row, meta) => meta.row + 1 }, // S/N
                { data: 'tag_number' }, // Tag Number
                { data: 'ranch' }, // Ranch
                { data: 'status' }, // Status
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
                searchPlaceholder: "Search Cattle",
            },
            destroy: true // Allows reinitialization of DataTable
        });

        // Event handlers for buttons in the table
        $('#cattle-table').on('click', '.view-btn', function () {
            var id = $(this).data('id');
            // Handle the view action here
            alert('View action for ID: ' + id);
        });

        $('#cattle-table').on('click', '.edit-btn', function () {
            var id = $(this).data('id');
            // Handle the edit action here
            alert('Edit action for ID: ' + id);
        });

        $('#cattle-table').on('click', '.delete-btn', function () {
            var id = $(this).data('id');
            // Handle the delete action here
            if (confirm('Are you sure you want to delete this cattle record?')) {
                alert('Delete action for ID: ' + id);
            }
        });
    },
    error: function (xhr, status, error) {
        console.error('Failed to fetch cattle data:', error);
        alert('Error fetching data from the server. Please try again later.');
    }
});

// Form submission for adding a new cattle
document.getElementById('addCattleForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    console.log("Form submission intercepted"); // Debugging line

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    console.log("Data to be sent:", data); // Debugging line

    // Fetch CSRF token directly from the form
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    fetch('/api/register-cattle/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken, // Use the fetched CSRF token
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json().then(data => ({status: response.status, data: data})))
    .then(({status, data}) => {
        console.log("Response data:", data); // Debugging line
        if (status === 200 || status === 201) {
            window.location.reload();
        } else {
            console.error('Failed to register cattle:', data);
            alert('Failed to register cattle: ' + (data.error || 'Unknown error'));
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred: ' + error.message);
    });
});
