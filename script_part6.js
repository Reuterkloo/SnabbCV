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

const pdfWidth = 210;
const pdfHeight = (capturedCanvas.height * pdfWidth) / capturedCanvas.width;

pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
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

        const savedFont = localStorage.getItem('cvBuilderFont') || DEFAULT_FONT;
        previews.container.classList.add(savedFont);
        const activeFontSwatch = Array.from(fontSwatches).find(s => s.dataset.font === savedFont);
        if (activeFontSwatch) activeFontSwatch.classList.add('active');

        const savedLayout = localStorage.getItem('cvBuilderLayoutSwapped') === 'true';
        layoutToggle.checked = savedLayout;
        previews.container.classList.toggle('layout-swapped', savedLayout);

        const savedHeaderStyle = localStorage.getItem('cvBuilderHeaderStyle') || 'solid';
        const header = document.querySelector('.cv-header');
        if (savedHeaderStyle !== 'solid') header.classList.add(`style-${savedHeaderStyle}`);
        const activeStyleSwatch = Array.from(headerStyleSwatches).find(s => s.dataset.style === savedHeaderStyle);
        if (activeStyleSwatch) activeStyleSwatch.classList.add('active');
        else headerStyleSwatches[0].classList.add('active'); // fallback

        const savedHeaderImage = localStorage.getItem('cvBuilderHeaderImage') || 'none';
        if (savedHeaderImage !== 'none') {
            header.style.backgroundImage = `url('${savedHeaderImage}')`;
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
