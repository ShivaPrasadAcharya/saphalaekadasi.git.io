const search = {
    init: () => {
        const searchInput = document.getElementById('searchInput');
        const searchButton = document.getElementById('searchButton');

        searchInput.addEventListener('input', () => search.performSearch(searchInput.value));
        searchButton.addEventListener('click', () => search.performSearch(searchInput.value));
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                search.performSearch(searchInput.value);
            }
        });
    },

    performSearch: (query) => {
        const normalizedQuery = query.toLowerCase().trim();
        const dictionaryContent = document.getElementById('dictionaryContent');
        dictionaryContent.innerHTML = '';

        if (!normalizedQuery) {
            // If no search query, show all entries in alphabetical order
            const sortedData = [...dictionaryData].sort((a, b) => {
                const termsA = utils.sortTerms(a.sharedTerms)[0];
                const termsB = utils.sortTerms(b.sharedTerms)[0];
                return termsA.localeCompare(termsB);
            });
            sortedData.forEach(entry => {
                dictionaryContent.appendChild(card.create(entry));
            });
            return;
        }

        // Filter entries based on search query
        const filteredData = dictionaryData.filter(entry => {
            return entry.sharedTerms.some(term => term.toLowerCase().includes(normalizedQuery)) ||
                   entry.content.toLowerCase().includes(normalizedQuery);
        });

        // Sort and display filtered entries
        const sortedData = [...filteredData].sort((a, b) => {
            const termsA = utils.sortTerms(a.sharedTerms)[0];
            const termsB = utils.sortTerms(b.sharedTerms)[0];
            return termsA.localeCompare(termsB);
        });

        sortedData.forEach(entry => {
            dictionaryContent.appendChild(card.create(entry));
        });
    }
};