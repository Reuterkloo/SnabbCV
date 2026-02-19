const DEFAULT_VISIBILITY = { personal: true, experience: true, education: true, skills: true, languages: true, certs: true };

const LANGUAGES_LIST = [
    { name: 'Svenska', code: 'se' },
    { name: 'Engelska', code: 'gb' },
    { name: 'Tyska', code: 'de' },
    { name: 'Franska', code: 'fr' },
    { name: 'Spanska', code: 'es' },
    { name: 'Italienska', code: 'it' },
    { name: 'Finska', code: 'fi' },
    { name: 'Norska', code: 'no' },
    { name: 'Danska', code: 'dk' },
    { name: 'Polska', code: 'pl' },
    { name: 'Holländska', code: 'nl' },
    { name: 'Ryska', code: 'ru' },
    { name: 'Kinesiska', code: 'cn' },
    { name: 'Japanska', code: 'jp' },
    { name: 'Arabiska', code: 'sa' },
    { name: 'Portugisiska', code: 'pt' }
];

const POPULAR_LANGUAGES = ['se', 'gb', 'de', 'fr', 'es', 'fi', 'no', 'dk'];

const INITIAL_DATA = {
    personal: {
        name: 'Richard Reuterkloo',
        email: 'richard@reuterkloo.com',
        phone: '070-123 45 67',
        linkedin: 'https://www.linkedin.com/in/richard-reuterkloo/',
        website: 'www.reuterkloo.com',
        profile: 'Lösningsorienterad med fokus på samarbete och innovation. Min drivkraft är att ständigt utvecklas och lära nytt. Detta gratis hobbyprojekt är skapat för att du enkelt ska kunna bygga ett snyggt CV som sticker ut. (Observera att erfarenheter nedan endast är demonstrationsexempel.)',
        photo: 'https://reuterkloo.com/rr.jpeg',
        photoSettings: { zoom: 1, x: 50, y: 50, shape: 'circle' },
        headerImage: 'https://i0.wp.com/linkedinheaders.com/wp-content/uploads/2018/02/skyscrapers-header.jpg?ssl=1'
    },
    experiences: [
        {
            id: `exp-initial-1`,
            title: 'Senior Konsult',
            company: 'InnovaTech Solutions',
            years: 'Jan 2021 - Nuvarande',
            desc: 'Leder strategiska projekt och implementerar effektiva arbetsflöden.\nAnsvarar för kundrelationer och teknisk rådgivning.\nDriver kontinuerlig förbättring av interna processer.',
            logo: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20rx%3D%2212%22%20fill%3D%22%231e293b%22%2F%3E%3Ctext%20x%3D%2250%22%20y%3D%2264%22%20font-family%3D%22Arial%2CBoxicons%2Csans-serif%22%20font-size%3D%2245%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20text-anchor%3D%22middle%22%3EIS%3C%2Ftext%3E%3C%2Fsvg%3E',
            raw: { company: 'InnovaTech Solutions', location: 'Stockholm', startMonth: 'Jan', startYear: '2021', endMonth: '', endYear: '', current: true }
        },
        {
            id: `exp-initial-2`,
            title: 'Projektledare',
            company: 'Nordic Logistics AB',
            years: 'Jan 2019 - Jan 2021',
            desc: 'Koordinerade internationella leveranskedjor och optimerade lagerhantering.\nSäkerställde hög leveransprecision och kundnöjdhet.\nUtvecklade och implementerade nya systemlösningar.',
            logo: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20rx%3D%2212%22%20fill%3D%22%230e7490%22%2F%3E%3Ctext%20x%3D%2250%22%20y%3D%2264%22%20font-family%3D%22Arial%2CBoxicons%2Csans-serif%22%20font-size%3D%2245%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20text-anchor%3D%22middle%22%3ENL%3C%2Ftext%3E%3C%2Fsvg%3E',
            raw: { company: 'Nordic Logistics AB', location: 'Göteborg', startMonth: 'Jan', startYear: '2019', endMonth: 'Jan', endYear: '2021', current: false }
        },
        {
            id: `exp-initial-3`,
            title: 'Systemutvecklare',
            company: 'TechFlow Systems',
            years: 'Jan 2016 - Jan 2019',
            desc: 'Utvecklade skalbara backend-lösningar i Node.js och Python.\nAnsvarade för API-design och integrationer mot tredjepartssystem.\nMentorskap för juniora utvecklare.',
            logo: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20rx%3D%2212%22%20fill%3D%22%237c3aed%22%2F%3E%3Ctext%20x%3D%2250%22%20y%3D%2264%22%20font-family%3D%22Arial%2CBoxicons%2Csans-serif%22%20font-size%3D%2245%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20text-anchor%3D%22middle%22%3ETF%3C%2Ftext%3E%3C%2Fsvg%3E',
            raw: { company: 'TechFlow Systems', location: 'Malmö', startMonth: 'Jan', startYear: '2016', endMonth: 'Jan', endYear: '2019', current: false }
        },
        {
            id: `exp-initial-4`,
            title: 'Junior Analytiker',
            company: 'EcoSphere Data',
            years: 'Jan 2014 - Jan 2016',
            desc: 'Analyserade stora datamängder för att identifiera marknadstrender.\nSkapade automatiserade rapporteringsverktyg i Excel och Power BI.\nStöttade ledningsgruppen med beslutsunderlag.',
            logo: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20rx%3D%2212%22%20fill%3D%22%2315803d%22%2F%3E%3Ctext%20x%3D%2250%22%20y%3D%2264%22%20font-family%3D%22Arial%2CBoxicons%2Csans-serif%22%20font-size%3D%2245%22%20font-weight%3D%22bold%22%20fill%3D%22white%22%20text-anchor%3D%22middle%22%3EED%3C%2Ftext%3E%3C%2Fsvg%3E',
            raw: { company: 'EcoSphere Data', location: 'Uppsala', startMonth: 'Jan', startYear: '2014', endMonth: 'Jan', endYear: '2016', current: false }
        }
    ],

    education: [{
        id: `edu-initial-1`,
        degree: "Kandidatexamen i Systemvetenskap",
        school: "Lunds Universitet",
        years: "Aug 2011 - Jun 2014",
        raw: { school: 'Lunds Universitet', location: 'Lund', startMonth: 'Aug', startYear: '2011', endMonth: 'Jun', endYear: '2014', current: false }
    }],
    skills: ['Strategisk planering', 'Projektledning', 'Agila metoder', 'Kommunikation', 'Analytiskt tänkande'],
    certs: ['Certifierad Projektledare (PMP)', 'Agile Coach Certification', 'Scrum Master Certification (PSM I)', 'Google Analytics Individual Qualification'],
    languages: ['se:Svenska (Modersmål)', 'gb:Engelska (Full professionell)'],
    visibility: { ...DEFAULT_VISIBILITY }
};

