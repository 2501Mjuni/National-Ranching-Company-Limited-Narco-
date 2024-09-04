
// this is sold cattle
$.ajax({
    url: '/api/sale-list/',  // Correct API endpoint
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        // Initialize DataTable with fetched data
        $('#sale-table').DataTable({
            data: data, // Data source from API
            columns: [
                { data: null, render: (data, type, row, meta) => meta.row + 1 }, // S/N
                { data: 'tag_number' }, // Tag Number
                { data: 'ranch_id' }, // Ranch (displaying ranch_id for now; ideally map ID to ranch name)
                { data: 'sale_date' }, // Sale Date
                { data: 'price' }, // Price
                { data: 'market' }, // Market Name
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
                searchPlaceholder: "Search Sales",
            },
            destroy: true // Allows reinitialization of DataTable
        });

        // Event handlers for buttons in the table
        $('#sale-table').on('click', '.view-btn', function () {
            var id = $(this).data('id');
            // Handle the view action here
            alert('View action for ID: ' + id);
        });

        $('#sale-table').on('click', '.edit-btn', function () {
            var id = $(this).data('id');
            // Handle the edit action here
            alert('Edit action for ID: ' + id);
        });

        $('#sale-table').on('click', '.delete-btn', function () {
            var id = $(this).data('id');
            // Handle the delete action here
            if (confirm('Are you sure you want to delete this sale?')) {
                alert('Delete action for ID: ' + id);
            }
        });
    },
    error: function (xhr, status, error) {
        console.error('Failed to fetch sale data:', error);
        alert('Error fetching data from the server. Please try again later.');
    }
});


// Handle form submission for adding a new sold cattle
document.getElementById('addSaleForm').addEventListener('submit', function(event) {
event.preventDefault(); 
console.log('Adding new sold cattle');

const formData = new FormData(event.target);
const data = Object.fromEntries(formData.entries());

fetch('/api/register-sale/', {
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
        alert('Failed to add new sold cattle: ' + (data.error || 'Unknown error'));
    }
})
.catch(error => {
    console.error('Error:', error);
    alert('Failed to add sold cattle due to an unexpected error.');
});
});
