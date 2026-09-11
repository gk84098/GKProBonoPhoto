// Lightbox behavior — shared across all event gallery pages
document.addEventListener('DOMContentLoaded', () => {
  const figures = Array.from(document.querySelectorAll('.gallery figure'));
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  if (!lightbox) return;

  let currentIndex = 0;

  function showImage(index){
    if (index < 0 || index >= figures.length) return;
    currentIndex = index;
    const fig = figures[currentIndex];
    const img = fig.querySelector('img');
    const caption = fig.querySelector('figcaption');
    // Swap in a larger version for picsum placeholder URLs; harmless no-op for real photo paths.
    lightboxImg.src = img.src.replace(/\/\d+\/\d+(\?.*)?$/, '/1600/1200');
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption ? caption.textContent : '';
    if (lightboxPrev) lightboxPrev.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
    if (lightboxNext) lightboxNext.style.visibility = currentIndex === figures.length - 1 ? 'hidden' : 'visible';
  }

  figures.forEach((fig, index) => {
    fig.addEventListener('click', () => {
      lightbox.classList.add('open');
      showImage(index);
    });
  });

  function closeLightbox(){
    lightbox.classList.remove('open');
    lightboxImg.src = '';
  }

  function showNext(){ showImage(currentIndex + 1); }
  function showPrev(){ showImage(currentIndex - 1); }

  lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
  if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });

  // Basic swipe support for touch devices
  let touchStartX = null;
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  });
  lightbox.addEventListener('touchend', (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (dx > 50) showPrev();
    if (dx < -50) showNext();
    touchStartX = null;
  });
});