let cvData = JSON.parse(JSON.stringify(INITIAL_DATA));

// --- DOM Elements ---
const inputs = {
    name: document.getElementById('nameInput'),
    email: document.getElementById('emailInput'),
    phone: document.getElementById('phoneInput'),
    phone: document.getElementById('phoneInput'),
    linkedin: document.getElementById('linkedinInput'),
    website: document.getElementById('websiteInput'),
    profile: document.getElementById('profileInput'),
    photo: document.getElementById('photoInput'),
    expTitle: document.getElementById('expTitleInput'),
    expCompany: document.getElementById('expCompanyInput'),
    expYears: document.getElementById('expYearsInput'),
    expDesc: document.getElementById('expDescInput'),
    expLogo: document.getElementById('expLogoInput'),
    photoZoom: document.getElementById('photoZoom'),
    photoX: document.getElementById('photoX'),
    photoY: document.getElementById('photoY'),

    eduDegree: document.getElementById('eduDegreeInput'),
    eduSchool: document.getElementById('eduSchoolInput'),
    eduYears: document.getElementById('eduYearsInput'),
    skill: document.getElementById('skillInput'),
    cert: document.getElementById('certInput'),
    language: document.getElementById('languageInput'),
    languageSuggestions: document.getElementById('languageSuggestions'),
    languageFlagPreview: document.getElementById('selectedLanguageFlag'),
    languageWrapper: document.querySelector('.search-input-wrapper'),
    languageLevel: document.getElementById('languageLevel'),
    editingExperienceId: null,
    editingEducationId: null,
    editingSkillIdx: null,
    editingCertIdx: null,
    editingLanguageIdx: null,
    photoFilterGrid: document.getElementById('photoFilterGrid'),
    photoDropZone: document.getElementById('photoDropZone'),
    headerImage: document.getElementById('headerImageInput'),
    // Experience New Inputs
    expLocation: document.getElementById('expLocationInput'),
    expStartMonth: document.getElementById('expStartMonth'),
    expStartYear: document.getElementById('expStartYear'),
    expEndMonth: document.getElementById('expEndMonth'),
    expEndYear: document.getElementById('expEndYear'),
    expCurrent: document.getElementById('expCurrent'),
    expLogoLabel: document.getElementById('expLogoLabel'),
    // Education New Inputs
    eduLocation: document.getElementById('eduLocationInput'),
    eduStartMonth: document.getElementById('eduStartMonth'),
    eduStartYear: document.getElementById('eduStartYear'),
    eduEndMonth: document.getElementById('eduEndMonth'),
    eduEndYear: document.getElementById('eduEndYear'),
    eduCurrent: document.getElementById('eduCurrent')
};
const previews = {
    container: document.getElementById('cv-preview'),
    name: document.getElementById('previewName'),
    email: document.getElementById('previewEmail'),
    phone: document.getElementById('previewPhone'),
    phone: document.getElementById('previewPhone'),
    linkedin: document.getElementById('previewLinkedin'),
    website: document.getElementById('previewWebsite'),
    profile: document.getElementById('previewProfile'),
    profilePic: document.getElementById('previewProfilePic'),
    experience: document.getElementById('previewExperience'),
    education: document.getElementById('previewEducation'),
    skills: document.getElementById('previewSkills'),
    certs: document.getElementById('previewCerts'),
    languages: document.getElementById('previewLanguages'),
    sidebarLanguages: document.getElementById('sidebarLanguageList'),
    sidebarSkills: document.getElementById('sidebarSkillsList'),
    sidebarCerts: document.getElementById('sidebarCertsList'),
    formExperience: document.getElementById('formExperienceList'),
    formEducation: document.getElementById('formEducationList'),
    layoutToggle: document.getElementById('layoutToggle')
};
const sections = {
    personal: document.getElementById('accordion-personal'),
    experience: document.getElementById('accordion-experience'),

    education: document.getElementById('accordion-education'),
    skills: document.getElementById('accordion-skills'),
    certs: document.getElementById('accordion-certs'),
    languages: document.getElementById('accordion-languages')
};
const previewSections = {
    personal: document.getElementById('previewHeader'),
    experience: document.getElementById('section-experience'),

    education: document.getElementById('section-education'),
    skills: document.getElementById('section-skills'),
    certs: document.getElementById('section-certs'),
    languages: document.getElementById('section-languages')
};
const buttons = {
    addExperience: document.getElementById('addExperienceBtn'),

    addEducation: document.getElementById('addEducationBtn'),
    addSkill: document.getElementById('addSkillBtn'),
    addCert: document.getElementById('addCertBtn'),
    addLanguage: document.getElementById('addLanguageBtn'),
    sortExperience: document.getElementById('sortExperienceBtn'),
    sortEducation: document.getElementById('sortEducationBtn'),
    resetData: document.getElementById('resetDataBtn'),
    exportPdf: document.getElementById('exportPdfBtn'),
    exportJson: document.getElementById('exportJsonBtn'),
    importJson: document.getElementById('importJsonBtn'),
    importJsonInput: document.getElementById('importJsonInput')
};
const themeSwatches = document.querySelectorAll('.swatch');
const fontSwatches = document.querySelectorAll('.font-swatch');
const headerStyleSwatches = document.querySelectorAll('.style-swatch');
const headerImageSwatches = document.querySelectorAll('.image-swatch');

