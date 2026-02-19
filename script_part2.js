

// Add event listener for reset button
document.getElementById('resetDataBtn')?.addEventListener('click', resetData);




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

const customColorInput = document.getElementById('customColorInput');
customColorInput.addEventListener('input', () => {
    themeSwatches.forEach(s => s.classList.remove('active'));
    customColorInput.parentElement.classList.add('active');
    document.body.className = ''; // Remove preset theme classes

    const hex = customColorInput.value;
    document.documentElement.style.setProperty('--theme-color', hex);
    document.documentElement.style.setProperty('--theme-light', generateLightVariant(hex));

    // Mutual Exclusivity: Remove header image if color is picked
    const header = document.querySelector('.cv-header');
    header.style.backgroundImage = 'none';
    header.classList.remove('has-bg');
    document.querySelectorAll('.image-swatch').forEach(s => s.classList.remove('active'));

    saveData();
});

fontSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
        fontSwatches.forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');

        // Apply font class to container
        previews.container.classList.forEach(cls => {
            if (cls.startsWith('font-')) previews.container.classList.remove(cls);
        });
        previews.container.classList.add(swatch.dataset.font);

        saveData();
    });
});

layoutToggle.addEventListener('change', () => {
    previews.container.classList.toggle('layout-swapped', layoutToggle.checked);
    syncThemeVariables();
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
            // Show immediate feedback/spinner if needed? For now, just load
            imageUrlToBase64(originalUrl).then(base64Url => {
                header.style.backgroundImage = `url('${base64Url}')`;
                header.classList.add('has-bg');
                cvData.personal.headerImage = base64Url; // Ensure this is saved
                // Adaptive Theming: Automatically apply matching color palette
                if (swatch.dataset.adaptiveTheme) {
                    document.body.className = swatch.dataset.adaptiveTheme;
                    // Clear any custom color overrides
                    document.documentElement.style.removeProperty('--theme-color');
                    document.documentElement.style.removeProperty('--theme-light');
                }

                // Mutual Exclusivity: Deselect color swatches visually if an image is picked
                themeSwatches.forEach(s => s.classList.remove('active'));
                document.getElementById('customColorInput').parentElement.classList.remove('active');

                saveData();
                updateHeaderBaseline();
            });
        }
    });
});

function updateHeaderBaseline() {
    const header = document.querySelector('.cv-header');
    const currentStyle = localStorage.getItem('cvBuilderHeaderStyle') || 'solid';
    const currentImage = localStorage.getItem('cvBuilderHeaderImage') || 'none';

    // "Fast" (solid) on a standard background is the ONLY "baseline" (original) state.
    // Any other style OR a background image triggers "Banner Mode" (centered layout).
    if (currentStyle !== 'solid' || currentImage !== 'none') {
        header.classList.add('header-banner');
    } else {
        header.classList.remove('header-banner');
    }
}

headerStyleSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
        headerStyleSwatches.forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');

        const style = swatch.dataset.style;
        const header = document.querySelector('.cv-header');

        // Remove old style classes
        header.classList.forEach(cls => {
            if (cls.startsWith('style-')) header.classList.remove(cls);
        });

        if (style !== 'solid') {
            header.classList.add(`style-${style}`);
        }

        saveData();
        updateHeaderBaseline();
    });
});





