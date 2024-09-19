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
                        return `<a href="/ranches/${row.name}/" class="btn btn-info btn-sm"><i class="bi bi-eye"></i> View</a>`;
                    },
                }, // View Button redirects to ranch detail page
                {
                    data: null,
                    render: function (data, type, row) {
                        return `
                        <div class="btn-group">
                            <button type="button"
                             class="btn btn-sm btn-secondary dropdown-toggle"
                              data-bs-toggle="dropdown" aria-expanded="false">
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
            paging: true,
            pageLength: 20,
            lengthMenu: [5, 10, 15],
            searching: true,
            ordering: false,
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
  