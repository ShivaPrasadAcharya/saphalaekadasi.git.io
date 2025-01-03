const utils = {
    formatDate: (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    },

    generateId: () => {
        return Math.max(...dictionaryData.map(item => item.id), 0) + 1;
    },

    sortTerms: (terms) => {
        return terms.sort((a, b) => a.localeCompare(b));
    },

    getCurrentDate: () => {
        return new Date().toISOString().split('T')[0];
    },

    generateDataJSCode: (entry) => {
        const template = `// Add this entry to data.js
const newEntry = {
    id: ${entry.id},
    sharedTerms: ${JSON.stringify(entry.sharedTerms)},
    content: ${JSON.stringify(entry.content)},
    dateCreated: '${entry.dateCreated}',
    dateModified: '${entry.dateModified}'
};

// Add to dictionaryData array
dictionaryData.push(newEntry);`;
        return template;
    },

    scrollToForm: () => {
        document.getElementById('formSection').scrollIntoView({ behavior: 'smooth' });
    }
};
