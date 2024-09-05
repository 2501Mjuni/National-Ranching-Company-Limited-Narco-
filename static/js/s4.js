
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

