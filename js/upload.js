document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const previewContainer = document.getElementById('preview-container');
    const previewImage = document.getElementById('preview-image');
    const analyzeBtn = document.getElementById('analyze-btn');
    const fileSelect = document.querySelector('.file-select');

    // Particle Background Effect
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.classList.add('background-particles');
        document.body.appendChild(particlesContainer);

        const particleCount = window.innerWidth < 768 ? 10 : 20;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            // Random sizing
            const size = Math.random() * 50 + 10;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            // Random positioning
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;

            // Random animation delay and duration
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particle.style.animationDuration = `${Math.random() * 10 + 5}s`;

            // Random opacity
            particle.style.opacity = Math.random() * 0.5 + 0.1;

            particlesContainer.appendChild(particle);
        }
    }

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop zone when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    // Handle dropped files
    dropZone.addEventListener('drop', handleDrop, false);

    // Handle file selection via click
    fileSelect.addEventListener('click', () => {
        fileInput.click();
    });

    // Handle file input change
    fileInput.addEventListener('change', handleFiles, false);

    // Analyze button click
    analyzeBtn.addEventListener('click', () => {
        alert('Analiz işlemi başlatılıyor... (Gerçek analiz için backend gereklidir)');
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight() {
        dropZone.classList.add('drag-over');
    }

    function unhighlight() {
        dropZone.classList.remove('drag-over');
    }

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    function handleFiles(files) {
        // If called from file input, get files from event
        files = files.target ? files.target.files : files;
        
        if (files.length > 0) {
            const file = files[0];
            
            // Check file type
            if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
                alert('Lütfen JPG, PNG veya WEBP formatında bir görsel seçin.');
                return;
            }

            // Preview image
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImage.src = e.target.result;
                previewContainer.style.display = 'block';
                dropZone.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    }

    // Create particle background
    createParticles();

    // Recreate particles on window resize
    window.addEventListener('resize', () => {
        const existingParticles = document.querySelector('.background-particles');
        if (existingParticles) {
            existingParticles.remove();
        }
        createParticles();
    });
}); 