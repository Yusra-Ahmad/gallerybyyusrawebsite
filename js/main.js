import { artworks, contact, workshops } from "./site-content.js?v=artwork-sales-cards";

const artworkGrid = document.querySelector("#artwork-grid");
const artworkShowMoreButton = document.querySelector("#artwork-show-more");
const artworkLightbox = document.querySelector("#artwork-lightbox");
const artworkLightboxImage = document.querySelector("#artwork-lightbox-image");
const artworkLightboxCaption = document.querySelector("#artwork-lightbox-caption");
const artworkLightboxClose = document.querySelector("#artwork-lightbox-close");
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
const initialArtworkCount = 4;
let currentArtworkFilter = "all";
let isArtworkExpanded = false;
let artworkLightboxTrigger = null;
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
  const status = artwork.status || "enquire";
  card.dataset.status = status;

  const imageWrap = document.createElement("button");
  imageWrap.className = "artwork-image-wrap";
  imageWrap.type = "button";
  imageWrap.setAttribute("aria-label", `View ${artwork.title || artwork.alt} full size`);
  imageWrap.addEventListener("click", () => openArtworkLightbox(artwork));

  const statusBadge = document.createElement("span");
  statusBadge.className = "artwork-status";
  statusBadge.textContent =
    status === "available" ? "Available" : status === "sold" ? "Sold" : "Ask about availability";

  const image = document.createElement("img");
  image.className = "artwork-image";
  image.src = artwork.image;
  image.alt = artwork.alt;
  image.loading = "lazy";
  imageWrap.append(image, statusBadge);

  card.append(imageWrap);

  const details = document.createElement("div");
  details.className = "artwork-card-details";

  const category = document.createElement("p");
  category.className = "artwork-category-label";
  category.textContent = artwork.category.replaceAll("-", " ");

  const title = document.createElement("h3");
  title.textContent = artwork.title || artwork.description || "";

  const price = document.createElement("p");
  price.className = "artwork-price";
  price.textContent =
    typeof artwork.price === "number"
      ? new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(artwork.price)
      : "Price on request";

  details.append(category, title, price);

  const metadata = [artwork.medium, artwork.size].filter(Boolean);
  if (metadata.length > 0) {
    const meta = document.createElement("p");
    meta.className = "artwork-meta";
    meta.textContent = metadata.join(" · ");
    details.append(meta);
  }

  if (status !== "sold") {
    const inquiryLink = document.createElement("a");
    inquiryLink.className = "artwork-inquiry";
    inquiryLink.href = contact.instagramUrl || "#contact";
    if (contact.instagramUrl) {
      inquiryLink.target = "_blank";
      inquiryLink.rel = "noopener noreferrer";
    }
    inquiryLink.textContent = status === "available" ? "Ask to buy" : "Ask about this piece";
    inquiryLink.setAttribute(
      "aria-label",
      `${status === "available" ? "Ask to buy" : "Ask about"} ${title.textContent}`,
    );
    details.append(inquiryLink);
  }

  card.append(details);

  return card;
}

function openArtworkLightbox(artwork) {
  artworkLightboxTrigger = document.activeElement;
  artworkLightboxImage.src = artwork.image;
  artworkLightboxImage.alt = artwork.alt;
  artworkLightboxCaption.textContent = artwork.title || artwork.description || artwork.alt;
  artworkLightbox.showModal();
  artworkLightboxClose.focus();
}

function closeArtworkLightbox() {
  artworkLightbox.close();
  if (artworkLightboxTrigger instanceof HTMLElement && artworkLightboxTrigger.isConnected) {
    artworkLightboxTrigger.focus();
  }
}

function updateArtworkShowMoreButton(visibleArtworks) {
  if (!artworkShowMoreButton) {
    return;
  }

  const hasMoreArtworks = visibleArtworks.length > initialArtworkCount;
  artworkShowMoreButton.hidden = !hasMoreArtworks;

  if (!hasMoreArtworks) {
    return;
  }

  artworkShowMoreButton.innerHTML = isArtworkExpanded
    ? "Show less <span aria-hidden=\"true\">↑</span>"
    : "Show more <span aria-hidden=\"true\">↓</span>";
}

function renderArtworks(category = "all") {
  currentArtworkFilter = category;
  let visibleArtworks =
    category === "all" ? artworks : artworks.filter((artwork) => artwork.category === category);

  if (category === "all") {
    visibleArtworks = [
      ...visibleArtworks.filter((artwork) => artwork.featured),
      ...visibleArtworks.filter((artwork) => !artwork.featured),
    ];
  }

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
    updateArtworkShowMoreButton(visibleArtworks);
    return;
  }

  const itemsToRender = isArtworkExpanded ? visibleArtworks : visibleArtworks.slice(0, initialArtworkCount);

  itemsToRender.forEach((artwork) => artworkGrid.append(createArtworkCard(artwork)));
  updateArtworkShowMoreButton(visibleArtworks);
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
  workshopDetailBooking.href = "https://forms.gle/DNwT2agG7HuWeEau7";
  workshopDetailBooking.target = "_blank";
  workshopDetailBooking.rel = "noopener noreferrer";
  workshopDetailBooking.textContent = "Sign up for this workshop ↗";
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
    instagramLink.textContent = "Ask about a workshop on Instagram";
    contactActions.append(instagramLink);
  }
}

if (artworkShowMoreButton) {
  artworkShowMoreButton.addEventListener("click", () => {
    isArtworkExpanded = !isArtworkExpanded;
    renderArtworks(currentArtworkFilter);
  });
}

artworkLightboxClose.addEventListener("click", closeArtworkLightbox);
artworkLightbox.addEventListener("click", (event) => {
  if (event.target === artworkLightbox) {
    closeArtworkLightbox();
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    isArtworkExpanded = false;
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
  if (event.key !== "Escape") {
    return;
  }

  if (artworkLightbox.open) {
    event.preventDefault();
    closeArtworkLightbox();
    return;
  }

  if (navigation.classList.contains("is-open")) {
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
