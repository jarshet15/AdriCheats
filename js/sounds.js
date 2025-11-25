// Sistema de música de fondo - Activación al tocar cualquier parte
class BackgroundMusic {
    constructor() {
        this.audio = document.getElementById('backgroundMusic');
        this.activator = document.getElementById('musicActivator');
        this.hasActivated = false;
        
        // Almacenar referencias
        this.activationHandler = this.activationHandler.bind(this);
        
        this.init();
    }

    init() {
        // Volumen más bajo por defecto, subirá al activarse
        this.audio.volume = 0; 
        this.setupGlobalActivation();
    }

    setupGlobalActivation() {
        // Escucha solo el evento de 'click' en el documento, es el más fiable
        document.addEventListener('click', this.activationHandler, { once: true });
        
        // Auto-ocultar después de 5 segundos si no se activa
        setTimeout(() => {
            if (!this.hasActivated) {
                this.hideActivator();
                this.removeListeners(); // Limpiar listeners si se oculta
            }
        }, 5000);
    }
    
    // Controlador de eventos unificado
    activationHandler() {
        if (this.hasActivated) return; // Doble verificación para evitar ejecuciones múltiples

        // Intenta la reproducción inmediatamente dentro del contexto del clic
        this.audio.play().then(() => {
            console.log('🎵 Música Phonk ACTIVADA');
            this.hasActivated = true;
            this.hideActivator();
            this.removeListeners(); // Remover al tener éxito
            this.fadeInVolume(0.4, 1500); // Sube a 0.4 en 1.5 segundos
        }).catch(error => {
            console.log('❌ Error al activar música. Navegador demasiado estricto:', error.message);
            // Si falla, limpiar y asumir el intento para no volver a intentarlo
            this.hasActivated = true; 
            this.hideActivator(); 
            this.removeListeners();
        });
    }

    fadeInVolume(targetVolume, duration) {
        const steps = 50;
        const stepTime = duration / steps;
        const volumeIncrement = targetVolume / steps;

        let currentVolume = 0;
        this.audio.volume = 0;

        const fade = setInterval(() => {
            currentVolume += volumeIncrement;
            if (currentVolume >= targetVolume) {
                this.audio.volume = targetVolume;
                clearInterval(fade);
            } else {
                this.audio.volume = currentVolume;
            }
        }, stepTime);
    }
    
    hideActivator() {
        this.activator.style.opacity = '0';
        this.activator.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => {
            this.activator.style.display = 'none';
        }, 500);
    }
    
    removeListeners() {
        // Solo quitamos el click ya que solo lo estamos usando
        document.removeEventListener('click', this.activationHandler);
    }
}

// Sistema de sonidos para botones
class SoundSystem {
    playButtonSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.15);
            
        } catch (e) {
            // Silenciar errores de audioContext si no está permitido
        }
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    window.backgroundMusic = new BackgroundMusic();
    window.soundSystem = new SoundSystem();
});