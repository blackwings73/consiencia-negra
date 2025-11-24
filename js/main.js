
// js/main.js — interatividade aprimorada e acessível
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle (supports multiple buttons)
  function setupMenuButtons(){
    const toggles = document.querySelectorAll('.menu-toggle');
    const nav = document.getElementById('primary-nav');
    toggles.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        if(nav){
          const hidden = nav.getAttribute('aria-hidden') === 'false';
          nav.setAttribute('aria-hidden', String(hidden ? 'true' : 'false'));
        }
      });
    });
    // ensure nav is hidden by default on small screens
    if(window.innerWidth <= 640 && nav) nav.setAttribute('aria-hidden','true');
    window.addEventListener('resize', ()=>{ if(window.innerWidth > 640 && nav) nav.removeAttribute('aria-hidden'); });
  }

  // Theme toggle (double-duty with saved preference)
  function applyTheme(theme){
    document.body.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }
  const saved = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(saved);
  // add keyboard shortcut: "t" to toggle theme (with focus check)
  document.addEventListener('keydown', (e) => { if(e.key === 't' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
    const next = document.body.classList.contains('dark') ? 'light' : 'dark'; applyTheme(next);
  }});

  // Filter + search on personalidades page
  const grid = document.getElementById('people-grid');
  const select = document.getElementById('filter-select');
  const search = document.getElementById('search');
  function applyFilter(){
    if(!grid) return;
    const area = select ? select.value : 'all';
    const q = search ? search.value.trim().toLowerCase() : '';
    Array.from(grid.children).forEach(item=>{
      const matchesArea = (area === 'all') || (item.dataset.area === area);
      const text = item.textContent.toLowerCase();
      const matchesSearch = q === '' || text.includes(q);
      item.style.display = (matchesArea && matchesSearch) ? '' : 'none';
    });
  }
  if(select) select.addEventListener('change', applyFilter);
  if(search) search.addEventListener('input', applyFilter);

  // Accessible focus ring only after user uses Tab
  function firstTab(e){
    if(e.key === 'Tab'){ document.documentElement.classList.add('show-focus'); window.removeEventListener('keydown', firstTab); }
  }
  window.addEventListener('keydown', firstTab);

  setupMenuButtons();
});
