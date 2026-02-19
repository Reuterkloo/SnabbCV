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
        profile: 'Erfaren och lösningsorienterad professionell med fokus på att skapa värde genom samarbete och innovation. Jag strävar alltid efter att utvecklas och bidra till teamets framgång genom ett proaktivt arbetssätt och stark kommunikationsförmåga. Denna mall är skapad för att hjälpa dig presentera din resa på ett stilrent och professionellt sätt.',
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
    certs: ['Certifierad Projektledare (PMP)', 'Agile Coach Certification'],
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
            header.style.setProperty('background-image', `url('${b64}')`, 'important');
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
