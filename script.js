const accessKey = "kKzaDsAzOd4YbW3O17UHiFVEEtRfpBC9iinPhkv9hgY";

const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const searchBtn = document.getElementById("search-btn");
const scrollTopBtn = document.getElementById("scroll-to-top");
const themeToggle = document.getElementById("theme-toggle");
const voiceBtn = document.getElementById("voice-btn");
const categoryBtns = document.querySelectorAll(".category");

let page = 1;
let query = "";

async function searchImages(reset = false) {
  if (reset) {
    searchResult.innerHTML = "";
    page = 1;
  }

  query = searchBox.value.trim();
  if (!query) return;

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}&per_page=12`;

  const res = await fetch(url);
  const data = await res.json();

  data.results.forEach(result => {
    const wrapper = document.createElement("div");

    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;

    const download = document.createElement("a");
    download.href = result.links.download + "?force=true";
    download.download = "download";
    download.innerText = "Download";
    download.className = "download-btn";

    wrapper.appendChild(image);
    wrapper.appendChild(download);
    searchResult.appendChild(wrapper);
  });

  page++;
  scrollTopBtn.style.display = "block";
}

// Search actions
searchBtn.addEventListener("click", () => searchImages(true));
searchBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchImages(true);
  }
});

// Infinite scroll & scroll button
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
    searchImages();
  }

  scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const icon = themeToggle.querySelector("i");
  icon.classList.toggle("fa-moon");
  icon.classList.toggle("fa-sun");
});

// Voice search
voiceBtn.addEventListener("click", () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.start();
  recognition.onresult = (e) => {
    searchBox.value = e.results[0][0].transcript;
    searchImages(true);
  };
});

// Category search
categoryBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    searchBox.value = btn.innerText;
    searchImages(true);
  });
});
const themeBtn = document.getElementById("theme-toggle");
const body = document.body;

themeBtn.addEventListener("click", () => {
  body.classList.toggle("light");

  const icon = themeBtn.querySelector("i");
  icon.classList.toggle("fa-moon");
  icon.classList.toggle("fa-sun");
});
