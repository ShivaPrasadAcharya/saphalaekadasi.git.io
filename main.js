document.addEventListener('DOMContentLoaded', () => {
    // Initialize search functionality
    search.init();
    
    // Initialize form handling
    form.init();
    
    // Load initial dictionary content
    search.performSearch('');

    // Set up add button handler
    document.querySelector('.add-button').addEventListener('click', (e) => {
        e.preventDefault();
        // Clear form
        document.getElementById('entryForm').reset();
        delete document.getElementById('entryForm').dataset.editId;
        document.getElementById('generatedCode').textContent = '';
        // Show form
        form.show();
    });
});
