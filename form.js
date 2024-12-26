const form = {
    show: () => {
        document.getElementById('formSection').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
        document.body.style.overflow = 'hidden';
    },

    hide: () => {
        document.getElementById('formSection').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
        document.body.style.overflow = 'auto';
    },

    init: () => {
        // Add click handler for overlay
        document.getElementById('overlay').addEventListener('click', form.hide);
        const entryForm = document.getElementById('entryForm');
        const previewBtn = document.getElementById('previewBtn');
        const cancelBtn = document.getElementById('cancelBtn');
        const copyCodeBtn = document.getElementById('copyCode');

        entryForm.addEventListener('submit', form.handleSubmit);
        previewBtn.addEventListener('click', form.handlePreview);
        cancelBtn.addEventListener('click', form.handleCancel);
        copyCodeBtn.addEventListener('click', form.handleCopyCode);
    },

    handleSubmit: (e) => {
        e.preventDefault();
        const termsInput = document.getElementById('terms');
        const contentInput = document.getElementById('content');
        const editId = e.target.dataset.editId;

        const terms = termsInput.value.split(',').map(term => term.trim()).filter(term => term);
        const content = contentInput.value.trim();

        if (!terms.length || !content) {
            alert('Please fill in all fields');
            return;
        }

        const currentDate = utils.getCurrentDate();
        
        if (editId) {
            // Update existing entry
            const index = dictionaryData.findIndex(item => item.id === parseInt(editId));
            if (index !== -1) {
                dictionaryData[index] = {
                    ...dictionaryData[index],
                    sharedTerms: terms,
                    content: content,
                    dateModified: currentDate
                };
            }
        } else {
            // Create new entry
            const newEntry = {
                id: utils.generateId(),
                sharedTerms: terms,
                content: content,
                dateCreated: currentDate,
                dateModified: currentDate
            };
            dictionaryData.push(newEntry);
            
            // Generate and display code
            const generatedCode = utils.generateDataJSCode(newEntry);
            document.getElementById('generatedCode').textContent = generatedCode;
        }

        // Reset form and refresh display
        form.handleCancel();
        search.performSearch('');
    },

    handlePreview: () => {
        const terms = document.getElementById('terms').value.split(',').map(term => term.trim()).filter(term => term);
        const content = document.getElementById('content').value.trim();
        const currentDate = utils.getCurrentDate();

        const previewEntry = {
            id: utils.generateId(),
            sharedTerms: terms,
            content: content,
            dateCreated: currentDate,
            dateModified: currentDate
        };

        const previewCard = card.create(previewEntry);
        const dictionaryContent = document.getElementById('dictionaryContent');
        
        // Clear existing preview
        const existingPreview = document.querySelector('.preview-card');
        if (existingPreview) {
            existingPreview.remove();
        }

        // Add preview class and insert at the top
        previewCard.classList.add('preview-card');
        dictionaryContent.insertBefore(previewCard, dictionaryContent.firstChild);
        
        // Scroll to preview
        previewCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    handleCancel: () => {
        const entryForm = document.getElementById('entryForm');
        entryForm.reset();
        delete entryForm.dataset.editId;

        // Remove preview if exists
        const previewCard = document.querySelector('.preview-card');
        if (previewCard) {
            previewCard.remove();
        }
    },

    handleCopyCode: () => {
        const codeElement = document.getElementById('generatedCode');
        const code = codeElement.textContent;
        
        navigator.clipboard.writeText(code).then(() => {
            const copyBtn = document.getElementById('copyCode');
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy code:', err);
            alert('Failed to copy code to clipboard');
        });
    }
};
