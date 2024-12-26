const card = {
    create: (entry) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `
            <div class="card-header">
                <div class="terms">${utils.sortTerms(entry.sharedTerms).join(', ')}</div>
                <div class="dates">
                    <small>Created: ${utils.formatDate(entry.dateCreated)}</small>
                    <br>
                    <small>Modified: ${utils.formatDate(entry.dateModified)}</small>
                </div>
            </div>
            <div class="card-content">
                ${entry.content}
            </div>
            <div class="card-footer">
                <div class="id">ID: ${entry.id}</div>
                <div class="card-actions">
                    <button onclick="card.edit(${entry.id})" class="edit-button">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                        Edit
                    </button>
                    <button onclick="card.print(${entry.id})" class="print-button">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 9V2h12v7"/>
                            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                            <path d="M6 14h12v8H6z"/>
                        </svg>
                        Print
                    </button>
                </div>
            </div>
        `;
        return cardElement;
    },

    edit: (id) => {
        const entry = dictionaryData.find(item => item.id === id);
        if (entry) {
            document.getElementById('terms').value = entry.sharedTerms.join(', ');
            document.getElementById('content').value = entry.content;
            document.getElementById('entryForm').dataset.editId = id;
            utils.scrollToForm();
        }
    },

    print: (id) => {
        const entry = dictionaryData.find(item => item.id === id);
        if (entry) {
            const printWindow = window.open('', '', 'width=800,height=600');
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Dictionary Entry: ${entry.id}</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            padding: 2rem;
                            max-width: 800px;
                            margin: 0 auto;
                        }
                        .terms { 
                            color: #4a90e2;
                            font-weight: bold;
                            margin-bottom: 1rem;
                        }
                        .content {
                            margin-bottom: 1rem;
                            line-height: 1.6;
                        }
                        .metadata {
                            color: #666;
                            font-size: 0.9rem;
                        }
                        @media print {
                            body { padding: 1rem; }
                        }
                    </style>
                </head>
                <body>
                    <div class="terms">${utils.sortTerms(entry.sharedTerms).join(', ')}</div>
                    <div class="content">${entry.content}</div>
                    <div class="metadata">
                        ID: ${entry.id}<br>
                        Created: ${utils.formatDate(entry.dateCreated)}<br>
                        Modified: ${utils.formatDate(entry.dateModified)}
                    </div>
                </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        }
    }