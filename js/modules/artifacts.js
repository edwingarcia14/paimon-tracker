/**
 * Calcula dinámicamente el Valor Crítico (CV) de los artefactos ingresados.
 */
export function initArtifactCalculator() {
    const calcButton = document.querySelector('.form-actions button');
    if (!calcButton) return;

    calcButton.addEventListener('click', () => {
        const inputs = document.querySelectorAll('.task-fieldset input[type="number"]');
        if (inputs.length < 2) return;

        // Extraer valores numéricos de los campos (o 0 si están vacíos)
        const critRate = parseFloat(inputs[0].value) || 0;
        const critDmg = parseFloat(inputs[1].value) || 0;

        // Fórmula estándar de la comunidad: (Probabilidad * 2) + Daño Crítico
        const cv = (critRate * 2) + critDmg;
        
        // Determinar el Tier (Calidad) del artefacto basado en su CV
        let tier = 'Descarte';
        let tierClass = 'storage-status status-time';
        if (cv >= 40) {
            tier = 'Tier Dios';
            tierClass = 'storage-status status-healthy';
        } else if (cv >= 30) {
            tier = 'Excelente';
            tierClass = 'storage-status status-normal';
        } else if (cv >= 20) {
            tier = 'Útil';
            tierClass = 'storage-status status-warning';
        }

        // Seleccionar elementos de la interfaz de resultados
        const metricNumber = document.querySelector('.metric-display .metric-number');
        const statusBadge = document.querySelector('.metric-display .storage-status');
        const progressBar = document.querySelector('.metric-display .storage-bar');
        const efficiencyText = document.querySelector('.storage-footer .storage-status');

        // Actualizar la interfaz con los resultados calculados
        if (metricNumber) metricNumber.innerHTML = `${cv.toFixed(1)} <span class="metric-max">CV</span>`;
        if (statusBadge) {
            statusBadge.textContent = tier;
            statusBadge.className = tierClass;
        }
        if (progressBar) progressBar.value = Math.min(cv, 50);
        if (efficiencyText) {
            const efficiency = Math.min(100, Math.round((cv / 50) * 100));
            efficiencyText.textContent = `Eficiencia: ${efficiency}%`;
        }
    });
}