document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const processBtn = document.getElementById('process-btn');
    const loader = document.getElementById('loader');
    const uploadStep = document.getElementById('upload-step');
    const results = document.getElementById('results');
    const addValueInput = document.getElementById('add-value');

    let selectedFile = null;

    // File selection logic
    dropZone.onclick = () => fileInput.click();
    
    fileInput.onchange = (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    };

    dropZone.ondragover = (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--primary)';
    };

    dropZone.ondragleave = () => {
        dropZone.style.borderColor = 'var(--border)';
    };

    dropZone.ondrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    function handleFile(file) {
        selectedFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            dropZone.innerHTML = `
                <img src="${e.target.result}" style="max-height: 150px; border-radius: 8px; margin-bottom: 1rem;">
                <h3>${file.name} Yüklendi</h3>
                <p style="color: var(--accent);">Görsel işlenmeye hazır</p>
            `;
        };
        reader.readAsDataURL(file);
        dropZone.style.borderColor = 'var(--accent)';
    }

    processBtn.onclick = () => {
        const valToUpdate = parseFloat(addValueInput.value);
        
        if (!selectedFile) {
            alert('Lütfen bir sayaç görseli yükleyin.');
            return;
        }
        if (isNaN(valToUpdate)) {
            alert('Lütfen geçerli bir sayı girin.');
            return;
        }

        uploadStep.style.display = 'none';
        loader.style.display = 'block';

        // Read the file again for the result view
        const reader = new FileReader();
        reader.onload = (e) => {
            setTimeout(() => {
                simulateProcessing(valToUpdate, e.target.result);
            }, 2500);
        };
        reader.readAsDataURL(selectedFile);
    };

    function simulateProcessing(addedVal, imageSrc) {
        // Gerçek versiyonda burası AI API'den gelen veriyi alacak
        const baseVal = 2289.79; 
        const total = baseVal + addedVal;

        document.getElementById('read-val').innerText = baseVal.toFixed(2).replace('.', ',') + ' m³';
        document.getElementById('final-val').innerText = total.toFixed(3).replace('.', ',') + ' m³';

        loader.style.display = 'none';
        results.style.display = 'block';

        const imgContainer = document.getElementById('image-container');
        imgContainer.innerHTML = `
            <div style="position: relative; overflow: hidden; border-radius: 12px; border: 1px solid var(--border);">
                <img src="${imageSrc}" class="image-preview" style="filter: brightness(0.7);">
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(2px);">
                    <div style="background: var(--primary); color: white; padding: 0.5rem 1rem; border-radius: 8px; font-weight: 600; margin-bottom: 1rem; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.5);">
                        YENİ DEĞER: ${total.toFixed(2).replace('.', ',')} m³
                    </div>
                    <p style="font-size: 0.8rem; color: #fff; opacity: 0.8; text-align: center; padding: 0 1rem;">
                        ✨ Yapay zeka düzenlenmiş fotoğrafı profilinize hazırlıyor...
                    </p>
                </div>
            </div>
            <p style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-muted); text-align: center;">
                Düzenlenmiş yüksek çözünürlüklü görseli <b>Antigravity AI</b> panelinden indirebilirsiniz.
            </p>
        `;
    }
});
