/**
 * Detecta el día actual para actualizar la disponibilidad de los dominios.
 */
export function initDomainsRotation() {
    const domainCards = document.querySelectorAll('.content-grid .content-card');
    if (domainCards.length === 0) return;

    // Obtener el día actual (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)
    const today = new Date().getDay();
    const daysNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    
    domainCards.forEach(card => {
        const statusBadge = card.querySelector('.storage-status');
        if (!statusBadge) return;

        // Los domingos en Genshin Impact abren todos los dominios
        if (today === 0) {
            statusBadge.textContent = '¡Todos Abiertos!';
            statusBadge.className = 'storage-status status-healthy';
        } else {
            statusBadge.textContent = `Rotación Activa (${daysNames[today]})`;
        }
    });
}