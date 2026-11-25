/**
 * Simula y calcula la regeneración real de la Resina Original con localStorage.
 */
export function initResinaTimer() {
    const resinBar = document.getElementById('resin-bar');
    const resinStatusText = document.querySelector('.status-healthy');
    const resinCodeDisplay = document.querySelector('.storage-percentage .system-code');

    if (!resinBar || !resinStatusText || !resinCodeDisplay) return;

    const maxResin = parseInt(resinBar.max, 10);
    
    // Obtener valores guardados o usar los valores por defecto del DOM
    let currentResin = parseInt(localStorage.getItem('paimon_resin_value') || resinBar.value, 10);
    let lastUpdate = parseInt(localStorage.getItem('paimon_resin_timestamp') || Date.now(), 10);

    // Calcular cuántas resinas se debieron recuperar mientras la app estaba cerrada
    const now = Date.now();
    const elapsedSeconds = Math.floor((now - lastUpdate) / 1000);
    const recoveredResin = Math.floor(elapsedSeconds / 480); // 1 resina cada 480s (8 min)

    if (recoveredResin > 0 && currentResin < maxResin) {
        currentResin = Math.min(maxResin, currentResin + recoveredResin);
        localStorage.setItem('paimon_resin_value', currentResin);
        localStorage.setItem('paimon_resin_timestamp', Date.now());
    }

    // Refrescar la interfaz inicial con los valores calculados
    resinBar.value = currentResin;
    resinCodeDisplay.textContent = `${currentResin} / ${maxResin}`;

    // Intervalo de ejecución de cada segundo para actualizar el temporizador visual
    setInterval(() => {
        let storedResin = parseInt(localStorage.getItem('paimon_resin_value') || resinBar.value, 10);

        // Si la resina ya está al máximo, detener la cuenta regresiva visual
        if (storedResin >= maxResin) {
            resinStatusText.textContent = '¡Completamente Llena!';
            resinStatusText.className = 'storage-status status-normal';
            return;
        }

        let secondsPassed = Math.floor((Date.now() - lastUpdate) / 1000);
        let cycleSeconds = secondsPassed % 480;
        
        // Si ha pasado el tiempo suficiente para sumar 1 resina en tiempo real
        if (secondsPassed >= 480) {
            currentResin = Math.min(maxResin, currentResin + Math.floor(secondsPassed / 480));
            lastUpdate = Date.now();
            localStorage.setItem('paimon_resin_value', currentResin);
            localStorage.setItem('paimon_resin_timestamp', lastUpdate);
            resinBar.value = currentResin;
            resinCodeDisplay.textContent = `${currentResin} / ${maxResin}`;
        }

        // Calcular formato de tiempo restante (Horas, Minutos, Segundos)
        const totalSecondsLeft = (maxResin - currentResin) * 480 - cycleSeconds;
        const hours = Math.floor(totalSecondsLeft / 3600);
        const minutes = Math.floor((totalSecondsLeft % 3600) / 60);
        const seconds = totalSecondsLeft % 60;

        resinStatusText.textContent = `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s para llenar`;
    }, 1000);
}