const layoutToggle = document.getElementById('layoutToggle');
const accordions = document.querySelectorAll('.sidebar details');
const charCount = document.getElementById('charCount');

const DEFAULT_THEME = 'theme-modern-teal';
const DEFAULT_FONT = 'font-inter';

// --- UTILITY FUNCTIONS ---
const debounce = (func, wait) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => func.apply(this, a), wait); }; };
const showFeedback = (msg, isErr = false) => { const f = document.createElement('div'); f.textContent = msg; f.className = `feedback ${isErr ? 'error' : 'success'}`; document.body.appendChild(f); setTimeout(() => f.remove(), 3000); };

// Helper to generate light version of a color for CV backgrounds
const generateLightVariant = (hex) => {
    // Simple hex to RGB
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    // Convert to HSL
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    // Set lightness to 97% for a very subtle background tint
    l = 0.97;
    // Reduce saturation for cleaner look
    s = Math.min(s, 0.3);

    // Convert back to RGB
    const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);

    const toHex = x => {
        const h = Math.round(x * 255).toString(16);
        return h.length === 1 ? '0' + h : h;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const getDuration = (startMonth, startYear, endMonth, endYear, isCurrent) => {
    if (isCurrent) return ''; // Hide duration for current roles to avoid "stale" time counts in PDFs
    if (!startYear) return '';
    const months = { 'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'Maj': 4, 'Jun': 5, 'Jul': 6, 'Aug': 7, 'Sep': 8, 'Okt': 9, 'Nov': 10, 'Dec': 11 };
    const sM = months[startMonth] || 0;
    const sY = parseInt(startYear);
    const now = new Date();
    const eM = isCurrent ? now.getMonth() : (months[endMonth] || 0);
    const eY = isCurrent ? now.getFullYear() : parseInt(endYear);

    if (isNaN(sY) || (!isCurrent && isNaN(eY))) return '';

    const totalMonths = (eY * 12 + eM) - (sY * 12 + sM) + 1; // +1 to include the start month
    if (totalMonths <= 0) return '';

    const years = Math.floor(totalMonths / 12);
    const remainingMonths = totalMonths % 12;

    let parts = [];
    if (years > 0) parts.push(`${years} ${years === 1 ? 'år' : 'år'}`);
    if (remainingMonths > 0) parts.push(`${remainingMonths} mån`);

    return parts.length > 0 ? `(${parts.join(' ')})` : '';
};

const updatePhotoPreviews = () => {
    const photoUrl = cvData.personal.photo;
    if (!photoUrl) return;

    const rule = `url('${photoUrl}')`;
    document.querySelectorAll('.shape-preview, .filter-preview').forEach(el => {
        el.style.backgroundImage = rule;
    });
};

// Resize Image to Square (400x400)
const resizeImage = (file, size = 400) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');

            // Calculate center crop
            const scale = Math.max(size / img.width, size / img.height);
            const w = img.width * scale;
            const h = img.height * scale;
            const x = (size - w) / 2;
            const y = (size - h) / 2;

            ctx.drawImage(img, x, y, w, h);
            resolve(canvas.toDataURL('image/jpeg', 0.8)); // 80% quality JPEG
        };
        img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
});

