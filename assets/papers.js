(() => {
  const links = Array.from(document.querySelectorAll('[data-paper-link]'));
  const stories = Array.from(document.querySelectorAll('.paper-story'));
  const select = id => links.forEach(link => {
    if (link.hash === '#' + id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  const initial = stories.find(story => '#' + story.id === location.hash);
  if (stories.length) select((initial || stories[0]).id);
  links.forEach(link => link.addEventListener('click', () => select(link.hash.slice(1))));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting);
      if (visible.length) select(visible[0].target.id);
    }, { rootMargin: '-18% 0px -63% 0px', threshold: 0 });
    stories.forEach(story => observer.observe(story));
  }
  document.querySelectorAll('[data-copy]').forEach(button => {
    if (!navigator.clipboard || !window.isSecureContext) return;
    button.hidden = false;
    button.addEventListener('click', async () => {
      const code = document.getElementById(button.dataset.copy);
      const status = button.nextElementSibling;
      try {
        await navigator.clipboard.writeText(code.textContent);
        status.textContent = 'Citation copied.';
      } catch {
        status.textContent = 'Select and copy the citation above.';
      }
    });
  });
})();
