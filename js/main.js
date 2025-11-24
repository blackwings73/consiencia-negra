
// Tema claro/escuro acessível (aria-pressed)
const toggle = document.getElementById('theme-toggle');
if(toggle){
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if(saved) document.documentElement.setAttribute('data-theme', saved);
  toggle.addEventListener('click', ()=>{
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? '' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    toggle.setAttribute('aria-pressed', String(next === 'dark'));
    localStorage.setItem('theme', next);
  });
}

// Filtro simples de personalidades (personalidades.html)
const filtro = document.getElementById('filtro-area');
if(filtro){
  filtro.addEventListener('change', (e)=>{
    const val = e.target.value;
    document.querySelectorAll('.person').forEach(card=>{
      if(val === 'all' || card.dataset.area === val) card.style.display = '';
      else card.style.display = 'none';
    });
  });
}

// Pequena micro-animação nos cards ao focar (ajuda quem navega por teclado)
document.querySelectorAll('.card').forEach(c=>{
  c.addEventListener('focus', ()=> c.classList.add('focused'));
  c.addEventListener('blur', ()=> c.classList.remove('focused'));
});
