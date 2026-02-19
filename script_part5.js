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

                // --- STRATEGY 1: HEADER (Snapshot + Overlay) ---
                if (isHeader) {
                    let src = style.backgroundImage.slice(4, -1).replace(/[\"\']/g, '');
                    if (!src || src === 'none' || src.startsWith('linear-gradient')) {
                        // fallback to data if needed, or skip
                        if (cvData && cvData.personal) src = cvData.personal.headerImage;
                    }

                    if (src && src !== 'none' && !src.startsWith('linear-gradient')) {
                        const img = new Image(); img.crossOrigin = 'Anonymous'; img.src = src;
                        await new Promise((resolve, reject) => {
                            img.onload = resolve;
                            img.onerror = resolve; // Continue even if fail
                        });

                        const canvas = document.createElement('canvas'); // Minimal dimensions if load fails
                        canvas.width = img.naturalWidth || 1200;
                        canvas.height = img.naturalHeight || 400;
                        const ctx = canvas.getContext('2d');

                        // 1. Determine Filters
                        const activeProfileFilter = (cvData && cvData.personal && cvData.personal.photoSettings)
                            ? cvData.personal.photoSettings.filter
                            : 'none';

                        let canvasFilter = 'brightness(1.1) contrast(0.95)';
                        let overlayColor = null;
                        let overlayBlend = 'source-over';

                        if (activeProfileFilter === 'grayscale') {
                            canvasFilter = 'grayscale(100%) brightness(1.1)';
                        } else if (activeProfileFilter === 'sepia') {
                            canvasFilter = 'sepia(100%) brightness(1.1)';
                        } else if (activeProfileFilter === 'vintage') {
                            canvasFilter = 'grayscale(100%) contrast(1.2) brightness(1.1)';
                        } else if (activeProfileFilter === 'soft') {
                            canvasFilter = 'saturate(1.2) contrast(0.9) brightness(1.2)';
                            overlayColor = 'rgba(255, 255, 255, 0.15)';
                        } else if (activeProfileFilter === 'none') {
                            canvasFilter = 'brightness(1.15) contrast(0.95)';
                        }

                        // 2. Draw
                        ctx.filter = canvasFilter;
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        ctx.filter = 'none';

                        // 3. Overlay
                        if (overlayColor) {
                            ctx.fillStyle = overlayColor;
                            ctx.globalCompositeOperation = overlayBlend;
                            ctx.fillRect(0, 0, canvas.width, canvas.height);
                            ctx.globalCompositeOperation = 'source-over';
                        }

                        // 4. Replace Header Background
                        const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
                        const newImg = clone.createElement('img');
                        newImg.src = dataUrl;
                        newImg.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; pointer-events: none;';

                        el.style.backgroundImage = 'none';
                        el.style.backgroundColor = 'transparent';
                        el.prepend(newImg);
                        el.dataset.processed = 'true';
                    }
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
              *, *::before, *::after {
                animation: none !important;
                transition: none !important;
                opacity: 1 !important;
                visibility: visible !important;
              }
              .sidebar, .app-header, .layout-control,
              .item-actions, .skill-delete-btn, .action-card,
              .actions-grid, .help-tooltip-wrapper, .help-icon {
                display: none !important;
              }
              /* 0. Global safe-box sizing for PDF */
              * { box-sizing: border-box !important; }

              /* 1. Container: Standard padding (10mm) for reliable alignment */
              .cv-container {
                width: 794px !important;
                min-height: unset !important;
                margin: 0 !important;
                padding: 10mm !important;
                overflow: hidden !important;
                box-shadow: none !important;
              }

              /* 2. Header: Full width bleed via negative margins + border-box */
              .cv-header, .cv-header.header-banner {
                /* Aggressive bleed (2mm overlap) to kill all white lines */
                width: calc(100% + 24mm) !important;
                margin: -10mm -12mm 6mm -12mm !important;
                /* Tall top padding for sky visibility */
                padding: 25mm 10mm 12mm 10mm !important; 
                box-shadow: none !important;
              }
              /* Manual Overlay Disabled: We now bake filters/blends into the image directly */
              .cv-header::before {
                display: none !important;
              }
              .cv-header::after {
                display: none !important; 
              }
              
              /* Ensure content sits above overlay and is centered */
              .cv-header .profile-info {
                position: relative !important;
                z-index: 2 !important;
                text-align: center !important;
                margin: 0 auto !important;
                flex: 1 !important;
              }
              .cv-header h1, .cv-header #previewProfile {
                position: relative !important;
                z-index: 2 !important;
                text-shadow: 0 1px 2px rgba(0,0,0,0.5) !important;
              }

              /* 3. Content Padding: None needed, container handles it */
              .contact-info, .cv-section.expertise-bar, .cv-content {
                padding: 0 !important;
                width: 100% !important;
              }

              /* 4. Body Compaction (Vertical Only) */
              .cv-section {
                margin-bottom: 0.3rem !important;
              }
              /* Typography tweaks */
              p, li, span, div {
                line-height: 1.25 !important;
              }
              h1 { margin-bottom: 0.1rem !important; line-height: 1.1 !important; }
              h3 { margin-top: 0.2rem !important; margin-bottom: 0.1rem !important; }
              h4 { margin-top: 0 !important; margin-bottom: 0 !important; }
              ul { margin-top: 0 !important; margin-bottom: 0 !important; }
              p { margin-bottom: 0.1rem !important; }
              .contact-info { margin-bottom: 0.4rem !important; }
              li { margin-bottom: 0 !important; }
            `;
    clonedDoc.head.appendChild(style);
}