// --- RENDER FUNCTION (THE CORE) ---
function render() {
    previews.name.textContent = cvData.personal.name || 'Ditt namn';
    previews.email.querySelector('span').textContent = cvData.personal.email || 'E-post';
    previews.email.href = cvData.personal.email ? `mailto:${cvData.personal.email}` : '#';
    previews.phone.querySelector('span').textContent = cvData.personal.phone || 'Telefon';
    previews.phone.href = cvData.personal.phone ? `tel:${cvData.personal.phone}` : '#';

    const linkedInUrl = cvData.personal.linkedin;
    const linkedInSpan = previews.linkedin.querySelector('span');
    if (linkedInUrl && linkedInUrl.trim() !== '') {
        previews.linkedin.href = linkedInUrl;
        linkedInSpan.textContent = linkedInUrl.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '');
        previews.linkedin.style.display = 'inline-flex';
    } else {
        previews.linkedin.href = '#';
        previews.linkedin.style.display = 'none';
    }

    const websiteUrl = cvData.personal.website;
    const websiteSpan = previews.website.querySelector('span');
    if (websiteUrl && websiteUrl.trim() !== '') {
        // Ensure URL has protocol
        previews.website.href = websiteUrl.match(/^https?:\/\//) ? websiteUrl : `https://${websiteUrl}`;
        websiteSpan.textContent = websiteUrl.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '');
        previews.website.style.display = 'inline-flex';
    } else {
        previews.website.href = '#';
        previews.website.style.display = 'none';
    }

    previews.profilePic.src = cvData.personal.photo;

    // Apply Photo Shape
    const shape = cvData.personal.photoSettings?.shape || 'circle';
    previews.profilePic.className = `cv-profile-pic ${shape}`;

    // Update UI Previews
    updatePhotoPreviews();

    // Apply Photo Filter
    updatePhotoPreviews();

    // Apply Photo Filter
    const photoShape = cvData.personal.photoSettings?.shape || 'circle';
    const picContainer = previews.profilePic.parentElement;
    if (picContainer) {
        picContainer.classList.remove('shape-circle', 'shape-rounded', 'shape-squircle', 'shape-square');
        picContainer.classList.add(`shape-${photoShape}`);

        // Update active shape swatch in studio
        document.querySelectorAll('.shape-swatch').forEach(s => s.classList.toggle('active', s.dataset.shape === photoShape));
    }

    // Apply Professional Filters
    const activeFilter = cvData.personal.photoSettings?.filter || 'none';
    previews.profilePic.className = `cv-profile-pic ${activeFilter !== 'none' ? activeFilter : ''}`;

    if (cvData.personal.photoSettings) {
        const { zoom, x, y } = cvData.personal.photoSettings;

        // transform-origin is the most professional way to handle zoom/pan without "white space"
        // Since width/height are 100%, object-fit: cover ensures the image ALWAYS fills the frame.
        // transform-origin then controls WHHICH part of the "cover" is zoomed into.
        previews.profilePic.style.transformOrigin = `${x}% ${y}%`;
        previews.profilePic.style.transform = `scale(${zoom})`;

        previews.profilePic.style.width = '100%';
        previews.profilePic.style.height = '100%';
        previews.profilePic.style.objectPosition = 'center';
    } else {
        previews.profilePic.style.transform = 'none';
        previews.profilePic.style.width = '100%';
        previews.profilePic.style.height = '100%';
        previews.profilePic.style.objectPosition = 'center';
    }

    const toggle = (el, has) => {
        const section = el.closest('.cv-section');
        if (section) {
            const sectionName = section.id.replace('section-', '');
            const isVisible = cvData.visibility[sectionName] !== false;
            section.style.display = (has && isVisible) ? 'block' : 'none';
        }
    };

    const createListItems = (container, items, type, renderFn) => {
        if (!container) return;
        container.innerHTML = '';
        const itemList = Array.isArray(items) ? items : [];
        toggle(container, itemList.length > 0);

        const isPreview = container.id && container.id.startsWith('preview');

        itemList.forEach((item, index) => {
            const el = renderFn(item, index, type);
            if (el) {
                el.setAttribute('draggable', true);
                el.dataset.index = index;
                el.dataset.type = type;

                if (isPreview) {
                    el.classList.add('animate-entrance');
                    el.style.animationDelay = `${index * 0.08}s`;
                }

                container.appendChild(el);
            }
        });
    };

    createListItems(previews.experience, cvData.experiences, 'experiences', (exp) => {
        const item = document.createElement('div'); item.className = 'experience-item editable-item'; item.dataset.id = exp.id;
        const logoHtml = exp.logo
            ? `<img src="${exp.logo}" alt="${exp.company}" class="company-logo">`
            : `<div class="company-logo generic-logo"><i class="fas fa-building"></i></div>`;

        const duration = exp.raw ? getDuration(exp.raw.startMonth, exp.raw.startYear, exp.raw.endMonth, exp.raw.endYear, exp.raw.current) : '';

        item.innerHTML = `
      <div class="item-header">
        ${logoHtml}
        <div class="text-content">
          <div class="item-title-row">
            <div class="title-company">
              <span class="title">${exp.title}</span>
              <span class="company">${exp.company}</span>
            </div>
            <div class="date-column">
               <span class="years">${exp.years}</span>
               ${duration ? `<span class="duration">${duration}</span>` : ''}
            </div>
          </div>
          <ul class="experience-desc">${exp.desc.split('\n').filter(l => l.trim()).map(l => `<li>${l}</li>`).join('')}</ul>
        </div>
      </div>
      <div class="item-actions">
        <button class="edit-btn" data-id="${exp.id}" title="Redigera"><i class="fas fa-pencil-alt"></i></button>
        <button class="delete-btn" data-id="${exp.id}" title="Ta bort"><i class="fas fa-trash"></i></button>
      </div>`;
        return item;
    });



    createListItems(previews.education, cvData.education, 'education', (edu) => {
        const item = document.createElement('div'); item.className = 'education-item editable-item'; item.dataset.id = edu.id;
        const duration = edu.raw ? getDuration(edu.raw.startMonth, edu.raw.startYear, edu.raw.endMonth, edu.raw.endYear, edu.raw.current) : '';

        item.innerHTML = `
      <div class="item-header">
        <div class="company-logo education-placeholder-icon">
          <i class="fas fa-graduation-cap"></i>
        </div>
        <div class="text-content">
          <div class="item-title-row">
            <div class="title-school">
              <span class="title">${edu.degree}</span>
              <span class="school">${edu.school}</span>
            </div>
            <div class="date-column">
               <span class="years">${edu.years}</span>
               ${duration ? `<span class="duration">${duration}</span>` : ''}
            </div>
          </div>
        </div>
      </div>
      <div class="item-actions">
        <button class="edit-btn" data-id="${edu.id}" title="Redigera"><i class="fas fa-pencil-alt"></i></button>
        <button class="delete-btn" data-id="${edu.id}" title="Ta bort"><i class="fas fa-trash"></i></button>
      </div>`;
        return item;
    });

    createListItems(previews.skills, cvData.skills, 'skills', (skill, idx) => {
        const span = document.createElement('span');
        span.className = 'skill-tag';
        span.innerHTML = `${skill}<button class="skill-delete-btn" data-index="${idx}" title="Ta bort">×</button>`;
        return span;
    });

    // Sidebar Skills List (Standardized)
    createListItems(previews.sidebarSkills, cvData.skills, 'skills', (skill, idx) => {
        const li = document.createElement('li');
        li.innerHTML = `
      <div class="item-drag-content">
        <i class="fas fa-grip-vertical drag-handle"></i>
        <span>${skill}</span>
      </div>
      <div class="item-actions">
        <button class="edit-btn skill-edit" data-index="${idx}" title="Redigera"><i class="fas fa-pencil-alt"></i></button>
        <button class="delete-btn skill-delete" data-index="${idx}" title="Ta bort"><i class="fas fa-trash"></i></button>
      </div>`;
        return li;
    });

    // 1. CV Preview Certs (Clean)
    createListItems(previews.certs, cvData.certs, 'certs', (cert) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${cert}</span>`;
        return li;
    });

    // 2. Sidebar Certs List (Interactive)
    createListItems(previews.sidebarCerts, cvData.certs, 'certs', (cert, idx) => {
        const li = document.createElement('li');
        li.innerHTML = `
      <div class="item-drag-content">
        <i class="fas fa-grip-vertical drag-handle"></i>
        <span>${cert}</span>
      </div>
      <div class="item-actions">
        <button class="edit-btn cert-edit" data-index="${idx}" title="Redigera"><i class="fas fa-pencil-alt"></i></button>
        <button class="delete-btn cert-delete" data-index="${idx}" title="Ta bort"><i class="fas fa-trash"></i></button>
      </div>`;
        return li;
    });

    // RENDER LANGUAGES
    // 1. Sidebar List (With Flags)
    createListItems(previews.sidebarLanguages, cvData.languages, 'languages', (lang, idx) => {
        const li = document.createElement('li');
        let display = lang;
        let sidebarHtml = '';
        if (lang.includes(':')) {
            const [code, rest] = lang.split(':', 2);
            display = rest;
            sidebarHtml = `<img src="https://flagcdn.com/w40/${code}.png" class="sidebar-lang-flag" alt="">`;
        }

        // Split Name and Level if exists: "Svenska (Modersmål)" -> ["Svenska", "Modersmål"]
        let name = display;
        let level = "";
        const levelMatch = display.match(/\(([^)]+)\)$/);
        if (levelMatch) {
            name = display.replace(levelMatch[0], '').trim();
            level = levelMatch[1];
        }

        li.innerHTML = `
      <div class="item-drag-content">
        <i class="fas fa-grip-vertical drag-handle"></i>
        ${sidebarHtml}
        <div class="lang-info">
          <span class="lang-name">${name}</span>
          ${level ? `<span class="lang-level">${level}</span>` : ''}
        </div>
      </div>
      <div class="item-actions">
        <button class="edit-btn lang-edit" data-index="${idx}" title="Redigera"><i class="fas fa-pencil-alt"></i></button>
        <button class="delete-btn lang-delete" data-index="${idx}" title="Ta bort">
          <i class="fas fa-trash"></i>
        </button>
      </div>`;
        return li;
    });

    // 2. CV Preview (Text Only) - stripped of codes
    createListItems(previews.languages, cvData.languages, 'languages', (lang) => {
        const li = document.createElement('li');
        const display = lang.includes(':') ? lang.split(':', 2)[1] : lang;
        li.innerHTML = `<span>${display}</span>`;
        return li;
    });




    // Render In-Form Management Lists
    const renderFormList = (container, items, type) => {
        if (!container) return;
        container.innerHTML = '';
        const itemList = Array.isArray(items) ? items : [];
        itemList.forEach((item, index) => {
            const li = document.createElement('li');
            li.setAttribute('draggable', true);
            li.dataset.index = index;
            li.dataset.type = type;

            const title = type === 'experiences' ? item.title : item.degree;
            const subtitle = type === 'experiences' ? item.company : item.school;

            li.innerHTML = `
        <i class="fas fa-grip-vertical drag-handle"></i>
        <div class="item-info">
          <span class="item-title">${title}</span>
          <span class="item-subtitle">${subtitle} (${item.years})</span>
        </div>
        <div class="item-actions">
          <button class="edit-btn" data-id="${item.id}" title="Redigera"><i class="fas fa-pencil-alt"></i></button>
          <button class="delete-btn" data-id="${item.id}" title="Ta bort"><i class="fas fa-trash"></i></button>
        </div>
      `;
            container.appendChild(li);
        });
    };

    renderFormList(previews.formExperience, cvData.experiences, 'experiences');
    renderFormList(previews.formEducation, cvData.education, 'education');

    // Show/Hide Header based on personal visibility
    const previewHeader = document.querySelector('.cv-header');
    if (previewHeader) previewHeader.style.display = cvData.visibility.personal ? 'flex' : 'none';
    const previewContact = document.querySelector('.contact-info');
    if (previewContact) previewContact.style.display = cvData.visibility.personal ? 'flex' : 'none';
}

// --- EVENT HANDLERS ---
const handlePersonalInfoUpdate = debounce(() => {
    cvData.personal.name = inputs.name.value; cvData.personal.email = inputs.email.value; cvData.personal.phone = inputs.phone.value; cvData.personal.linkedin = inputs.linkedin.value;
    cvData.personal.website = inputs.website.value;
    let profileText = inputs.profile.value;
    if (profileText.length > 500) { profileText = profileText.substring(0, 500); inputs.profile.value = profileText; }
    cvData.personal.profile = profileText;
    charCount.textContent = `${profileText.length}/500 tecken`;
    render();
}, 300);

inputs.profile.addEventListener('input', () => {
    const len = inputs.profile.value.length; charCount.textContent = `${len}/500 tecken`;
    charCount.style.color = len > 500 ? '#dc3545' : '';
});

[inputs.name, inputs.email, inputs.phone, inputs.linkedin, inputs.website, inputs.profile].forEach(i => i.addEventListener('input', handlePersonalInfoUpdate));

inputs.photo.addEventListener('change', async e => {
    if (e.target.files[0]) {
        try {
            cvData.personal.photo = await resizeImage(e.target.files[0], 400);
            render();
            showFeedback('Profilbild optimerad och sparad.');
        } catch {
            showFeedback('Kunde inte ladda bilden.', true);
        }
    }
});

inputs.headerImage.addEventListener('change', async e => {
    if (e.target.files[0]) {
        try {
            const header = document.querySelector('.cv-header');
            const imageUrl = await resizeImage(e.target.files[0], 1200); // 1200px width for panoramic feel

            header.style.backgroundImage = `url('${imageUrl}')`;
            header.classList.add('has-bg');

            // Mutual Exclusivity: Deselect preset image swatches
            document.querySelectorAll('.image-swatch').forEach(s => s.classList.remove('active'));

            // Save state
            localStorage.setItem('cvBuilderHeaderImage', imageUrl);

            // Adaptive context: If it's a new upload, default to graphite theme for professional neutral look
            // but only if a manual theme wasn't already picked
            if (!localStorage.getItem('cvBuilderTheme')) {
                document.body.className = 'theme-modern-graphite';
            }

            themeSwatches.forEach(s => s.classList.remove('active'));
            saveData();
            showFeedback('Bakgrundsbild uppladdad!');
        } catch (err) {
            console.error(err);
            showFeedback('Kunde inte ladda bilden.', true);
        }
    }
});

[inputs.photoZoom, inputs.photoX, inputs.photoY].forEach(slider => {
    slider.addEventListener('input', () => {
        cvData.personal.photoSettings = {
            zoom: parseFloat(inputs.photoZoom.value),
            x: parseInt(inputs.photoX.value),
            y: parseInt(inputs.photoY.value)
        };
        render();
        saveData();
    });
});

// --- LANGUAGE SEARCH LOGIC ---
inputs.language.addEventListener('input', () => {
    const query = inputs.language.value.toLowerCase().trim();
    inputs.languageSuggestions.innerHTML = '';

    const renderSuggestions = (list, isPopular = false) => {
        if (isPopular && list.length > 0) {
            const header = document.createElement('div');
            header.className = 'suggestion-header';
            header.textContent = 'Populära språk';
            inputs.languageSuggestions.appendChild(header);
        }

        list.forEach(lang => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            const flagUrl = `https://flagcdn.com/w40/${lang.code}.png`;
            div.innerHTML = `<img src="${flagUrl}" class="suggestion-flag" alt="${lang.name}"> ${lang.name}`;
            div.onclick = () => {
                inputs.language.value = lang.name;
                inputs.languageSuggestions.innerHTML = '';

                // Show selected flag in input box
                const flagUrl = `https://flagcdn.com/w40/${lang.code}.png`;
                inputs.languageFlagPreview.innerHTML = `<img src="${flagUrl}" alt="${lang.name}">`;
                inputs.languageFlagPreview.style.display = 'flex';
                inputs.languageWrapper.classList.add('has-flag');
                inputs.language.dataset.code = lang.code;
                inputs.languageLevel.focus();
            };
            inputs.languageSuggestions.appendChild(div);
        });
    };

    if (!query) {
        const popular = LANGUAGES_LIST.filter(l => POPULAR_LANGUAGES.includes(l.code));
        renderSuggestions(popular, true);
        return;
    }

    const matches = LANGUAGES_LIST.filter(l => l.name.toLowerCase().includes(query));
    renderSuggestions(matches);
});

