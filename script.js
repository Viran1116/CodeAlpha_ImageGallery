const galleryItems = document.querySelectorAll(".gallery-item");
const filterButtons = document.querySelectorAll(".filter-btn");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let visibleItems = [...galleryItems];
let currentIndex = 0;

function updateVisibleItems() {
  visibleItems = [...document.querySelectorAll(".gallery-item:not(.hidden)")];
}

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    updateVisibleItems();
    currentIndex = visibleItems.indexOf(item);
    const img = item.querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add("show");
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.classList.remove("show");
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("show");
  }
});

function showImage(index) {
  if (visibleItems.length === 0) return;
  if (index < 0) index = visibleItems.length - 1;
  if (index >= visibleItems.length) index = 0;
  currentIndex = index;
  const img = visibleItems[currentIndex].querySelector("img");
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
}

prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
nextBtn.addEventListener("click", () => showImage(currentIndex + 1));

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    button.classList.add("active");

    const filter = button.dataset.filter;

    galleryItems.forEach((item) => {
      const category = item.dataset.category;
      if (filter === "all" || category === filter) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });

    updateVisibleItems();
  });
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("show")) return;

  if (e.key === "ArrowLeft") showImage(currentIndex - 1);
  if (e.key === "ArrowRight") showImage(currentIndex + 1);
  if (e.key === "Escape") lightbox.classList.remove("show");
});
