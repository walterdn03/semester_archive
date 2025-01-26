const hoverOverlay = document.getElementById("hoverOverlay");
const fileNameDisplay = document.getElementById("fileName");
const content = document.getElementById("content");

let interactionEnabled = false;  

function showOverlay(imgElement) {
  if (interactionEnabled) {  
    hoverOverlay.classList.remove("hidden");
    hoverOverlay.style.display = "flex"; 
    fileNameDisplay.textContent = imgElement.alt; 

    hoverOverlay.onclick = () => {
      imgElement.closest("a").click();
    };
  }
}

function hideOverlay() {
  if (interactionEnabled) {  
    hoverOverlay.classList.add("hidden");
    hoverOverlay.style.display = "none"; 
  }
}

const totalImages = 200;

function loadImages() {
  for (let i = 1; i <= totalImages; i++) {
    const imgNumber = i.toString().padStart(2, "0");
    const imgSrc = `assets/images/anteprime/${imgNumber}.jpg`;
    const pageLink = `${imgNumber}.html`;

    const imgElement = document.createElement("a");
    imgElement.href = pageLink;
    imgElement.target = "";

    imgElement.innerHTML = `
      <img 
        src="${imgSrc}" 
        alt="p. ${imgNumber}" 
        onerror="this.onerror=null; this.src='data:image/svg+xml;charset=UTF-8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22 style=%22background:%23ccc%22></svg>';"
      >
    `;

    content.appendChild(imgElement);
  }

  const contentImages = document.querySelectorAll("#content a img");
  contentImages.forEach((img) => {
    img.addEventListener("mouseover", () => showOverlay(img));
    img.addEventListener("mouseout", hideOverlay);
  });
}

loadImages();

let zoomLevel = 1;

function applyZoom() {
  const newWidth = 150 * zoomLevel;
  content.style.gridTemplateColumns = `repeat(auto-fill, minmax(${newWidth}px, 1fr))`;

  const images = document.querySelectorAll("#content img");
  images.forEach((image) => {
    image.style.transform = `scale(${zoomLevel})`;
  });
}

document.getElementById("zoom-in").addEventListener("click", function () {
  zoomLevel += 0.1;
  applyZoom();
});

document.getElementById("zoom-out").addEventListener("click", function () {
  if (zoomLevel > 0.2) {
    zoomLevel -= 0.1;
    applyZoom();
  }
});

function toggleMenu() {
  const mobileMenu = document.querySelector(".mobile-menu");
  mobileMenu.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("interactionToggle");
  const toggleText = document.getElementById("interactionText");
  const filterButton = document.getElementById("filter-button");

  toggleButton?.addEventListener("click", function () {
    toggleButton.classList.toggle("active"); // Aggiunge o rimuove la classe 'active'

    // Aggiorna il testo in base allo stato
    if (toggleButton.classList.contains("active")) {
      interactionEnabled = true;  // Abilita l'interazione
      toggleText.textContent = "Interaction ON";
    } else {
      interactionEnabled = false;  // Disabilita l'interazione
      toggleText.textContent = "Interaction OFF";
    }
  });

  // Aggiungi eventi per il filtro
  const filterIcon = document.querySelector('.col-2.filter');
  const offcanvasMenu = new bootstrap.Offcanvas(document.getElementById('offcanvasWithBothOptions'));

  filterIcon.addEventListener('click', function () {
    // Apri il menu offcanvas
    offcanvasMenu.show();
  });
});

const toolbar = document.querySelector('.toolbar');

function checkScrollPosition() {
  const scrollPosition = window.scrollY + window.innerHeight;
  const pageHeight = document.documentElement.scrollHeight;

  if (scrollPosition >= pageHeight - 100) {
    toolbar.classList.add('hidden'); // Nascondi la toolbar
  } else {
    toolbar.classList.remove('hidden'); // Mostra la toolbar
  }
}

window.addEventListener('scroll', checkScrollPosition);

