// Crear efecto de triángulos cayendo naturalmente - MÁS GRANDES Y RÁPIDOS
class TriangleAnimation {
    constructor() {
        this.trianglesContainer = document.getElementById('triangles');
        this.triangleCount = 0;
        this.maxTriangles = 40; // Menos triángulos para mejor rendimiento
        this.isRunning = false;
    }

    init() {
        this.createInitialTriangles();
        this.startContinuousGeneration();
    }

    createTriangle() {
        // Limpiar triángulos viejos si hay demasiados
        if (this.triangleCount >= this.maxTriangles) {
            this.cleanOldTriangles();
        }
        
        const triangle = document.createElement('div');
        triangle.classList.add('triangle');
        
        // Configurar propiedades del triángulo
        this.configureTriangle(triangle);
        
        this.trianglesContainer.appendChild(triangle);
        this.triangleCount++;
        
        // Programar eliminación
        this.scheduleRemoval(triangle);
    }

    configureTriangle(triangle) {
        // Posición horizontal aleatoria
        const posX = Math.random() * 100;
        triangle.style.left = `${posX}%`;
        
        // Tamaño aleatorio - MÁS GRANDES
        const size = Math.random() * 20 + 8; // Entre 8px y 28px
        triangle.style.borderLeftWidth = `${size/2}px`;
        triangle.style.borderRightWidth = `${size/2}px`;
        triangle.style.borderBottomWidth = `${size}px`;
        
        // Variables CSS aleatorias para movimiento natural
        const randomX = Math.random();
        const randomRotate = Math.random();
        
        triangle.style.setProperty('--random-x', randomX);
        triangle.style.setProperty('--random-rotate', randomRotate);
        
        // Velocidad de caída aleatoria - MÁS RÁPIDO
        const speedTypes = ['fast', 'medium', 'slow'];
        const speedType = speedTypes[Math.floor(Math.random() * speedTypes.length)];
        triangle.classList.add(speedType);
        
        let duration;
        switch(speedType) {
            case 'fast':
                duration = 0.8 + Math.random() * 0.4; // 0.8-1.2s
                break;
            case 'medium':
                duration = 1.2 + Math.random() * 0.4; // 1.2-1.6s
                break;
            case 'slow':
                duration = 1.6 + Math.random() * 0.4; // 1.6-2.0s
                break;
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
        for (let i = 0; i < 12; i++) {
            setTimeout(() => this.createTriangle(), i * 100); // Más rápido
        }
    }

    startContinuousGeneration() {
        this.isRunning = true;
        this.generateTriangles();
    }

    generateTriangles() {
        if (!this.isRunning) return;
        
        this.createTriangle();
        // Intervalo aleatorio para creación más natural - MÁS RÁPIDO
        const nextInterval = Math.random() * 80 + 50; // Entre 50ms y 130ms
        setTimeout(() => this.generateTriangles(), nextInterval);
    }

    stop() {
        this.isRunning = false;
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    const triangleAnimation = new TriangleAnimation();
    triangleAnimation.init();
    
    // Hacer disponible globalmente si se necesita controlar
    window.triangleAnimation = triangleAnimation;
});