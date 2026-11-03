import { artworks, contact, workshops } from "./site-content.js?v=calligraphy-image-only";

const artworkGrid = document.querySelector("#artwork-grid");
const workshopList = document.querySelector("#workshop-list");
const contactActions = document.querySelector("#contact-actions");
const filterButtons = document.querySelectorAll("[data-filter]");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const heroVideo = document.querySelector(".hero-art-video");
const main = document.querySelector("#main");
const workshopDetail = document.querySelector("#workshop-detail");
const workshopDetailTitle = document.querySelector("#workshop-detail-title");
const workshopDetailDescription = document.querySelector("#workshop-detail-description");
const workshopDetailImage = document.querySelector("#workshop-detail-image");
const workshopDetailBooking = document.querySelector("#workshop-detail-booking");
const workshopGallery = document.querySelector("#workshop-gallery");
const workshopGalleryTitle = document.querySelector("#workshop-gallery-title");
const mainSections = Array.from(main.children);
const pageTitle = document.title;
let wasWorkshopDetail = false;

if (heroVideo instanceof HTMLVideoElement) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function respectReducedMotion() {
    if (reducedMotion.matches) {
      heroVideo.pause();
      heroVideo.removeAttribute("autoplay");
    }
  }

  reducedMotion.addEventListener("change", (event) => {
    if (event.matches) {
      respectReducedMotion();
      return;
    }

    heroVideo.setAttribute("autoplay", "");
    heroVideo.play().catch((error) => {
      console.error("Could not resume the homepage video.", error);
    });
  });

  respectReducedMotion();
}

function createArtworkCard(artwork) {
  const card = document.createElement("article");
  card.className = "artwork-card";
  card.dataset.category = artwork.category;

  const imageWrap = document.createElement("div");
  imageWrap.className = "artwork-image-wrap";

  const image = document.createElement("img");
  image.className = "artwork-image";
  image.src = artwork.image;
  image.alt = artwork.alt;
  image.loading = "lazy";
  imageWrap.append(image);

  card.append(imageWrap);

  if (artwork.title) {
    const title = document.createElement("h3");
    title.textContent = artwork.title;
    card.append(title);
  }

  if (artwork.description) {
    const description = document.createElement("p");
    description.textContent = artwork.description;
    card.append(description);
  }

  return card;
}

function renderArtworks(category = "all") {
  const visibleArtworks =
    category === "all" ? artworks : artworks.filter((artwork) => artwork.category === category);

  artworkGrid.replaceChildren();

  if (visibleArtworks.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";

    const title = document.createElement("h3");
    title.textContent = artworks.length === 0 ? "The collection is taking shape." : "More work soon.";

    const message = document.createElement("p");
    message.textContent =
      artworks.length === 0
        ? "Artwork will be added here. For now, enjoy a little glimpse into the studio above."
        : "There are no pieces in this category just yet.";

    emptyState.append(title, message);
    artworkGrid.append(emptyState);
    return;
  }

  visibleArtworks.forEach((artwork) => artworkGrid.append(createArtworkCard(artwork)));
}

function renderWorkshops() {
  if (workshops.length === 0) {
    const message = document.createElement("p");
    message.className = "workshop-empty";
    message.textContent = "Workshop offerings will be shared here soon.";
    workshopList.append(message);
    return;
  }

  workshops.forEach((workshop) => {
    const entry = document.createElement("article");
    entry.className = "workshop-entry";

    const link = document.createElement("a");
    link.className = "workshop-entry-link";
    link.href = `#workshop/${workshop.slug}`;

    const image = document.createElement("img");
    image.className = "workshop-image";
    image.src = workshop.image;
    image.alt = workshop.alt;
    image.loading = "lazy";
    image.decoding = "async";

    const title = document.createElement("h4");
    title.textContent = workshop.title;

    const details = document.createElement("p");
    details.textContent = workshop.description;

    link.append(image, title, details);
    entry.append(link);
    workshopList.append(entry);
  });
}

function renderWorkshopGallery(workshop) {
  workshopGallery.replaceChildren();
  workshopGalleryTitle.textContent = workshop.galleryTitle || "Past workshop moments";

  if (workshop.gallery.length === 0) {
    const emptyState = document.createElement("p");
    emptyState.className = "workshop-gallery-empty";
    emptyState.textContent = "Photos from past workshops will be added here.";
    workshopGallery.append(emptyState);
    return;
  }

  workshop.gallery.forEach((photo) => {
    const image = document.createElement("img");
    image.src = photo.image;
    image.alt = photo.alt;
    image.loading = "lazy";
    image.decoding = "async";
    workshopGallery.append(image);
  });
}

function renderWorkshopDetail() {
  const match = window.location.hash.match(/^#workshop\/([a-z0-9-]+)$/);
  const workshop = match && workshops.find((item) => item.slug === match[1]);
  const isDetailPage = Boolean(workshop);

  mainSections.forEach((section) => {
    section.hidden = isDetailPage && section !== workshopDetail;
  });
  workshopDetail.hidden = !isDetailPage;

  if (!workshop) {
    document.title = pageTitle;
    if (wasWorkshopDetail) {
      const target = document.getElementById(window.location.hash.slice(1));
      if (target) {
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY,
          behavior: "instant",
        });
      }
    }
    wasWorkshopDetail = false;
    return;
  }

  wasWorkshopDetail = true;
  workshopDetailTitle.textContent = workshop.title;
  workshopDetailDescription.textContent = workshop.description;
  workshopDetailImage.src = workshop.image;
  workshopDetailImage.alt = workshop.alt;
  workshopDetailBooking.href = contact.instagramUrl || "#contact";
  workshopDetailBooking.target = contact.instagramUrl ? "_blank" : "";
  workshopDetailBooking.rel = contact.instagramUrl ? "noopener noreferrer" : "";
  renderWorkshopGallery(workshop);

  document.title = `${workshop.title} Workshop — Gallery by Yusra`;
  window.scrollTo(0, 0);
  workshopDetailTitle.focus({ preventScroll: true });
}

function renderContactLinks() {
  if (contact.email) {
    const emailLink = document.createElement("a");
    emailLink.className = "button";
    emailLink.href = `mailto:${contact.email}`;
    emailLink.textContent = "Send an email";
    contactActions.append(emailLink);
  }

  if (contact.instagramUrl) {
    const instagramLink = document.createElement("a");
    instagramLink.className = "button";
    instagramLink.href = contact.instagramUrl;
    instagramLink.target = "_blank";
    instagramLink.rel = "noopener noreferrer";
    instagramLink.textContent = "Book a workshop via DM";
    contactActions.append(instagramLink);
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    renderArtworks(button.dataset.filter);
  });
});

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  navigation.classList.toggle("is-open", !isExpanded);
});

navigation.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    menuToggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation.classList.contains("is-open")) {
    menuToggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
    menuToggle.focus();
  }
});

renderArtworks();
renderWorkshops();
renderContactLinks();
renderWorkshopDetail();
window.addEventListener("hashchange", renderWorkshopDetail);
