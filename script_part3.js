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
buttons.addExperience?.addEventListener('click', () => {
    const newExp = {
        id: `exp-${Date.now()}`,
        title: 'Ny Roll',
        company: 'Företag',
        years: '2023 - Nuvarande',
        desc: 'Beskriv din roll här...',
        logo: '',
        raw: { location: '', startMonth: '', startYear: '', endMonth: '', endYear: '', current: false }
    };
    cvData.experiences.unshift(newExp);
    render();
    saveData();
    if (sections.experience && !sections.experience.open) {
        sections.experience.open = true;
    }
});

buttons.addEducation?.addEventListener('click', () => {
    const newEdu = {
        id: `edu-${Date.now()}`,
        degree: 'Examen',
        school: 'Skola / Universitet',
        years: '2020 - 2023',
        raw: { location: '', startMonth: '', startYear: '', endMonth: '', endYear: '', current: false }
    };
    cvData.education.unshift(newEdu);
    render();
    saveData();
    if (sections.education && !sections.education.open) {
        sections.education.open = true;
    }
});

buttons.addSkill?.addEventListener('click', () => {
    const val = inputs.skill?.value.trim();
    if (val) {
        cvData.skills.push(val);
        inputs.skill.value = '';
        render();
        saveData();
    }
});

inputs.skill?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') buttons.addSkill.click();
});

buttons.addCert?.addEventListener('click', () => {
    const val = inputs.cert?.value.trim();
    if (val) {
        cvData.certs.push(val);
        inputs.cert.value = '';
        render();
        saveData();
    }
});

inputs.cert?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') buttons.addCert.click();
});

buttons.addLanguage?.addEventListener('click', () => {
    const name = inputs.language?.value.trim();
    const level = inputs.languageLevel?.value || '';
    const code = inputs.languageWrapper?.dataset.code || 'globe';
    if (name) {
        const langString = `${code}:${name} (${level})`;
        cvData.languages.push(langString);
        if (inputs.language) inputs.language.value = '';
        if (inputs.languageWrapper) inputs.languageWrapper.dataset.code = '';
        if (inputs.languageFlagPreview) inputs.languageFlagPreview.textContent = '🌐';
        render();
        saveData();
    }
});

buttons.sortExperience?.addEventListener('click', () => {
    cvData.experiences.sort((a, b) => {
        const isCurrentA = a.years.toLowerCase().includes('nuvarande');
        const isCurrentB = b.years.toLowerCase().includes('nuvarande');
        if (isCurrentA && !isCurrentB) return -1;
        if (!isCurrentA && isCurrentB) return 1;
        const yearA = parseInt(a.years.match(/\d{4}/)?.[0] || 0);
        const yearB = parseInt(b.years.match(/\d{4}/)?.[0] || 0);
