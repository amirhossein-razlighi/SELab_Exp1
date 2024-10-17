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
  function toggleDialog(show) {
    var dialog = document.getElementById('orderSelectionDialog');
    if (show) {
      dialog.style.display = 'initial';
    } else {
      dialog.style.display = 'none';
    }
  }

  document.getElementById('orderSelection').addEventListener('click', function () {
    toggleDialog(true);
  });

  document.getElementById('finishOrderSelection').addEventListener('click', function () {
    toggleDialog(false);
  });

  document.getElementById('book-now-button').addEventListener('click', function () {
    alert('Your Booking is done successfully!');
  });

  setInterval(switchImage, 3000); // Change image every 3 seconds
});

