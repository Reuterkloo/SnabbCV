return yearB - yearA;
  });
render();
saveData();
showFeedback('Erfarenheter sorterade efter datum');
});

buttons.sortEducation?.addEventListener('click', () => {
    cvData.education.sort((a, b) => {
        const isCurrentA = a.years.toLowerCase().includes('nuvarande');
        const isCurrentB = b.years.toLowerCase().includes('nuvarande');
        if (isCurrentA && !isCurrentB) return -1;
        if (!isCurrentA && isCurrentB) return 1;
        const yearA = parseInt(a.years.match(/\d{4}/)?.[0] || 0);
        const yearB = parseInt(b.years.match(/\d{4}/)?.[0] || 0);
        return yearB - yearA;
    });
    render();
    saveData();
    showFeedback('Utbildningar sorterade efter datum');
});

// 2. Import / Export
buttons.importJson?.addEventListener('click', () => {
    buttons.importJsonInput.click();
});

buttons.importJsonInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const importedData = JSON.parse(e.target.result);
            if (!importedData.personal || !importedData.experiences) throw new Error('Ogiltigt format');
            cvData = importedData;
            saveData();
            location.reload();
        } catch (err) {
            showFeedback('Kunde inte importera filen: ' + err.message, true);
        }
    };
    reader.readAsText(file);
});

buttons.exportJson?.addEventListener('click', () => {
    const dataStr = JSON.stringify(cvData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CV_Data_${cvData.personal.name.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showFeedback('JSON data exporterad');
});

// 3. Photo Studio
document.getElementById('photoShapeGrid')?.addEventListener('click', e => {
    const swatch = e.target.closest('.shape-swatch');
    if (swatch) {
        if (!cvData.personal.photoSettings) cvData.personal.photoSettings = { zoom: 1, x: 50, y: 50 };
        cvData.personal.photoSettings.shape = swatch.dataset.shape;
        render();
        saveData();
    }
});

document.getElementById('photoFilterGrid')?.addEventListener('click', e => {
    const swatch = e.target.closest('.filter-swatch');
    if (swatch) {
        document.querySelectorAll('.filter-swatch').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        if (!cvData.personal.photoSettings) cvData.personal.photoSettings = { zoom: 1, x: 50, y: 50 };
        cvData.personal.photoSettings.filter = swatch.dataset.filter;
        render();
        saveData();
    }
});

document.querySelector('.studio-composition-pad')?.addEventListener('click', e => {
    const btn = e.target.closest('.studio-control-btn');
    if (!btn) return;
    const action = btn.dataset.action;
    if (!cvData.personal.photoSettings) cvData.personal.photoSettings = { zoom: 1, x: 50, y: 50 };
    const settings = cvData.personal.photoSettings;
    const STEP = 5;
    const ZOOM_STEP = 0.1;
    switch (action) {
        case 'zoom-in': settings.zoom = Math.min(3, (settings.zoom || 1) + ZOOM_STEP); break;
        case 'zoom-out': settings.zoom = Math.max(1, (settings.zoom || 1) - ZOOM_STEP); break;
        case 'pan-up': settings.y = Math.max(0, (settings.y || 50) - STEP); break;
        case 'pan-down': settings.y = Math.min(100, (settings.y || 50) + STEP); break;
        case 'pan-left': settings.x = Math.max(0, (settings.x || 50) - STEP); break;
        case 'pan-right': settings.x = Math.min(100, (settings.x || 50) + STEP); break;
        case 'reset': settings.zoom = 1; settings.x = 50; settings.y = 50; break;
    }
    if (inputs.photoZoom) inputs.photoZoom.value = settings.zoom;
    if (inputs.photoX) inputs.photoX.value = settings.x;
    if (inputs.photoY) inputs.photoY.value = settings.y;
    render();
    saveData();
});

const dropZone = document.getElementById('photoDropZone');
dropZone?.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('drag-over'); });
dropZone?.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
dropZone?.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handlePhotoFile(file);
});