// Convert external URL to Base64 (to prevent "Tainted Canvas" in PDF export)
const imageUrlToBase64 = async (url) => {
    if (!url || typeof url !== 'string' || url.startsWith('data:') || url === 'none' || url.startsWith('blob:')) return url;

    // Placeholder SVG for failed fetches (Gray circle)
    const placeholder = 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="#f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" fill="#9ca3af">Foto saknas</text></svg>');

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        const response = await fetch(url, { mode: 'cors', signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (err) {
        console.warn(`PDF Export: CORS/Fetch failed for [${url}]. Using placeholder.`, err.message);
        return placeholder;
    }
};

const toBase64 = file => new Promise((res, rej) => { const r = new FileReader(); r.readAsDataURL(file); r.onload = () => res(r.result); r.onerror = e => rej(e); });

// --- DATA & STATE MANAGEMENT ---
const saveData = () => {
    localStorage.setItem('cvBuilderData', JSON.stringify(cvData));
    localStorage.setItem('cvBuilderLayoutSwapped', layoutToggle.checked);
    const activeTheme = document.querySelector('.swatch.active')?.dataset.theme || (document.getElementById('customColorInput').parentElement.classList.contains('active') ? 'custom' : 'none');
    localStorage.setItem('cvBuilderTheme', activeTheme);
    if (activeTheme === 'custom') {
        localStorage.setItem('cvBuilderCustomColor', document.getElementById('customColorInput').value);
    }
    const activeFont = document.querySelector('.font-swatch.active')?.dataset.font || DEFAULT_FONT;
    localStorage.setItem('cvBuilderFont', activeFont);

    const activeHeaderImage = document.querySelector('.image-swatch.active')?.dataset.image || 'none';
    localStorage.setItem('cvBuilderHeaderImage', activeHeaderImage);

    const activeHeaderStyle = document.querySelector('.style-swatch.active')?.dataset.style || 'solid';
    localStorage.setItem('cvBuilderHeaderStyle', activeHeaderStyle);

    updateProgressDots();
};

const resetData = () => {
    if (confirm('Är du säker på att du vill nollställa allt? Detta kommer att ta bort all din inmatade information permanent.')) {
        localStorage.clear(); // Safe bet: clear all app-related storage

        cvData = JSON.parse(JSON.stringify(INITIAL_DATA));

        previews.container.classList.remove('layout-swapped');
        document.body.className = DEFAULT_THEME;

        // Photo Shapes
        document.querySelectorAll('.shape-swatch').forEach(swatch => {
            swatch.addEventListener('click', () => {
                if (!cvData.personal.photoSettings) cvData.personal.photoSettings = { zoom: 1, x: 50, y: 50 };
                cvData.personal.photoSettings.shape = swatch.dataset.shape;
                render();
                saveData();
            });
        });

        // Reset All (Optional helper but keep it clean for now)
        // Reset swatches
        themeSwatches.forEach(s => s.classList.toggle('active', s.dataset.theme === DEFAULT_THEME));
        const customContainer = document.getElementById('customColorInput').parentElement;
        customContainer.classList.remove('active');

        // Reset font classes on the container
        previews.container.classList.forEach(cls => {
            if (cls.startsWith('font-')) previews.container.classList.remove(cls);
        });
        previews.container.classList.add(DEFAULT_FONT);
        fontSwatches.forEach(s => s.classList.toggle('active', s.dataset.font === DEFAULT_FONT));

        // Clear custom color overrides from the root
        document.documentElement.style.removeProperty('--theme-color');
        document.documentElement.style.removeProperty('--theme-light');
        document.getElementById('customColorInput').value = '#000000'; // Reset color wheel visually

        // Reset Header Image
        const header = document.querySelector('.cv-header');
        const defaultImage = INITIAL_DATA.personal.headerImage;
        imageUrlToBase64(defaultImage).then(b64 => {
            header.style.setProperty('background-image', `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${b64}')`, 'important');
            header.classList.add('has-bg');
        });

        // Reset style to solid
        header.classList.forEach(cls => { if (cls.startsWith('style-')) header.classList.remove(cls); });
        headerStyleSwatches.forEach(s => s.classList.toggle('active', s.dataset.style === 'solid'));

        // Update active state for swatches (matching the data-image) or remove active if custom
        document.querySelectorAll('.image-swatch').forEach(s => {
            // Check if the swatch data-image matches (we might need to check if the swatch ends with the filename if it was a URL, 
            // but here we are using Base64 so exact match is tricky if the swatch HTML is old. 
            // It's safer to just clear active if we can't find a match, or assume the first one is default if we update HTML too.
            s.classList.remove('active');
            // Ideally we match by a data-id, but let's try to match the skycrapers URL if it's still in the HTML
            if (s.dataset.image.includes('skyscrapers') || s.dataset.image === defaultImage) {
                s.classList.add('active');
            }
        });

        // Ensure colors are deselected in UI
        themeSwatches.forEach(s => s.classList.remove('active'));
        document.getElementById('customColorInput').parentElement.classList.remove('active');
        document.body.className = ''; // Reset body theme

        render();
        saveData();
        showFeedback('Mallen har återställts!');

        setTimeout(() => window.location.reload(), 500);
    }
};



const syncThemeVariables = () => {
    const comp = getComputedStyle(previews.container);
    const color = comp.getPropertyValue('--theme-color').trim();
    const light = comp.getPropertyValue('--theme-light').trim();
    if (color) document.documentElement.style.setProperty('--theme-color', color);
    if (light) document.documentElement.style.setProperty('--theme-light', light);
};

const updateVisibilityUI = () => {
    if (!cvData.visibility) cvData.visibility = { ...DEFAULT_VISIBILITY };
    Object.keys(cvData.visibility).forEach(key => {
        const sectionEl = sections[key];
        const previewEl = previewSections[key];

        if (sectionEl) {
            sectionEl.classList.toggle('section-dimmed', !cvData.visibility[key]);
        }
        if (previewEl) {
            previewEl.classList.toggle('hidden', !cvData.visibility[key]);
        }
    });
};

const updateProgressDots = () => {
    const dots = {
        personal: document.getElementById('progress-personal'),
        experience: document.getElementById('progress-experience'),

        education: document.getElementById('progress-education'),
        skills: document.getElementById('progress-skills'),
        certs: document.getElementById('progress-certs'),
        certs: document.getElementById('progress-certs'),
        languages: document.getElementById('progress-languages')
    };

    if (dots.personal) dots.personal.classList.toggle('active', !!(cvData.personal?.name || cvData.personal?.profile));
    if (dots.experience && cvData.experiences) dots.experience.classList.toggle('active', cvData.experiences.length > 0);

    if (dots.education && cvData.education) dots.education.classList.toggle('active', cvData.education.length > 0);
    if (dots.skills && cvData.skills) dots.skills.classList.toggle('active', cvData.skills.length > 0);
    if (dots.certs && cvData.certs) dots.certs.classList.toggle('active', cvData.certs.length > 0);
    if (dots.languages && cvData.languages) dots.languages.classList.toggle('active', cvData.languages.length > 0);
};


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
                header.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${base64Url}')`;
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
    const currentImage = localStorage.getItem('cvBuilderHeaderImage') || 'none';

    // Even if style is "solid" (removed), we MUST respect the background image layout mode (Banner).
    if (currentImage !== 'none') {
        header.classList.add('header-banner');
    } else {
        header.classList.remove('header-banner');
    }
}






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
        picContainer.classList.remove('shape-circle', 'shape-rounded', 'shape-squircle', 'shape-square', 'shape-diamond');
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
buttons.addExperience.addEventListener('click', async () => {
    const { expTitle, expCompany, expLocation, expStartMonth, expStartYear, expEndMonth, expEndYear, expCurrent, expDesc, expLogo } = inputs;
    if (!expTitle.value.trim() || !expCompany.value.trim()) { showFeedback('Titel och företag krävs', true); return; }

    // Format professional years string
    let yearsStr = `${expStartMonth.value} ${expStartYear.value} — `;
    if (expCurrent.checked) {
        yearsStr += 'Nuvarande';
    } else if (expEndMonth.value && expEndYear.value) {
        yearsStr += `${expEndMonth.value} ${expEndYear.value}`;
    } else {
        yearsStr += '...';
    }

    // Combine company and location if provided
    const companyStr = expLocation.value.trim() ? `${expCompany.value.trim()}, ${expLocation.value.trim()}` : expCompany.value.trim();

    const expData = {
        title: expTitle.value.trim(),
        company: companyStr,
        years: yearsStr,
        desc: expDesc.value.trim(),
        // Raw data for editing later
        raw: {
            company: expCompany.value.trim(),
            location: expLocation.value.trim(),
            startMonth: expStartMonth.value,
            startYear: expStartYear.value,
            endMonth: expEndMonth.value,
            endYear: expEndYear.value,
            current: expCurrent.checked
        }
    };

    if (inputs.editingExperienceId) {
        const i = cvData.experiences.findIndex(e => e.id === inputs.editingExperienceId);
        if (i > -1) {
            const logoSrc = expLogo.files[0] ? await resizeImage(expLogo.files[0], 200) : cvData.experiences[i].logo;
            cvData.experiences[i] = { ...cvData.experiences[i], ...expData, logo: logoSrc };
        }
        inputs.editingExperienceId = null; buttons.addExperience.textContent = "Spara erfarenhet";
    } else {
        const logoSrc = expLogo.files[0] ? await resizeImage(expLogo.files[0], 200) : 'placeholder_logo.png';
        cvData.experiences.push({ id: `exp-${Date.now()}`, ...expData, logo: logoSrc });
    }

    // Reset inputs
    [expTitle, expCompany, expLocation, expStartMonth, expStartYear, expEndMonth, expEndYear, expDesc, expLogo].forEach(el => el.value = '');
    expCurrent.checked = false;
    document.querySelector('.end-date-group').classList.remove('disabled');
    inputs.expLogoLabel.textContent = "Ladda upp företagslogotyp";
    document.querySelector('.custom-file-upload').classList.remove('has-file');

    render();
    showFeedback('Erfarenhet sparad');
});

buttons.addEducation.addEventListener('click', () => {
    const { eduDegree, eduSchool, eduLocation, eduStartMonth, eduStartYear, eduEndMonth, eduEndYear, eduCurrent } = inputs;
    if (!eduDegree.value.trim() || !eduSchool.value.trim()) { showFeedback('Examen och skola krävs', true); return; }

    let yearsStr = `${eduStartMonth.value} ${eduStartYear.value} — `;
    if (eduCurrent.checked) {
        yearsStr += 'Nuvarande';
    } else if (eduEndMonth.value && eduEndYear.value) {
        yearsStr += `${eduEndMonth.value} ${eduEndYear.value}`;
    } else {
        yearsStr += '...';
    }

    const schoolStr = eduLocation.value.trim() ? `${eduSchool.value.trim()}, ${eduLocation.value.trim()}` : eduSchool.value.trim();

    const eduData = {
        degree: eduDegree.value.trim(),
        school: schoolStr,
        years: yearsStr,
        raw: {
            school: eduSchool.value.trim(),
            location: eduLocation.value.trim(),
            startMonth: eduStartMonth.value,
            startYear: eduStartYear.value,
            endMonth: eduEndMonth.value,
            endYear: eduEndYear.value,
            current: eduCurrent.checked
        }
    };

    if (inputs.editingEducationId) {
        const i = cvData.education.findIndex(e => e.id === inputs.editingEducationId);
        if (i > -1) {
            cvData.education[i] = { ...cvData.education[i], ...eduData };
        }
        inputs.editingEducationId = null; buttons.addEducation.textContent = "Spara utbildning";
    } else {
        cvData.education.push({ id: `edu-${Date.now()}`, ...eduData });
    }

    [eduDegree, eduSchool, eduLocation, eduStartMonth, eduStartYear, eduEndMonth, eduEndYear].forEach(el => el.value = '');
    eduCurrent.checked = false;
    // Note: Finding the exact toggle/end-group might need better targeting if multiple are added
    document.querySelectorAll('.end-date-group')[1].classList.remove('disabled');

    render();
    showFeedback('Utbildning sparad');
});

const addGenericItem = (input, dataArray, typeName, editIdxKey, btnEl, transformFn = val => val) => {
    const value = input.value.trim();
    if (value) {
        if (inputs[editIdxKey] !== null) {
            dataArray[inputs[editIdxKey]] = transformFn(value);
            inputs[editIdxKey] = null;
            btnEl.innerHTML = '<i class="fas fa-plus"></i> Lägg till';
            showFeedback(`${typeName} uppdaterad.`);
        } else {
            dataArray.push(transformFn(value));
            showFeedback(`${typeName} tillagd.`);
        }
        input.value = '';
        render();
    }
};
buttons.addSkill.addEventListener('click', () => addGenericItem(inputs.skill, cvData.skills, 'Färdighet', 'editingSkillIdx', buttons.addSkill));
buttons.addCert.addEventListener('click', () => addGenericItem(inputs.cert, cvData.certs, 'Behörighet', 'editingCertIdx', buttons.addCert));
buttons.addLanguage.addEventListener('click', () => {
    const value = inputs.language.value.trim();
    const level = inputs.languageLevel.value;
    const code = inputs.language.dataset.code;

    if (value) {
        // Store as "code:Name (Level)" for internal use
        const base = level ? `${value} (${level})` : value;
        const langString = code ? `${code}:${base}` : base;

        if (inputs.editingLanguageIdx !== null) {
            cvData.languages[inputs.editingLanguageIdx] = langString;
            inputs.editingLanguageIdx = null;
            buttons.addLanguage.innerHTML = '<i class="fas fa-plus"></i> Lägg till';
            showFeedback('Språk uppdaterat.');
        } else {
            cvData.languages.push(langString);
            showFeedback('Språk tillagt.');
        }

        // Clear state
        inputs.language.value = '';
        inputs.languageLevel.value = '';
        inputs.language.dataset.code = '';
        inputs.languageFlagPreview.style.display = 'none';
        inputs.languageWrapper.classList.remove('has-flag');

        render();
    }
});

// Enter key support for sidebar management inputs
[
    { input: inputs.skill, btn: buttons.addSkill },
    { input: inputs.cert, btn: buttons.addCert },
    { input: inputs.language, btn: buttons.addLanguage }
].forEach(({ input, btn }) => {
    input?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            btn.click();
        }
    });
});

