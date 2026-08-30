(() => {
  let activeWrap = null;

  function exitPresentation() {
    if (!activeWrap) return;
    activeWrap.classList.remove('student-presenting');
    document.body.classList.remove('presentation-open');
    const btn = activeWrap.querySelector('.stage-fullscreen');
    if (btn) btn.textContent = 'Full Screen';
    activeWrap = null;
  }

  document.querySelectorAll('.stage-fullscreen').forEach(btn => {
    btn.addEventListener('click', () => {
      const wrap = btn.closest('.stage-wrap');
      if (!wrap) return;

      if (activeWrap === wrap) {
        exitPresentation();
        return;
      }

      exitPresentation();
      activeWrap = wrap;
      wrap.classList.add('student-presenting');
      document.body.classList.add('presentation-open');
      btn.textContent = 'Exit Full Screen';
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && activeWrap) {
      e.preventDefault();
      exitPresentation();
    }
  });
})();