function handlePhotoFile(file) {
    const reader = new FileReader();
    reader.onload = e => {
        cvData.personal.photo = e.target.result;
        render();
        saveData();
    };
    reader.readAsDataURL(file);
}

inputs.photo?.addEventListener('change', e => {
    const file = e.target.files[0];
    if (file) handlePhotoFile(file);
});

// 4. Global Accordion Logic
accordions.forEach(acc => {
    acc.addEventListener('toggle', () => {
        if (acc.open) {
            accordions.forEach(other => {
                if (other !== acc) other.open = false;
            });
        }
    });
});

// 5. Item Action Clicks (Edit / Delete)
document.addEventListener('click', (e) => {
    const editBtn = e.target.closest('.edit-btn');
    const deleteBtn = e.target.closest('.delete-btn');

    if (deleteBtn) {
        const id = deleteBtn.dataset.id;
        if (id?.startsWith('exp-')) {
            cvData.experiences = cvData.experiences.filter(i => i.id !== id);
        } else if (id?.startsWith('edu-')) {
            cvData.education = cvData.education.filter(i => i.id !== id);
        }
        render();
        saveData();
    }

    if (editBtn) {
        const id = editBtn.dataset.id;
        if (id?.startsWith('exp-')) {
            const exp = cvData.experiences.find(item => item.id === id);
            if (exp) {
                const accordion = document.getElementById('accordion-experience');
                if (!accordion.open) accordion.querySelector('summary').click();
                inputs.expTitle.value = exp.title;
                if (exp.raw) {
                    inputs.expCompany.value = exp.raw.company || '';
                    inputs.expLocation.value = exp.raw.location || '';
                    inputs.expStartMonth.value = exp.raw.startMonth || '';
                    inputs.expStartYear.value = exp.raw.startYear || '';
                    inputs.expEndMonth.value = exp.raw.endMonth || '';
                    inputs.expEndYear.value = exp.raw.endYear || '';
                    inputs.expCurrent.checked = exp.raw.current || false;
                    const group = inputs.expEndMonth.closest('.end-date-group');
                    group.classList.toggle('disabled', inputs.expCurrent.checked);
                } else {
                    inputs.expCompany.value = exp.company;
                }
                inputs.expDesc.value = exp.desc;
                inputs.editingExperienceId = id;
                buttons.addExperience.textContent = "Uppdatera erfarenhet";
                accordion.scrollIntoView({ behavior: 'smooth' });
                inputs.expTitle.focus();
            }
        }
        if (id?.startsWith('edu-')) {
            const edu = cvData.education.find(item => item.id === id);
            if (edu) {
                const accordion = document.getElementById('accordion-education');
                if (!accordion.open) accordion.querySelector('summary').click();
                inputs.eduDegree.value = edu.degree;
                if (edu.raw) {
                    inputs.eduSchool.value = edu.raw.school || '';
                    inputs.eduLocation.value = edu.raw.location || '';
                    inputs.eduStartMonth.value = edu.raw.startMonth || '';
                    inputs.eduStartYear.value = edu.raw.startYear || '';
                    inputs.eduEndMonth.value = edu.raw.endMonth || '';
                    inputs.eduEndYear.value = edu.raw.endYear || '';
                    inputs.eduCurrent.checked = edu.raw.current || false;
                    const group = inputs.eduEndMonth.closest('.end-date-group');
                    group.classList.toggle('disabled', inputs.eduCurrent.checked);
                } else {
                    inputs.eduSchool.value = edu.school;
                }
                inputs.editingEducationId = id;
                buttons.addEducation.textContent = "Uppdatera utbildning";
                accordion.scrollIntoView({ behavior: 'smooth' });
                inputs.eduDegree.focus();
            }
        }


    }
});