// Click handling for ALL sidebar management lists (Edit & Delete)
[previews.sidebarLanguages, previews.sidebarSkills, previews.sidebarCerts].forEach(list => {
    list?.addEventListener('click', e => {
        const btn = e.target.closest('button');
        if (!btn) return;
        const idx = parseInt(btn.dataset.index, 10);
        const type = list === previews.sidebarLanguages ? 'languages' :
            list === previews.sidebarSkills ? 'skills' : 'certs';

        if (btn.classList.contains('delete-btn')) {
            if (cvData[type] && !isNaN(idx)) {
                cvData[type].splice(idx, 1);
                // Reset edit states if we delete the item we are editing
                if (type === 'languages' && idx === inputs.editingLanguageIdx) inputs.editingLanguageIdx = null;
                if (type === 'skills' && idx === inputs.editingSkillIdx) inputs.editingSkillIdx = null;
                if (type === 'certs' && idx === inputs.editingCertIdx) inputs.editingCertIdx = null;
                render(); saveData(); showFeedback('Objekt borttaget.');
            }
        }

        if (btn.classList.contains('edit-btn')) {
            if (!cvData[type] || isNaN(idx)) return;
            const val = cvData[type][idx];
            const accordion = list.closest('details');
            if (accordion && !accordion.open) accordion.querySelector('summary').click();

            if (type === 'skills') {
                inputs.skill.value = val;
                inputs.editingSkillIdx = idx;
                buttons.addSkill.innerHTML = '<i class="fas fa-save"></i> Uppdatera';
                inputs.skill.focus();
            } else if (type === 'certs') {
                inputs.cert.value = val;
                inputs.editingCertIdx = idx;
                buttons.addCert.innerHTML = '<i class="fas fa-save"></i> Uppdatera';
                inputs.cert.focus();
            } else if (type === 'languages') {
                let display = val;
                if (val.includes(':')) {
                    const [code, rest] = val.split(':', 2);
                    inputs.language.dataset.code = code;
                    const flagUrl = `https://flagcdn.com/w40/${code}.png`;
                    inputs.languageFlagPreview.innerHTML = `<img src="${flagUrl}" alt="">`;
                    inputs.languageFlagPreview.style.display = 'flex';
                    inputs.languageWrapper.classList.add('has-flag');
                    display = rest;
                } else {
                    inputs.language.dataset.code = '';
                    inputs.languageFlagPreview.style.display = 'none';
                    inputs.languageWrapper.classList.remove('has-flag');
                }

                // Split "Name (Level)"
                const levelMatch = display.match(/\(([^)]+)\)$/);
                if (levelMatch) {
                    inputs.language.value = display.replace(levelMatch[0], '').trim();
                    inputs.languageLevel.value = levelMatch[1];
                } else {
                    inputs.language.value = display;
                    inputs.languageLevel.value = '';
                }

                inputs.editingLanguageIdx = idx;
                buttons.addLanguage.innerHTML = '<i class="fas fa-save"></i> Uppdatera';
                inputs.language.focus();
            }
            accordion.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// --- SMART SORTER ---
const monthMapShort = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, Maj: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Okt: 10, Nov: 11, Dec: 12 };
const sortItemsByDate = (type) => {
    if (!cvData[type]) return;
    cvData[type].sort((a, b) => {
        const getVal = (item) => {
            if (item.raw?.current) return 999999;
            const year = parseInt(item.raw?.endYear) || 0;
            const month = monthMapShort[item.raw?.endMonth] || 0;
            return year * 100 + month;
        };
        const getStartVal = (item) => {
            const year = parseInt(item.raw?.startYear) || 0;
            const month = monthMapShort[item.raw?.startMonth] || 0;
            return year * 100 + month;
        };
        const valA = getVal(a); const valB = getVal(b);
        if (valB !== valA) return valB - valA;
        return getStartVal(b) - getStartVal(a);
    });
    render(); saveData(); showFeedback('Sorterat kronologiskt');
};

buttons.sortExperience?.addEventListener('click', () => sortItemsByDate('experiences'));
buttons.sortEducation?.addEventListener('click', () => sortItemsByDate('education'));

[previews.container, previews.formExperience, previews.formEducation].forEach(container => {
    container?.addEventListener('click', e => {
        const button = e.target.closest('button'); if (!button) return;
        const { id } = button.dataset;
        const itemEl = button.closest('[data-type]');
        const type = button.dataset.type || (itemEl ? itemEl.dataset.type : null);
        const index = parseInt(button.dataset.index, 10);

        if (button.classList.contains('delete-btn') || button.classList.contains('skill-delete-btn')) {
            if (id) {
                if (id.startsWith('exp-')) cvData.experiences = cvData.experiences.filter(item => item.id !== id);
                if (id.startsWith('edu-')) cvData.education = cvData.education.filter(item => item.id !== id);


            } else if (type && !isNaN(index)) {
                if (cvData[type]) { cvData[type].splice(index, 1); }
            }
            render(); showFeedback('Objekt borttaget.');
        }
        if (button.classList.contains('edit-btn')) {
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
                        // Trigger toggle logic
                        const group = inputs.expEndMonth.closest('.end-date-group');
                        group.classList.toggle('disabled', inputs.expCurrent.checked);
                    } else {
                        // Fallback for legacy data
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
                        // Trigger toggle logic
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
});

// --- DRAG AND DROP ---
let dragSrcEl = null;

function handleDragStart(e) {
    if (!e.target.closest('[draggable="true"]')) return;
    dragSrcEl = e.target.closest('[draggable="true"]');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', dragSrcEl.innerHTML);
    dragSrcEl.classList.add('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDrop(e) {
    e.stopPropagation();
    e.preventDefault();
    const dropTarget = e.target.closest('[draggable="true"]');
    if (dragSrcEl && dropTarget && dragSrcEl !== dropTarget) {
        const type = dragSrcEl.dataset.type;
        const fromIndex = parseInt(dragSrcEl.dataset.index, 10);
        const toIndex = parseInt(dropTarget.dataset.index, 10);
        if (type && cvData[type] && !isNaN(fromIndex) && !isNaN(toIndex)) {
            const item = cvData[type].splice(fromIndex, 1)[0];
            cvData[type].splice(toIndex, 0, item);
            render();
            saveData();
        }
    }
    return false;
}

function handleDragEnd() {
    if (dragSrcEl) dragSrcEl.classList.remove('dragging');
    dragSrcEl = null;
}

[
    previews.experience,
    previews.education,
    previews.skills,
    previews.certs,
    previews.languages,
    previews.sidebarLanguages,
    previews.sidebarSkills,
    previews.sidebarCerts,
    previews.formExperience,
    previews.formEducation
].forEach(container => {
    if (container) {
        container.addEventListener('dragstart', handleDragStart);
        container.addEventListener('dragover', handleDragOver);
        container.addEventListener('drop', handleDrop);
        container.addEventListener('dragend', handleDragEnd);
    }
});


// --- UI EVENT LISTENERS ---

// 1. Content Management
// [REMOVED DUPLICATE LISTENERS - 1]

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

// [REMOVED DUPLICATE PHOTO INPUT - 2]

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
// [REMOVED DUPLICATE EDIT/DELETE - 3]


// --- THEME & STYLE SELECTION ---
// [REMOVED DUPLICATE THEME/STYLE - 4]

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
                    onclone: async (clonedDoc) => {
                        // HELPER: Rasterize CSS Filters & Blend Modes (Bake effects into pixels)
                        const rasterizeFilters = async (clone) => {
                            // Target Header AND Profile Pictures (force-select profile pic to be sure)
                            const images = clone.querySelectorAll('img.cv-profile-pic, .cv-header, img');

                            for (const el of images) {
                                // Skip if processed or not relevant (though querySelector handles mostly)
                                if (el.dataset.processed) continue;

                                try {
                                    const style = window.getComputedStyle(el);
                                    const filter = style.filter;
                                    const blendMode = style.backgroundBlendMode;
                                    const bgColor = style.backgroundColor;
                                    const isHeader = el.classList.contains('cv-header');
                                    const isProfile = el.classList.contains('cv-profile-pic');

                                    // --- STRATEGY 1: HEADER --- 
                                    // Removed manual rasterization to preserve CSS linear-gradient overlays
                                    // html2canvas handles the new composite background correctly.
                                    if (isHeader) {
                                        // Do nothing, let html2canvas render the computed background
                                    }
                                    // --- STRATEGY 2: STANDARD IMAGES (Profile Pic) ---
                                    else {
                                        // Force baking for profile pic OR if filters/blend modes exist
                                        const needsBaking = isProfile || (filter && filter !== 'none') || (blendMode && blendMode !== 'normal');

                                        if (needsBaking) {
                                            const src = el.src;
                                            if (src) {
                                                const img = new Image(); img.crossOrigin = 'Anonymous'; img.src = src;
                                                await new Promise(r => { img.onload = r; img.onerror = r; });

                                                const canvas = document.createElement('canvas');
                                                canvas.width = img.naturalWidth || el.clientWidth || 500;
                                                canvas.height = img.naturalHeight || el.clientHeight || 500;
                                                const ctx = canvas.getContext('2d');

                                                if (filter && filter !== 'none') ctx.filter = filter;
                                                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                                                if (blendMode && blendMode !== 'normal') {
                                                    ctx.globalCompositeOperation = blendMode;
                                                    ctx.fillStyle = bgColor || 'transparent';
                                                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                                                    ctx.globalCompositeOperation = 'source-over';
                                                }

                                                el.src = canvas.toDataURL('image/png');
                                                el.style.filter = 'none'; // Clear filter to avoid double application
                                                el.dataset.processed = 'true';
                                            }
                                        }
                                    }
                                } catch (e) {
                                    console.warn('Rasterization error for element', el, e);
                                }
                            }
                        };

                        // Execute Rasterization
                        await rasterizeFilters(clonedDoc);

                        const style = clonedDoc.createElement('style');
                        style.textContent = `
              /* === MINIMAL PDF EXPORT CSS === */
              /* Only disable animations and hide UI — everything else uses website CSS */

              *, *::before, *::after {
                animation: none !important;
                transition: none !important;
              }

              /* Hide editor UI */
              .sidebar, .app-header, .layout-control,
              .item-actions, .skill-delete-btn, .action-card,
              .actions-grid, .help-tooltip-wrapper, .help-icon {
                display: none !important;
              }

              /* Remove paper shadow for clean export */
              .cv-container {
                box-shadow: none !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }

              /* Ensure header pseudo-elements don't interfere (overlay is in background-image) */
              .cv-header::before,
              .cv-header::after {
                display: none !important;
              }
            `;
                        clonedDoc.head.appendChild(style);
                    }
                }
            })
            .from(element)
            .toCanvas()
            .get('canvas', (c) => { capturedCanvas = c; });

        if (!capturedCanvas) throw new Error('Canvas capture failed');

        // 4. Force Full Width in PDF (210mm)
        const imgData = capturedCanvas.toDataURL('image/jpeg', 0.98);
        const pdf = new jspdf.jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
            compress: true
        });

        const pdfWidth = 210; // A4 width in mm
        const pdfHeight = (capturedCanvas.height * pdfWidth) / capturedCanvas.width;

        // Shift 1mm left to crop the white strip, widen to compensate
        const bleed = 2; // mm
        pdf.addImage(imgData, 'JPEG', -bleed, 0, pdfWidth + bleed * 2, pdfHeight);

        pdf.save(`CV_${cvData.personal.name.replace(/\s+/g, '_')}.pdf`);

    } catch (err) {
        console.error(err);
        showFeedback('Kunde inte skapa PDF: ' + err.message, true);
    } finally {
        document.body.classList.remove('exporting-pdf');
        showFeedback('PDF skapad! Laddar ner...');
    }
};

