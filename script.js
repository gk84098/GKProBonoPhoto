// Lightbox behavior — shared across all event gallery pages
document.addEventListener('DOMContentLoaded', () => {
  const figures = document.querySelectorAll('.gallery figure');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  if (!lightbox) return;

  figures.forEach(fig => {
    fig.addEventListener('click', () => {
      const img = fig.querySelector('img');
      const caption = fig.querySelector('figcaption');
      // Swap in a larger version for picsum placeholder URLs; harmless no-op for real photo paths.
      lightboxImg.src = img.src.replace(/\/\d+\/\d+(\?.*)?$/, '/1600/1200');
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = caption ? caption.textContent : '';
      lightbox.classList.add('open');
    });
  });

  function closeLightbox(){
    lightbox.classList.remove('open');
    lightboxImg.src = '';
  }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
});
