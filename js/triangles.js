class TriangleAnimation {
    constructor() {
        this.trianglesContainer = document.getElementById('triangles');
        this.triangleCount = 0;
        // PC: Reducido a 20 para que sea ligero.
        this.maxTriangles = 20; 
        this.isRunning = false;
    }

    init() {
        // --- BLOQUEO PARA MÓVILES ---
        // Si la pantalla es menor a 768px (celulares), cancelamos todo.
        if (window.innerWidth < 768) {
            return; // No se crea ni una sola partícula
        }

        // Si es PC, iniciamos normal
        this.createInitialTriangles();
        this.startContinuousGeneration();
    }

    createTriangle() {
        if (this.triangleCount >= this.maxTriangles) {
            this.cleanOldTriangles();
        }
        
        const triangle = document.createElement('div');
        triangle.classList.add('triangle');
        this.configureTriangle(triangle);
        this.trianglesContainer.appendChild(triangle);
        this.triangleCount++;
        this.scheduleRemoval(triangle);
    }

    configureTriangle(triangle) {
        const posX = Math.random() * 100;
        triangle.style.left = `${posX}%`;
        
        // Tamaños variados para PC
        const size = Math.random() * 20 + 8;
        triangle.style.borderLeftWidth = `${size/2}px`;
        triangle.style.borderRightWidth = `${size/2}px`;
        triangle.style.borderBottomWidth = `${size}px`;
        
        const randomX = Math.random();
        const randomRotate = Math.random();
        
        triangle.style.setProperty('--random-x', randomX);
        triangle.style.setProperty('--random-rotate', randomRotate);
        
        const speedTypes = ['fast', 'medium', 'slow'];
        const speedType = speedTypes[Math.floor(Math.random() * speedTypes.length)];
        triangle.classList.add(speedType);
        
        let duration;
        switch(speedType) {
            case 'fast': duration = 1.0 + Math.random() * 0.5; break;
            case 'medium': duration = 1.5 + Math.random() * 0.5; break;
            case 'slow': duration = 2.0 + Math.random() * 0.5; break;
        }
        
        triangle.style.animationDuration = `${duration}s`;
        triangle.style.animationName = 'naturalFall';
    }

    cleanOldTriangles() {
        const triangles = this.trianglesContainer.querySelectorAll('.triangle');
        if (triangles.length > 0) {
            triangles[0].remove();
            this.triangleCount--;
        }
    }

    scheduleRemoval(triangle) {
        const duration = parseFloat(triangle.style.animationDuration);
        const removeTime = duration * 1000 + 100;
        setTimeout(() => {
            if (triangle.parentNode) {
                triangle.parentNode.removeChild(triangle);
                this.triangleCount--;
            }
        }, removeTime);
    }

    createInitialTriangles() {
        // Pocos triángulos al inicio para PC
        for (let i = 0; i < 8; i++) {
            setTimeout(() => this.createTriangle(), i * 200);
        }
    }

    startContinuousGeneration() {
        this.isRunning = true;
        this.generateTriangles();
    }

    generateTriangles() {
        if (!this.isRunning) return;
        this.createTriangle();
        // Generación más pausada (cada 200-400ms)
        const nextInterval = Math.random() * 200 + 200; 
        setTimeout(() => this.generateTriangles(), nextInterval);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    new TriangleAnimation().init();
});
