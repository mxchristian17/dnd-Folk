// ─── INIT ─────────────────────────────
function init(){
  loadS();
  const initialSection=(location.hash||'').replace('#','')||'dashboard';
  showSection(document.getElementById('sec-'+initialSection)?initialSection:'dashboard');
  updateHeaderHP();
  updateCondBanner();
}
document.addEventListener('DOMContentLoaded',init);