inputs.language.addEventListener('focus', () => {
    if (!inputs.language.value.trim()) {
        const popular = LANGUAGES_LIST.filter(l => POPULAR_LANGUAGES.includes(l.code));
        inputs.languageSuggestions.innerHTML = '';
        const header = document.createElement('div');
        header.className = 'suggestion-header';
        header.textContent = 'Populära språk';
        inputs.languageSuggestions.appendChild(header);

        popular.forEach(lang => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            const flagUrl = `https://flagcdn.com/w40/${lang.code}.png`;
            div.innerHTML = `<img src="${flagUrl}" class="suggestion-flag" alt="${lang.name}"> ${lang.name}`;
            div.onclick = () => {
                inputs.language.value = lang.name;
                inputs.languageSuggestions.innerHTML = '';
                const flagUrlSelected = `https://flagcdn.com/w40/${lang.code}.png`;
                inputs.languageFlagPreview.innerHTML = `<img src="${flagUrlSelected}" alt="${lang.name}">`;
                inputs.languageFlagPreview.style.display = 'flex';
                inputs.languageWrapper.classList.add('has-flag');
                inputs.language.dataset.code = lang.code;
                inputs.languageLevel.focus();
            };
            inputs.languageSuggestions.appendChild(div);
        });
    }
});

// Close suggestions on outside click
document.addEventListener('click', (e) => {
    if (!inputs.language.contains(e.target) && !inputs.languageSuggestions.contains(e.target)) {
        inputs.languageSuggestions.innerHTML = '';
    }
});
