document.addEventListener('DOMContentLoaded', () => {
  // ======== INITIAL DATA & STATE ========
  let cvData = {
    personal: {
      name: 'Richard Reuterkloo',
      email: 'richard@demo.com',
      phone: '070-1234567',
      linkedin: 'https://linkedin.com/in/richard-reuterkloo',
      profile: 'Välkommen! Här kan du skapa ditt CV helt gratis med hjälp av min personliga mall. Jag har tagit fram den för att underlätta för dig att presentera din erfarenhet och dina styrkor på bästa sätt. Anpassa den enkelt, och jag hoppas att den hjälper dig att ta ett viktigt steg mot din nästa anställning!',
      photo: 'profile_photo.png'
    },
    experiences: [
      { id: `exp-${Date.now()}-1`, title: 'Systemtekniker', company: 'Trafikverket', years: '2021 - Nuvarande', desc: 'Beskriv här kort din roll och dina huvudsakliga ansvarsområden.\nNämn dina viktigaste prestationer eller projekt som du bidragit till.\nFyll i med relevant erfarenhet som stöder din ansökan.', logo: 'trafikverket_100.jpg' },
      { id: `exp-${Date.now()}-2`, title: 'Systemtekniker', company: 'CGI', years: '2014–2021', desc: 'Beskriv här kort din roll och dina huvudsakliga ansvarsområden.\nNämn dina viktigaste prestationer eller projekt som du bidragit till.\nFyll i med relevant erfarenhet som stöder din ansökan.', logo: 'cgi_100.jpg' },
      { id: `exp-${Date.now()}-3`, title: 'Teknisk supportspecialist', company: 'Hewlett-Packard', years: '2011–2013', desc: 'Beskriv här kort din roll och dina huvudsakliga ansvarsområden.\nNämn dina viktigaste prestationer eller projekt som du bidragit till.\nFyll i med relevant erfarenhet som stöder din ansökan.', logo: 'hewlett_100.jpg' }
    ],
    education: [{ id: `edu-${Date.now()}-1`, degree: "Datavetenskap", school: "Hogwarts University", years: "2008-2011" }],
    skills: ['Problemlösning', 'Kommunikation', 'Samarbetsförmåga', 'Kritiskt tänkande', 'Kreativitet', 'Initiativtagande'],
    certs: ['Hogwarts Diploma', 'House Cup Award', 'Hogwarts Honours'],
    languages: ['Svenska (Modersmål)', 'Engelska (C1)']
  };

  // --- DOM Elements ---
  const inputs = { name: document.getElementById('nameInput'), email: document.getElementById('emailInput'), phone: document.getElementById('phoneInput'), linkedin: document.getElementById('linkedinInput'), profile: document.getElementById('profileInput'), photo: document.getElementById('photoInput'), expTitle: document.getElementById('expTitleInput'), expCompany: document.getElementById('expCompanyInput'), expYears: document.getElementById('expYearsInput'), expDesc: document.getElementById('expDescInput'), expLogo: document.getElementById('expLogoInput'), eduDegree: document.getElementById('eduDegreeInput'), eduSchool: document.getElementById('eduSchoolInput'), eduYears: document.getElementById('eduYearsInput'), skill: document.getElementById('skillInput'), cert: document.getElementById('certInput'), language: document.getElementById('languageInput'), languageLevel: document.getElementById('languageLevel'), editingExperienceId: null, editingEducationId: null };
  const previews = { container: document.getElementById('cv-preview'), name: document.getElementById('previewName'), email: document.getElementById('previewEmail'), phone: document.getElementById('previewPhone'), linkedin: document.getElementById('previewLinkedin'), profile: document.getElementById('previewProfile'), profilePic: document.getElementById('previewProfilePic'), experience: document.getElementById('previewExperience'), education: document.getElementById('previewEducation'), skills: document.getElementById('previewSkills'), certs: document.getElementById('previewCerts'), languages: document.getElementById('previewLanguages') };
  const buttons = { addExperience: document.getElementById('addExperienceBtn'), addEducation: document.getElementById('addEducationBtn'), addSkill: document.getElementById('addSkillBtn'), addCert: document.getElementById('addCertBtn'), addLanguage: document.getElementById('addLanguageBtn'), exportPdf: document.getElementById('exportPdfBtn'), exportJson: document.getElementById('exportJsonBtn'), importJson: document.getElementById('importJsonBtn'), importJsonInput: document.getElementById('importJsonInput') };
  const themeSelect = document.getElementById('themeSelect');
  const layoutToggle = document.getElementById('layoutToggle');
  const accordions = document.querySelectorAll('.sidebar details');
  const charCount = document.getElementById('charCount');

  // --- UTILITY FUNCTIONS ---
  const debounce = (func, wait) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => func.apply(this, a), wait); }; };
  const showFeedback = (msg, isErr = false) => { const f = document.createElement('div'); f.textContent = msg; f.className = `feedback ${isErr ? 'error' : 'success'}`; document.body.appendChild(f); setTimeout(() => f.remove(), 3000); };
  const toBase64 = file => new Promise((res, rej) => { const r = new FileReader(); r.readAsDataURL(file); r.onload = () => res(r.result); r.onerror = e => rej(e); });

  // --- DATA & STATE MANAGEMENT ---
  const saveData = () => {
    localStorage.setItem('cvBuilderData', JSON.stringify(cvData));
    localStorage.setItem('cvBuilderLayoutSwapped', layoutToggle.checked);
    localStorage.setItem('cvBuilderTheme', themeSelect.value);
  };
  const loadData = () => {
    const data = localStorage.getItem('cvBuilderData');
    if (data) { cvData = JSON.parse(data); showFeedback('Data återställd från senaste sessionen.'); }
    const isSwapped = localStorage.getItem('cvBuilderLayoutSwapped') === 'true';
    layoutToggle.checked = isSwapped;
    previews.container.classList.toggle('layout-swapped', isSwapped);
  };

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
          linkedInSpan.textContent = linkedInUrl.replace(/^(https?:\/\/)?(www\.)?/, '');
          previews.linkedin.style.display = 'inline-flex';
      } else {
          previews.linkedin.href = '#';
          previews.linkedin.style.display = 'none';
      }

      previews.profile.textContent = cvData.personal.profile;
      previews.profilePic.src = cvData.personal.photo;

      const toggle = (el, has) => { const section = el.closest('.cv-section'); if(section) section.style.display = has ? 'block' : 'none'; };

      const createListItems = (container, items, type, renderFn) => {
        container.innerHTML = '';
        toggle(container, items.length > 0);
        items.forEach((item, index) => {
            const el = renderFn(item, index, type);
            el.setAttribute('draggable', true);
            el.dataset.index = index;
            el.dataset.type = type;
            container.appendChild(el);
        });
      };

      createListItems(previews.experience, cvData.experiences, 'experiences', (exp) => {
          const item = document.createElement('div'); item.className = 'experience-item editable-item'; item.dataset.id = exp.id;
          item.innerHTML = `<div class="item-header"><img src="${exp.logo}" alt="${exp.company}" class="company-logo"><div class="text-content"><div class="title-company"><span class="title">${exp.title}</span><span class="company">${exp.company}</span></div><span class="years">${exp.years}</span></div></div><ul>${exp.desc.split('\n').filter(l => l.trim()).map(l => `<li>${l}</li>`).join('')}</ul><div class="item-actions"><button class="edit-btn" data-id="${exp.id}">&#9998;</button><button class="delete-btn" data-id="${exp.id}">🗑️</button></div>`;
          return item;
      });

      createListItems(previews.education, cvData.education, 'education', (edu) => {
          const d = document.createElement('div'); d.className = 'education-item editable-item'; d.dataset.id = edu.id;
          d.innerHTML = `<div class="item-header"><div class="text-content"><span class="title">${edu.degree}</span>, <span class="school">${edu.school}</span></div>${edu.years ? `<span class="years">${edu.years}</span>` : ''}</div><div class="item-actions"><button class="edit-btn" data-id="${edu.id}">&#9998;</button><button class="delete-btn" data-id="${edu.id}">🗑️</button></div>`;
          return d;
      });

      createListItems(previews.skills, cvData.skills, 'skills', (skill, i) => {
          const s = document.createElement('span'); s.dataset.index = i;
          s.innerHTML = `${skill} <button class="delete-btn skill-delete-btn" data-index="${i}" data-type="skills">x</button>`;
          return s;
      });

      const createGenericList = (c, items, type) => {
        createListItems(c, items, type, (item, i) => {
            const li = document.createElement('li'); li.dataset.index = i;
            li.innerHTML = `<span>${item}</span><div class="item-actions"><button class="delete-btn" data-index="${i}" data-type="${type}">🗑️</button></div>`;
            return li;
        });
      };
      createGenericList(previews.certs, cvData.certs, 'certs');
      createGenericList(previews.languages, cvData.languages, 'languages');
      saveData();
  }

  // --- EVENT HANDLERS ---
  const handlePersonalInfoUpdate = debounce(() => {
    cvData.personal.name = inputs.name.value; cvData.personal.email = inputs.email.value; cvData.personal.phone = inputs.phone.value; cvData.personal.linkedin = inputs.linkedin.value;
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

  [inputs.name, inputs.email, inputs.phone, inputs.linkedin, inputs.profile].forEach(i => i.addEventListener('input', handlePersonalInfoUpdate));
  inputs.photo.addEventListener('change', async e => { if (e.target.files[0]) { try { cvData.personal.photo = await toBase64(e.target.files[0]); render(); showFeedback('Profilbild uppdaterad.'); } catch { showFeedback('Kunde inte ladda bilden.', true); } } });

  buttons.addExperience.addEventListener('click', async () => {
    const { expTitle, expCompany, expYears, expDesc, expLogo } = inputs;
    if (!expTitle.value.trim() || !expCompany.value.trim()) { showFeedback('Titel och företag krävs', true); return; }
    if (inputs.editingExperienceId) {
        const i = cvData.experiences.findIndex(e => e.id === inputs.editingExperienceId);
        if (i > -1) {
            const logoSrc = expLogo.files[0] ? await toBase64(expLogo.files[0]) : cvData.experiences[i].logo;
            cvData.experiences[i] = { ...cvData.experiences[i], title: expTitle.value.trim(), company: expCompany.value.trim(), years: expYears.value.trim(), desc: expDesc.value.trim(), logo: logoSrc };
        }
        inputs.editingExperienceId = null; buttons.addExperience.textContent = "Lägg till erfarenhet";
    } else {
        const logoSrc = expLogo.files[0] ? await toBase64(expLogo.files[0]) : 'placeholder_logo.png';
        cvData.experiences.push({ id: `exp-${Date.now()}`, title: expTitle.value.trim(), company: expCompany.value.trim(), years: expYears.value.trim(), desc: expDesc.value.trim(), logo: logoSrc });
    }
    [expTitle, expCompany, expYears, expDesc, expLogo].forEach(el => el.value = ''); render(); showFeedback('Erfarenhet sparad');
  });

  buttons.addEducation.addEventListener('click', () => {
    const { eduDegree, eduSchool, eduYears } = inputs;
    if (!eduDegree.value.trim() || !eduSchool.value.trim()) { showFeedback('Examen och skola krävs', true); return; }
    if (inputs.editingEducationId) { const i = cvData.education.findIndex(e => e.id === inputs.editingEducationId); if (i > -1) cvData.education[i] = { ...cvData.education[i], degree: eduDegree.value.trim(), school: eduSchool.value.trim(), years: eduYears.value.trim() }; inputs.editingEducationId = null; buttons.addEducation.textContent = "Uppdatera utbildning"; }
    else { cvData.education.push({ id: `edu-${Date.now()}`, degree: eduDegree.value.trim(), school: eduSchool.value.trim(), years: eduYears.value.trim() }); }
    [eduDegree, eduSchool, eduYears].forEach(el => el.value = ''); render(); showFeedback('Utbildning sparad');
  });

  const addGenericItem = (input, dataArray, typeName, transformFn = val => val) => {
      const value = input.value.trim();
      if (value) { dataArray.push(transformFn(value)); input.value = ''; render(); showFeedback(`${typeName} tillagd.`); }
  };
  buttons.addSkill.addEventListener('click', () => addGenericItem(inputs.skill, cvData.skills, 'Färdighet'));
  buttons.addCert.addEventListener('click', () => addGenericItem(inputs.cert, cvData.certs, 'Behörighet'));
  buttons.addLanguage.addEventListener('click', () => addGenericItem(inputs.language, cvData.languages, 'Språk', val => `${val} (${inputs.languageLevel.value})`));

  previews.container.addEventListener('click', e => {
    const button = e.target.closest('button'); if (!button) return;
    const { id, type } = button.dataset;
    const index = parseInt(button.dataset.index, 10);

    if (button.classList.contains('delete-btn')) {
        if (id) {
            if (id.startsWith('exp-')) cvData.experiences = cvData.experiences.filter(item => item.id !== id);
            if (id.startsWith('edu-')) cvData.education = cvData.education.filter(item => item.id !== id);
        } else if (type && !isNaN(index)) { if (cvData[type]) { cvData[type].splice(index, 1); } }
        render(); showFeedback('Objekt borttaget.');
    }
    if (button.classList.contains('edit-btn')) {
      if (id?.startsWith('exp-')) {
        const exp = cvData.experiences.find(item => item.id === id);
        if (exp) { const accordion = document.getElementById('accordion-experience'); if (!accordion.open) accordion.querySelector('summary').click(); inputs.expTitle.value = exp.title; inputs.expCompany.value = exp.company; inputs.expYears.value = exp.years; inputs.expDesc.value = exp.desc; inputs.editingExperienceId = id; buttons.addExperience.textContent = "Uppdatera erfarenhet"; accordion.scrollIntoView({ behavior: 'smooth' }); inputs.expTitle.focus(); }
      }
      if (id?.startsWith('edu-')) {
        const edu = cvData.education.find(item => item.id === id);
        if (edu) { const accordion = document.getElementById('accordion-education'); if (!accordion.open) accordion.querySelector('summary').click(); inputs.eduDegree.value = edu.degree; inputs.eduSchool.value = edu.school; inputs.eduYears.value = edu.years; inputs.editingEducationId = id; buttons.addEducation.textContent = "Uppdatera utbildning"; accordion.scrollIntoView({ behavior: 'smooth' }); inputs.eduDegree.focus(); }
      }
    }
  });

  // --- DRAG AND DROP ---
  let dragSrcEl = null;
  function handleDragStart(e) {
      if (!e.target.closest('[draggable="true"]')) return;
      dragSrcEl = e.target.closest('[draggable="true"]');
      e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/html', dragSrcEl.innerHTML); dragSrcEl.classList.add('dragging');
  }
  function handleDragOver(e) { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }
  function handleDrop(e) {
      e.stopPropagation(); e.preventDefault();
      const dropTarget = e.target.closest('[draggable="true"]');
      if (dragSrcEl && dropTarget && dragSrcEl !== dropTarget) {
          const type = dragSrcEl.dataset.type;
          const fromIndex = parseInt(dragSrcEl.dataset.index, 10);
          const toIndex = parseInt(dropTarget.dataset.index, 10);
          if (type && cvData[type] && !isNaN(fromIndex) && !isNaN(toIndex)) {
              const item = cvData[type].splice(fromIndex, 1)[0];
              cvData[type].splice(toIndex, 0, item); render();
          }
      }
      return false;
  }
  function handleDragEnd() { if(dragSrcEl) dragSrcEl.classList.remove('dragging'); dragSrcEl = null; }
  [previews.experience, previews.education, previews.skills, previews.certs, previews.languages].forEach(container => {
      container.addEventListener('dragstart', handleDragStart); container.addEventListener('dragover', handleDragOver);
      container.addEventListener('drop', handleDrop); container.addEventListener('dragend', handleDragEnd);
  });

  // --- UI CONTROLS ---
  accordions.forEach(acc => { acc.addEventListener('toggle', () => { if (acc.open) { accordions.forEach(other => { if (other !== acc) other.open = false; }); } }); });

  themeSelect.addEventListener('change', e => {
      const newTheme = e.target.value;
      previews.container.className = 'cv-container';
      previews.container.classList.add(newTheme);
      if (layoutToggle.checked) {
        previews.container.classList.add('layout-swapped');
      }
      const newThemeColor = getComputedStyle(previews.container).getPropertyValue('--theme-color').trim();
      document.documentElement.style.setProperty('--theme-color', newThemeColor);
      saveData();
  });

  layoutToggle.addEventListener('change', () => {
    previews.container.classList.toggle('layout-swapped', layoutToggle.checked);
    saveData();
  });

  // --- IMPORT / EXPORT ---
  buttons.exportPdf.addEventListener('click', () => {
    previews.container.classList.add('clean-preview');
    previews.container.scrollTop = 0;

    const nameForPdf = cvData.personal.name.trim() || 'CV'; // Use input name or default to 'CV'
    const fileNameForPdf = `${nameForPdf.replace(/\s+/g, '_')}_CV.pdf`; // Create filename

    html2canvas(previews.container, {
        scale: 3,
        useCORS: true,
        logging: false
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = canvas.height * pdfWidth / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, Math.min(imgHeight, pdfHeight));
      pdf.save(fileNameForPdf); // Use the dynamically generated filename
      showFeedback('PDF exporterad');
    }).catch(err => {
      showFeedback('PDF-export misslyckades: ' + err.message, true);
    }).finally(() => {
      previews.container.classList.remove('clean-preview');
    });
  });

  buttons.exportJson.addEventListener('click', () => {
    const dataStr = JSON.stringify(cvData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    const nameForJson = cvData.personal.name.trim() || 'CVData'; // Use input name or default
    const fileNameForJson = `${nameForJson.replace(/\s+/g, '_')}_Reuterkloo_CV.json`; // Create filename

    a.href = url;
    a.download = fileNameForJson; // Use the dynamically generated filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showFeedback('JSON data exporterad');
  });

  buttons.importJson.addEventListener('click', () => { buttons.importJsonInput.click(); });
  buttons.importJsonInput.addEventListener('change', (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result); cvData = importedData;
        initializeInputs(); render(); showFeedback('JSON data importerad');
      } catch (err) { showFeedback('Fel vid import av JSON: ' + err.message, true); }
    };
    reader.readAsText(file); e.target.value = '';
  });

  // --- INITIALIZATION ---
  function initializeInputs() {
    inputs.name.value = cvData.personal.name;
    inputs.email.value = cvData.personal.email;
    inputs.phone.value = cvData.personal.phone;
    inputs.linkedin.value = cvData.personal.linkedin || '';
    inputs.profile.value = cvData.personal.profile;
    charCount.textContent = `${inputs.profile.value.length}/500 tecken`;
  }

  function initialize() {
    loadData();
    initializeInputs();
    const defaultTheme = 'theme-modern-teal';
    const currentTheme = localStorage.getItem('cvBuilderTheme') || defaultTheme;
    themeSelect.value = currentTheme;
    previews.container.className = 'cv-container';
    previews.container.classList.add(currentTheme);

    if (layoutToggle.checked) {
        previews.container.classList.add('layout-swapped');
    }
    const themeColor = getComputedStyle(previews.container).getPropertyValue('--theme-color').trim();
    document.documentElement.style.setProperty('--theme-color', themeColor);
    render();
  }

  initialize();
});