/**
 * Controla el estado interactivo y persistente de los encargos diarios.
 */
export function initCommissions() {
    const checkboxes = document.querySelectorAll('.task-fieldset input[type="checkbox"]');
    const katheryneStatus = document.querySelector('.storage-status.status-warning');
    
    if (checkboxes.length === 0) return;

    // 1. Restaurar estados previos guardados en localStorage
    checkboxes.forEach((cb, index) => {
        const savedState = localStorage.getItem(`paimon_commission_${index}`);
        if (savedState !== null) {
            cb.checked = savedState === 'true';
        }
    });

    // Actualizar texto de Katheryne al cargar la página
    updateKatheryneStatus(checkboxes, katheryneStatus);

    // 2. Escuchar cambios en cada casilla de misión
    checkboxes.forEach((cb, index) => {
        cb.addEventListener('change', () => {
            localStorage.setItem(`paimon_commission_${index}`, cb.checked);
            updateKatheryneStatus(checkboxes, katheryneStatus);
        });
    });
}

/**
 * Actualiza el estado visual de Katheryne según las misiones completadas.
 */
function updateKatheryneStatus(checkboxes, statusElement) {
    if (!statusElement) return;
    const completedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
    
    // Si completó las 4 misiones del día
    if (completedCount === checkboxes.length) {
        statusElement.textContent = 'Katheryne: ¡Reclamado!';
        statusElement.className = 'storage-status status-normal';
    } else {
        statusElement.textContent = `Katheryne: ${completedCount}/4 Pendiente`;
        statusElement.className = 'storage-status status-warning';
    }
}