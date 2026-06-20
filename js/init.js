// ─── INIT ─────────────────────────────
function init(){
  loadS();
  renderSection('dashboard');
  updateHeaderHP();
  updateCondBanner();
}
document.addEventListener('DOMContentLoaded',init);
