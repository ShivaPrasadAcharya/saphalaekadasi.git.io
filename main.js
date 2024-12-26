document.addEventListener('DOMContentLoaded', () => {
    // Initialize search functionality
    search.init();
    
    // Initialize form handling
    form.init();
    
    // Load initial dictionary content
    search.performSearch('');
});