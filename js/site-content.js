// Add artwork and workshop offerings here; no database or build step is needed.
export const artworks = [
  // {
  //   title: "Artwork title",
  //   category: "calligraphy", // "calligraphy" or "painting"
  //   image: "assets/artwork/your-image.jpg",
  //   alt: "Describe the artwork for visitors using a screen reader.",
  //   description: "A short note about the piece.",
  // },
];

export const workshops = [
  {
    slug: "arabic-calligraphy",
    title: "Arabic Calligraphy",
    image: "assets/workshops/arabic-calligraphy.jpg",
    alt: "Arabic calligraphy artwork displayed beside red flowers.",
    description: "Explore Arabic lettering through a guided creative experience.",
    gallery: [],
  },
  {
    slug: "alcohol-ink-art",
    title: "Alcohol Ink Art",
    image: "assets/workshops/alcohol-ink-art.jpg",
    alt: "Framed abstract alcohol ink artwork in blue, purple, and white.",
    description: "Experiment with fluid colours and create expressive abstract artwork.",
    galleryTitle: "Alcohol Ink at WeWork",
    gallery: [
      {
        image: "assets/workshops/alcohol-ink-art/wework-session-01.jpg",
        alt: "WeWork participants creating colourful alcohol ink art together around a table.",
      },
      {
        image: "assets/workshops/alcohol-ink-art/wework-session-02.jpg",
        alt: "Alcohol ink artworks displayed on easels at the WeWork workshop.",
      },
      {
        image: "assets/workshops/alcohol-ink-art/wework-session-03.jpg",
        alt: "WeWork participants experimenting with bright colours in their alcohol ink paintings.",
      },
      {
        image: "assets/workshops/alcohol-ink-art/wework-session-04.jpg",
        alt: "A participant applies alcohol ink to a colourful artwork during the workshop.",
      },
      {
        image: "assets/workshops/alcohol-ink-art/wework-session-05.jpg",
        alt: "A participant works on a vivid alcohol ink painting with workshop materials on the table.",
      },
      {
        image: "assets/workshops/alcohol-ink-art/wework-session-06.jpg",
        alt: "Close-up of a participant adding colour to an alcohol ink artwork at WeWork.",
      },
    ],
  },
  {
    slug: "quilling-with-painting",
    title: "Quilling with Painting",
    image: "assets/workshops/quilling-with-painting.jpg",
    alt: "A colorful painted seascape decorated with raised paper-quilled flowers.",
    description: "Combine colourful paper quilling with painting techniques.",
    gallery: [],
  },
  {
    slug: "3d-lemon-painting",
    title: "3D Lemon Painting",
    image: "assets/workshops/3d-lemon-painting.jpg",
    alt: "A textured painting of lemons on a blue checkered cloth.",
    description: "A playful, textured painting experience.",
    gallery: [],
  },
];

export const contact = {
  email: "",
  instagramUrl: "https://www.instagram.com/gallery.by.yusra/",
};
