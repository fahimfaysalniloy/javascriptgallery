function Gallery(gallery) {
  if (!gallery) return;
  const images = Array.from(gallery.querySelectorAll('img'));
  const modal = document.querySelector('.modal');
  const prevButton = modal.querySelector('.prev');
  const nextButton = modal.querySelector('.next');

  let currentImg;

  function openModal() {
    if (modal.classList.contains('open')) return;
    modal.classList.add('open');
    modal.addEventListener('click', handleclickOutermodal);
    window.addEventListener('keyup', handleKeyUp);
    prevButton.addEventListener('click', showPrevImg);
    nextButton.addEventListener('click', showNextImg);
  }
  function closeModal() {
    modal.classList.remove('open');
    modal.removeEventListener('click', handleclickOutermodal);
    window.removeEventListener('keyup', handleKeyUp);
  }
  function showPrevImg() {
    showImage(
      currentImg.previousElementSibling ||
        currentImg.parentElement.lastElementChild
    );
  }
  function showNextImg() {
    showImage(
      currentImg.nextElementSibling ||
        currentImg.parentElement.firstElementChild
    );
  }
  function handleKeyUp(e) {
    if (e.key === 'Escape') return closeModal();
    if (e.key == 'ArrowLeft') return showPrevImg();
    if (e.key == 'ArrowRight') return showNextImg();
  }
  function handleclickOutermodal(e) {
    if (e.target == e.currentTarget) return closeModal();
  }

  function showImage(el) {
    if (!el) return;
    modal.querySelector('figure img').src = el.src;
    modal.querySelector('figure h2').textContent = el.title;
    modal.querySelector('figure p').textContent = el.dataset.description;
    currentImg = el;

    openModal();
  }

  //listen for click on every images
  images.forEach(image =>
    image.addEventListener('click', e => showImage(e.currentTarget))
  );
  images.forEach(image => {
    image.addEventListener('keyup', e => {
      if (e.key == 'Enter') return showImage(e.currentTarget);
    });
  });
}

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
