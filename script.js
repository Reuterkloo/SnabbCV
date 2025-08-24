document.addEventListener('DOMContentLoaded', () => {
  // ======== INITIAL DATA & STATE - NOW USING FILE PATHS ========
  // This version is for GitHub Pages and live servers.
  let cvData = {
    personal: {
      name: 'Richard Reuterkloo',
      email: 'richard@reuterkloo.com',
      phone: '070-1234567',
      profile: 'Engagerad och mångsidig professionell med över 10 års erfarenhet inom teknik och kundsupport. Stark förmåga att leda projekt, förbättra processer och leverera resultat i dynamiska miljöer. Passionerad för innovation och kontinuerlig utveckling.',
      photo: 'profile_photo.png' // Direct file path
    },
    experiences: [
      { id: `exp-${Date.now()}-1`, title: 'Supportledare', company: 'Teknikmagasinet', years: '2020 - Nuvarande', desc: 'Ledde ett team på 15 supportmedarbetare, ökade kundnöjdheten med 25%\nImplementerade ett nytt ticketing-system, minskade svarstider med 30%', logo: 'teknikmagasinet.png' },
      { id: `exp-${Date.now()}-2`, title: 'IT-Specialist', company: 'Keolis', years: '2016–2020', desc: 'Hanterade nätverksunderhåll för 500+ användare, minskade driftstopp med 15%\nUtbildade 200+ anställda i IT-säkerhet', logo: 'keolis.png' },
      { id: `exp-${Date.now()}-3`, title: 'Junior Tekniker', company: 'Ericsson', years: '2012–2016', desc: 'Stödde hårdvaruinstallationer, förbättrade effektivitet med 20%\nSamarbetade med ingenjörer för att lösa komplexa fel', logo: 'ericsson.png' }
    ],
    education: [{ id: `edu-${Date.now()}-1`, degree: "Kandidatexamen i datavetenskap", school: "KTH, Stockholm", years: "2009-2012" }],
    skills: ['Ledarskap', 'IT-Support', 'Projektledning', 'Kundservice'],
    certs: ['IT-Säkerhetscertifiering', 'Projektledning'],
    languages: ['Svenska (Modersmål)', 'Engelska (C1)']
  };

  // --- DOM Elements ---
  const inputs = { name: document.getElementById('nameInput'), email: document.getElementById('emailInput'), phone: document.getElementById('phoneInput'), profile: document.getElementById('profileInput'), photo: document.getElementById('photoInput'), expTitle: document.getElementById('expTitleInput'), expCompany: document.getElementById('expCompanyInput'), expYears: document.getElementById('expYearsInput'), expDesc: document.getElementById('expDescInput'), expLogo: document.getElementById('expLogoInput'), eduDegree: document.getElementById('eduDegreeInput'), eduSchool: document.getElementById('eduSchoolInput'), eduYears: document.getElementById('eduYearsInput'), skill: document.getElementById('skillInput'), cert: document.getElementById('certInput'), language: document.getElementById('languageInput'), languageLevel: document.getElementById('languageLevel'), editingExperienceId: null, editingEducationId: null };
  const previews = { container: document.getElementById('cv-preview'), name: document.getElementById('previewName'), email: document.getElementById('previewEmail'), phone: document.getElementById('previewPhone'), profile: document.getElementById('previewProfile'), profilePic: document.getElementById('previewProfilePic'), experience: document.getElementById('previewExperience'), education: document.getElementById('previewEducation'), skills: document.getElementById('previewSkills'), certs: document.getElementById('previewCerts'), languages: document.getElementById('previewLanguages') };
  const buttons = { addExperience: document.getElementById('addExperienceBtn'), addEducation: document.getElementById('addEducationBtn'), addSkill: document.getElementById('addSkillBtn'), addCert: document.getElementById('addCertBtn'), addLanguage: document.getElementById('addLanguageBtn'), exportPdf: document.getElementById('exportPdfBtn'), exportJson: document.getElementById('exportJsonBtn'), importJson: document.getElementById('importJsonBtn'), importJsonInput: document.getElementById('importJsonInput') };
  const themeSelect = document.getElementById('themeSelect');
  const allThemeClasses = Array.from(themeSelect.options).map(o => o.value);
  const accordions = document.querySelectorAll('.sidebar details');

  // --- UTILITY FUNCTIONS ---
  const debounce = (func, wait) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => func.apply(this, a), wait); }; };
  const showFeedback = (msg, isErr = false) => { const f = document.createElement('div'); f.textContent = msg; f.className = `feedback ${isErr ? 'error' : 'success'}`; document.body.appendChild(f); setTimeout(() => f.remove(), 3000); };
  const toBase64 = file => new Promise((res, rej) => { const r = new FileReader(); r.readAsDataURL(file); r.onload = () => res(r.result); r.onerror = e => rej(e); });

  // --- RENDER FUNCTION (THE CORE) ---
  function render() {
      previews.name.textContent = cvData.personal.name || 'Ditt namn'; previews.email.textContent = cvData.personal.email || 'E-post'; previews.email.href = cvData.personal.email ? `mailto:${cvData.personal.email}` : '#'; previews.phone.textContent = cvData.personal.phone || 'Telefon'; previews.phone.href = cvData.personal.phone ? `tel:${cvData.personal.phone}` : '#'; previews.profile.textContent = cvData.personal.profile; previews.profilePic.src = cvData.personal.photo;
      const toggle = (el, has) => { if (el) el.parentElement.style.display = has ? 'block' : 'none'; };
      
      previews.experience.innerHTML = ''; toggle(previews.experience, cvData.experiences.length > 0);
      cvData.experiences.forEach(exp => { const item = document.createElement('div'); item.className = 'experience-item editable-item'; item.innerHTML = `<div class="item-header"><img src="${exp.logo}" alt="${exp.company}" class="company-logo"><div class="text-content"><div class="title-company"><span class="title">${exp.title}</span><span class="company">${exp.company}</span></div></div><span class="years">${exp.years}</span></div><ul>${exp.desc.split('\n').filter(l => l.trim()).map(l => `<li>${l}</li>`).join('')}</ul><div class="item-actions"><button class="edit-btn" data-id="${exp.id}">&#9998;</button><button class="delete-btn" data-id="${exp.id}">🗑️</button></div>`; previews.experience.appendChild(item); });
      
      previews.education.innerHTML = ''; toggle(previews.education, cvData.education.length > 0);
      cvData.education.forEach(edu => { const d = document.createElement('div'); d.className = 'education-item editable-item'; d.innerHTML = `<div class="item-header"><div class="text-content"><span class="title">${edu.degree}</span>, <span class="school">${edu.school}</span></div>${edu.years ? `<span class="years">${edu.years}</span>` : ''}<div class="item-actions"><button class="edit-btn" data-id="${edu.id}">&#9998;</button><button class="delete-btn" data-id="${edu.id}">🗑️</button></div></div>`; previews.education.appendChild(d); });
      
      previews.skills.innerHTML = ''; toggle(previews.skills, cvData.skills.length > 0);
      cvData.skills.forEach((skill, i) => { const s = document.createElement('span'); s.innerHTML = `${skill} <button class="delete-btn skill-delete-btn" data-index="${i}" data-type="skills">x</button>`; previews.skills.appendChild(s); });
      
      const createList = (c, items, type) => { c.innerHTML = ''; toggle(c, items.length > 0); items.forEach((item, i) => { const li = document.createElement('li'); li.innerHTML = `<span>${item}</span><div class="item-actions"><button class="delete-btn" data-index="${i}" data-type="${type}">🗑️</button></div>`; c.appendChild(li); }); };
      createList(previews.certs, cvData.certs, 'certs'); createList(previews.languages, cvData.languages, 'languages');
  }

  // --- EVENT HANDLERS ---
  const handlePersonalInfoUpdate = debounce(() => { cvData.personal.name = inputs.name.value; cvData.personal.email = inputs.email.value; cvData.personal.phone = inputs.phone.value; cvData.personal.profile = inputs.profile.value; render(); }, 300);
  [inputs.name, inputs.email, inputs.phone, inputs.profile].forEach(i => i.addEventListener('input', handlePersonalInfoUpdate));
  inputs.photo.addEventListener('change', async e => { if (e.target.files[0]) { cvData.personal.photo = await toBase64(e.target.files[0]); render(); } });

  buttons.addExperience.addEventListener('click', async () => {
    const { expTitle, expCompany, expYears, expDesc, expLogo } = inputs;
    if (!expTitle.value.trim() || !expCompany.value.trim()) { showFeedback('Titel och företag krävs', true); return; }
    
    if (inputs.editingExperienceId) {
        const i = cvData.experiences.findIndex(e => e.id === inputs.editingExperienceId);
        const logoSrc = expLogo.files[0] ? await toBase64(expLogo.files[0]) : cvData.experiences[i].logo;
        if (i > -1) cvData.experiences[i] = { ...cvData.experiences[i], title: expTitle.value.trim(), company: expCompany.value.trim(), years: expYears.value.trim(), desc: expDesc.value.trim(), logo: logoSrc };
        inputs.editingExperienceId = null; buttons.addExperience.textContent = "Lägg till erfarenhet";
    } else {
        const logoSrc = expLogo.files[0] ? await toBase64(expLogo.files[0]) : 'teknikmagasinet.png';
        cvData.experiences.push({ id: `exp-${Date.now()}`, title: expTitle.value.trim(), company: expCompany.value.trim(), years: expYears.value.trim(), desc: expDesc.value.trim(), logo: logoSrc });
    }
    [expTitle, expCompany, expYears, expDesc, expLogo].forEach(el => el.value = ''); render(); showFeedback('Erfarenhet sparad');
  });

  buttons.addEducation.addEventListener('click', () => { /* ... existing code ... */ });
  buttons.addSkill.addEventListener('click', ()=>{if(inputs.skill.value.trim()){cvData.skills.push(inputs.skill.value.trim());inputs.skill.value='';render();}});
  buttons.addCert.addEventListener('click', ()=>{if(inputs.cert.value.trim()){cvData.certs.push(inputs.cert.value.trim());inputs.cert.value='';render();}});
  buttons.addLanguage.addEventListener('click', ()=>{if(inputs.language.value.trim()){cvData.languages.push(`${inputs.language.value.trim()} (${inputs.languageLevel.value})`);inputs.language.value='';render();}});

  previews.container.addEventListener('click', e => { /* ... existing code ... */ });
  accordions.forEach(acc => { acc.addEventListener('toggle', () => { if (acc.open) { accordions.forEach(other => { if (other !== acc) other.open = false; }); } }); });
  themeSelect.addEventListener('change', e => { previews.container.classList.remove(...allThemeClasses); previews.container.classList.add(e.target.value); document.documentElement.style.setProperty('--theme-color', getComputedStyle(previews.container).getPropertyValue('--theme-color').trim()); });
  
  buttons.exportPdf.addEventListener('click', () => { /* ... existing code ... */ });
  buttons.exportJson.addEventListener('click', () => { /* ... existing code ... */ });
  buttons.importJson.addEventListener('click', () => { buttons.importJsonInput.click(); });
  buttons.importJsonInput.addEventListener('change', (e) => { /* ... existing code ... */ });

  function initialize() {
    inputs.name.value = cvData.personal.name; inputs.email.value = cvData.personal.email; inputs.phone.value = cvData.personal.phone; inputs.profile.value = cvData.personal.profile;
    themeSelect.value = 'theme-blue'; document.documentElement.style.setProperty('--theme-color', '#007BFF');
    render();
  }
  initialize();
});