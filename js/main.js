// Funcionalidades principales
class AdricheatsLauncher {
    constructor() {
        this.downloadButtons = document.querySelectorAll('.download-btn');
        this.init();
    }

    init() {
        this.downloadButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (window.soundSystem) {
                    window.soundSystem.playButtonSound();
                }
            });
        });
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    new AdricheatsLauncher();
});