buttons.exportPdf?.addEventListener('click', downloadPDF);

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize logic
    const initialize = () => {
        // Load from LocalStorage
        const savedData = localStorage.getItem('cvBuilderData');
        if (savedData) {
            try {
                cvData = JSON.parse(savedData);
                // Migration for missing fields if any
                if (!cvData.visibility) cvData.visibility = { ...DEFAULT_VISIBILITY };
            } catch (e) {
                console.error('Data load error', e);
            }
        }

        const savedTheme = localStorage.getItem('cvBuilderTheme') || DEFAULT_THEME;
        document.body.className = savedTheme !== 'custom' ? savedTheme : '';

        if (localStorage.getItem('cvBuilderCustomColor')) {
            const hex = localStorage.getItem('cvBuilderCustomColor');
            document.getElementById('customColorInput').value = hex;
            if (savedTheme === 'custom') {
                document.documentElement.style.setProperty('--theme-color', hex);
                document.documentElement.style.setProperty('--theme-light', generateLightVariant(hex));
                document.getElementById('customColorInput').parentElement.classList.add('active');
            }
        } else {
            // Activate swatch
            const activeSwatch = Array.from(themeSwatches).find(s => s.dataset.theme === savedTheme);
            if (activeSwatch) activeSwatch.classList.add('active');
        }

        // Fonts removed - default is Inter

        const savedLayout = localStorage.getItem('cvBuilderLayoutSwapped') === 'true';
        layoutToggle.checked = savedLayout;
        previews.container.classList.toggle('layout-swapped', savedLayout);

        // Header styles removed - default is solid
        const header = document.querySelector('.cv-header');

        const savedHeaderImage = localStorage.getItem('cvBuilderHeaderImage') || 'none';
        if (savedHeaderImage !== 'none') {
            header.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${savedHeaderImage}')`;
            header.classList.add('has-bg');
            // Try to activate swatch
            // This is tricky if it's a base64 string, so we might just leave swatches inactive or set 'none' inactive
        } else {
            // Default active
        }

        updateHeaderBaseline();
        updateVisibilityUI();
        render();
        updateProgressDots();
    };

    initialize();
});
