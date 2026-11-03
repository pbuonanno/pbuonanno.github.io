(() => {
  const button = document.getElementById('menuButton');
  const navigation = document.getElementById('main-nav');
  if (!button || !navigation) return;
  const compact = window.matchMedia('(max-width: 900px)');
  const setOpen = open => {
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navigation.dataset.open = String(open);
    button.textContent = open ? '×' : '☰';
  };
  button.addEventListener('click', () => {
    setOpen(button.getAttribute('aria-expanded') !== 'true');
  });
  navigation.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setOpen(false));
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      button.focus();
    }
  });
  document.addEventListener('click', event => {
    if (compact.matches && !navigation.contains(event.target) && !button.contains(event.target)) {
      setOpen(false);
    }
  });
  compact.addEventListener('change', () => setOpen(false));
})();
