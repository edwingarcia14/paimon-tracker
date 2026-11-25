/**
 * Gestiona el estado colapsable de la barra lateral y su persistencia.
 */
export function initSidebar() {
    const sidebar = document.querySelector('.dash-sidebar');
    const toggleBtn = document.getElementById('sidebar-toggle');

    // Validar que los elementos existan en el DOM actual antes de continuar
    if (!sidebar || !toggleBtn) return;

    // 1. Recuperar preferencia previa guardada en el navegador (persistencia)
    const isCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';
    if (isCollapsed) {
        sidebar.classList.add('collapsed');
        toggleBtn.textContent = '❯';
        toggleBtn.setAttribute('aria-expanded', 'false');
    }

    // 2. Escuchar el evento clic del botón de alternancia
    toggleBtn.addEventListener('click', () => {
        // Alternar la clase CSS 'collapsed' en la barra lateral
        const collapsedActive = sidebar.classList.toggle('collapsed');
        
        // Actualizar la flecha del botón y los atributos de accesibilidad ARIA
        toggleBtn.textContent = collapsedActive ? '❯' : '❮';
        toggleBtn.setAttribute('aria-expanded', !collapsedActive);

        // Guardar el estado actual en el almacenamiento local
        localStorage.setItem('sidebar-collapsed', collapsedActive);
    });
}