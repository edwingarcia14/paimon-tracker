import { initSidebar } from './modules/sidebar.js';
import { initResinaTimer } from './modules/resin.js';
import { initCommissions } from './modules/commissions.js';
import { initArtifactCalculator } from './modules/artifacts.js';
import { initDomainsRotation } from './modules/domains.js';

document.addEventListener('DOMContentLoaded', () => {
    // --- ORQUESTADOR MODULAR DE TEYVAT ---
    initSidebar();
    initResinaTimer();
    initCommissions();
    initArtifactCalculator();
    initDomainsRotation();
});