
  // Fetch ranch data from the API
$.ajax({
  url: '/api/ranches/',  // Replace with your actual API endpoint
  method: 'GET',
  dataType: 'json',
  success: function (data) {
      // Initialize DataTable with fetched data
      $('#ranch-table').DataTable({
          data: data, // Data source from API
          columns: [
              { data: null, render: (data, type, row, meta) => meta.row + 1 }, // R. No
              { data: 'name' }, // Ranch Name
              {
                  data: null,
                  render: function (data, type, row) {
                      return `<button class="btn btn-info btn-sm"><i class="bi bi-eye"></i> View</button>`;
                  },
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
                              <li><a class="dropdown-item" href="#">Edit</a></li>
                              <li><a class="dropdown-item" href="#">Delete</a></li>
                          </ul>
                      </div>`;
                  },
              }, // Actions Dropdown
          ],
          dom: '<"row"<"col-sm-6"l><"col-sm-6"f>>' + // Custom length and search input placement
               '<"row"<"col-sm-12"tr>>' +
               '<"row"<"col-sm-5"i><"col-sm-7"p>>',
          paging: true, // Enable pagination
          pageLength: 20, // Default entries per page
          lengthMenu: [5, 10, 15], // Entries per page options
          searching: true, // Enable search functionality
          ordering: false, // Disable column ordering
          language: {
              search: "",
              searchPlaceholder: "Search Ranches",
          },
      });
  },
  error: function (xhr, status, error) {
      console.error('Failed to fetch ranch data:', error);
  }
});

// for the registering of transfer
document.getElementById('register-transfer-form').addEventListener('submit', function(event) {
          event.preventDefault(); // Prevent the form from submitting the traditional way
          console.log("The script is..")
          console.log("Form submission intercepted"); // Debugging line
      
          const formData = new FormData(event.target);
          const data = Object.fromEntries(formData.entries());
      
          // Debugging lines to see the form data
          console.log("Form Data:", data);
      
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
      
          fetch('/api/register-transfer/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'X-CSRFToken': getCSRFToken(),
              },
              body: JSON.stringify(data),
          })
          .then(response => {
              console.log("Response status:", response.status); // Debugging line
              return response.json().then(data => ({status: response.status, data: data}));
          })
          .then(({status, data}) => {
              console.log("Response data:", data); // Debugging line
              if (status === 200) {
                  window.location.href = '/dashboard/transfer_list/';
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
      