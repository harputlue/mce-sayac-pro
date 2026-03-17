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
        dropZone.innerHTML = `
            <span class="upload-icon">✅</span>
            <h3>${file.name} Seçildi</h3>
            <p style="color: var(--accent);">Görsel işlenmeye hazır</p>
        `;
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

        // Simulating the process
        uploadStep.style.display = 'none';
        loader.style.display = 'block';

        // Bu aşamada gerçek bir uygulamada backend/AI servisine gidilir.
        // Burada kullanıcıya süreci simüle ediyoruz.
        setTimeout(() => {
            simulateProcessing(valToUpdate);
        }, 2000);
    };

    function simulateProcessing(addedVal) {
        // Normalde görselden okunacak değer. Örnek olarak son okuduğumuz değeri kullanıyoruz.
        const baseVal = 2289.79; 
        const total = baseVal + addedVal;

        document.getElementById('read-val').innerText = baseVal.toFixed(2).replace('.', ',') + ' m³';
        document.getElementById('final-val').innerText = total.toFixed(3).replace('.', ',') + ' m³';

        loader.style.display = 'none';
        results.style.display = 'block';

        // Not: Gerçek görsel oluşturma işlemi AI (Antigravity) tarafından yapılacaktır.
        // Web sayfası bu mantığı kurmanıza yardımcı olur.
        const imgContainer = document.getElementById('image-container');
        imgContainer.innerHTML = `<p style="padding: 2rem; background: rgba(255,255,255,0.05); border-radius: 12px; font-style: italic; color: var(--text-muted);">
            AI Tarafından oluşturulan yeni görsel buraya aktarılacak. 
            (Şu anki prototipte hesaplama mantığı ve UI gösterilmektedir.)
        </p>`;
    }
});
