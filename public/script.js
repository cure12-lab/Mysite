const bundles = [
  {
    img: "https://i.imgur.com/turn0image0.jpg",
    name: "Judgement King + War Machine Scenery",
    desc: "November Gold Pass Bundle",
    link: "/login.html"
  },
  {
    img: "https://i.imgur.com/turn0image11.jpg",
    name: "Anime Royal Champion + Anime Scenery",
    desc: "August Gold Pass Bundle",
    link: "/login.html"
  },
  {
    img: "https://i.imgur.com/turn0image2.jpg",
    name: "Shadow Scenery",
    desc: "Dark & mysterious base design",
    link: "/login.html"
  },
  {
    img: "https://i.imgur.com/turn0image3.jpg",
    name: "Space Scenery",
    desc: "Futuristic galaxy theme base",
    link: "/login.html"
  },
  {
    img: "https://i.imgur.com/turn0image4.jpg",
    name: "Epic Jungle Scenery",
    desc: "Lush and adventurous theme",
    link: "/login.html"
  },
  {
    img: "https://i.imgur.com/turn0image5.jpg",
    name: "Pirate Champion + Pirate Scenery",
    desc: "Arrr! Clash on the high seas",
    link: "/login.html"
  },
  {
    img: "https://i.imgur.com/turn0image6.jpg",
    name: "Winter Queen + Snowy Scenery",
    desc: "Festive holiday themed bundle",
    link: "/login.html"
  },
  {
    img: "https://i.imgur.com/turn0image7.jpg",
    name: "Legendary Scenery",
    desc: "The rarest base theme yet",
    link: "/login.html"
  }
];
const container = document.querySelector('.offers');
bundles.forEach(b => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${b.img}" alt="${b.name}">
    <div class="card-content">
      <h3>${b.name}</h3>
      <p>${b.desc}</p>
      <button onclick="location.href='${b.link}'">Claim Now</button>
    </div>`;
  container.appendChild(card);
});
