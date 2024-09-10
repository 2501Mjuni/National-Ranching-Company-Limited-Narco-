
// Fetch and display registered transferred cattle
$.ajax({
    url: '/api/transferred-list/',  // Correct API endpoint for transferred cattle
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        // Initialize DataTable with fetched data
        $('#transfer-table').DataTable({
            data: data, // Data source from API
            columns: [
                { data: null, render: (data, type, row, meta) => meta.row + 1, title: 'S/N' }, // S/N
                { data: 'tag_number', title: 'Tag Number' }, // Tag Number
                { data: 'current_ranch', title: 'Current Ranch' }, // Current Ranch
                { data: 'new_ranch', title: 'New Ranch' }, // New Ranch
                { data: 'transfer_date', title: 'Transfer Date' }, // Transfer Date
                { data: 'reason', title: 'Reason' }, // Reason
                {
                    data: null,
                    title: 'View',
                    render: function (data, type, row) {
                        return `<button class="btn btn-info btn-sm view-btn" data-tag-number="${row.tag_number}"><i class="bi bi-eye"></i> View</button>`;
                    }
                }, // View Button
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
                                <li><a class="dropdown-item edit-btn" href="#" data-tag-number="${row.tag_number}">Edit</a></li>
                                <li><a class="dropdown-item delete-btn" href="#" data-tag-number="${row.tag_number}">Delete</a></li>
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
                searchPlaceholder: "Search Transferred Cattle",
            },
            destroy: true // Allows reinitialization of DataTable
        });

        // Event handler for View button
        $('#transfer-table').on('click', '.view-btn', function () {
            var tagNumber = $(this).data('tag-number'); // Get tag number from data attribute
            
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
        console.error('Failed to fetch transferred cattle data:', error);
        alert('Error fetching data from the server. Please try again later.');
    }
});


// handling form submision
document.getElementById('addTransferForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    console.log("Form submission intercepted"); // Debugging line

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Handle conditional logic based on 'transfer_to' value
    if (data.transfer_to === 'ranch') {
        data.project_location = null;  // Ensure project_location is not sent
    } else if (data.transfer_to === 'project') {
        data.new_ranch_id = null;  // Ensure new_ranch_id is not sent
    } else {
        data.new_ranch_id = null;
        data.project_location = null;
    }

    console.log("Data to be sent:", data); // Debugging line

    // Fetch CSRF token directly from the form
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    fetch('/api/register-transfer/', {
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
        if (status === 200 || status === 201){ // Changed to 201 for successful creation
            window.location.reload();
        } else {
            console.error('Failed to register transfer:', data);
            alert('Failed to register transfer: ' + (data.error || 'Unknown error'));
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred: ' + error.message);
    });
});



const transferToSelect = document.getElementById('transfer_to');
const ranchSelection = document.getElementById('ranchSelection');
const projectDetails = document.getElementById('projectDetails');

transferToSelect.addEventListener('change', function() {
    if (this.value === 'ranch') {
        ranchSelection.style.display = 'block';
        projectDetails.style.display = 'none';
    } else if (this.value === 'project') {
        ranchSelection.style.display = 'none';
        projectDetails.style.display = 'block';
    } else {
        ranchSelection.style.display = 'none';
        projectDetails.style.display = 'none';
    }
});
