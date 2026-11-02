import { artworks, contact, workshops } from "./site-content.js";

const artworkGrid = document.querySelector("#artwork-grid");
const workshopList = document.querySelector("#workshop-list");
const contactActions = document.querySelector("#contact-actions");
const filterButtons = document.querySelectorAll("[data-filter]");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");

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

  const category = document.createElement("span");
  category.className = "artwork-category";
  category.textContent = artwork.category;
  imageWrap.append(category);

  const title = document.createElement("h3");
  title.textContent = artwork.title;

  const description = document.createElement("p");
  description.textContent = artwork.description;

  card.append(imageWrap, title, description);
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

    const title = document.createElement("h4");
    title.textContent = workshop.title;

    const details = document.createElement("p");
    details.textContent = workshop.description;

    entry.append(title, details);
    workshopList.append(entry);
  });
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