// --- THEME & STYLE SELECTION ---
themeSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
        themeSwatches.forEach(s => s.classList.remove('active'));
        document.getElementById('customColorInput').parentElement.classList.remove('active');
        swatch.classList.add('active');
        document.body.className = swatch.dataset.theme;

        // Mutual Exclusivity: Remove header image if color is picked
        const header = document.querySelector('.cv-header');
        header.style.backgroundImage = 'none';
        header.classList.remove('has-bg');
        document.querySelectorAll('.image-swatch').forEach(s => s.classList.remove('active'));

        syncThemeVariables();
        saveData();
    });
});

document.getElementById('customColorInput')?.addEventListener('input', (e) => {
    themeSwatches.forEach(s => s.classList.remove('active'));
    e.target.parentElement.classList.add('active');
    document.body.className = '';

    const hex = e.target.value;
    document.documentElement.style.setProperty('--theme-color', hex);
    document.documentElement.style.setProperty('--theme-light', generateLightVariant(hex));

    const header = document.querySelector('.cv-header');
    header.style.backgroundImage = 'none';
    header.classList.remove('has-bg');
    document.querySelectorAll('.image-swatch').forEach(s => s.classList.remove('active'));

    saveData();
});

headerImageSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
        headerImageSwatches.forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');

        const originalUrl = swatch.dataset.image;
        const header = document.querySelector('.cv-header');

        if (originalUrl === 'none') {
            header.style.backgroundImage = 'none';
            header.classList.remove('has-bg');
            cvData.personal.headerImage = 'none';
            saveData();
            updateHeaderBaseline();
        } else {
            imageUrlToBase64(originalUrl).then(base64Url => {
                header.style.backgroundImage = `url('${base64Url}')`;
                header.classList.add('has-bg');
                cvData.personal.headerImage = base64Url;
                themeSwatches.forEach(s => s.classList.remove('active'));
                document.getElementById('customColorInput').parentElement.classList.remove('active');
                saveData();
                updateHeaderBaseline();
            });
        }
    });
});

headerStyleSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
        headerStyleSwatches.forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');

        const style = swatch.dataset.style;
        const header = document.querySelector('.cv-header');
        header.classList.forEach(cls => {
            if (cls.startsWith('style-')) header.classList.remove(cls);
        });
        if (style !== 'solid') header.classList.add(`style-${style}`);

        saveData();
        updateHeaderBaseline();
    });
});

fontSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
        fontSwatches.forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        previews.container.classList.forEach(cls => {
            if (cls.startsWith('font-')) previews.container.classList.remove(cls);
        });
        previews.container.classList.add(swatch.dataset.font);
        saveData();
    });
});

// --- PDF & JSON EXPORT ---
const downloadPDF = async () => {
    const element = document.querySelector('.cv-container');
    if (!element) return;

    showFeedback('Förbereder PDF...');
    document.body.classList.add('exporting-pdf');

    try {
        // 1. ASSET SANITIZATION: Ensure all images are Base64
        if (cvData.personal.photo) cvData.personal.photo = await imageUrlToBase64(cvData.personal.photo);
        if (cvData.personal.headerImage) cvData.personal.headerImage = await imageUrlToBase64(cvData.personal.headerImage);
        for (let exp of cvData.experiences) {
            if (exp.logo) exp.logo = await imageUrlToBase64(exp.logo);
        }
        for (let edu of cvData.education) {
            if (edu.logo) edu.logo = await imageUrlToBase64(edu.logo);
        }

        // Re-render to apply localized Base64 strings
        render();

        // 2. Wait for exporting-pdf styles to apply and animations to settle
        await new Promise(resolve => setTimeout(resolve, 500));

        // 3. Capture the full element as a canvas via html2pdf's worker
        //    (html2canvas is bundled inside html2pdf and exposed as window.html2canvas)
        let capturedCanvas = null;
        await html2pdf()
            .set({
                html2canvas: {
                    scale: 3,
                    useCORS: true,
                    allowTaint: false,
                    letterRendering: true,
                    logging: false,
                    scrollX: 0,
                    scrollY: 0,
                    backgroundColor: '#ffffff',
