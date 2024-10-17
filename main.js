document.addEventListener('DOMContentLoaded', (event) => {
  let currentImageIndex = 0;

  const images = [
    document.getElementById('fullsize-image1'),
    document.getElementById('fullsize-image2')
  ];

  images[currentImageIndex].classList.add('show');

  function switchImage() {
    images[currentImageIndex].classList.remove('show');
    currentImageIndex = (currentImageIndex + 1) % images.length;
    images[currentImageIndex].classList.add('show');
  }

  setInterval(switchImage, 3000); // Change image every 3 seconds
});
