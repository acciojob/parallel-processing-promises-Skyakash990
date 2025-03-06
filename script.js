
const outputDiv = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const errDiv = document.createElement("div");
const loadingDiv = document.createElement("div");

errDiv.setAttribute("id", "error");
loadingDiv.setAttribute("id", "loading");
loadingDiv.innerText = "Loading...";


document.body.appendChild(loadingDiv);
document.body.appendChild(errDiv);

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
  });
}

function downloadImages() {
  outputDiv.innerHTML = "";
  errDiv.innerHTML = "";
  loadingDiv.style.display = "block";

  Promise.all(images.map(img => downloadImage(img.url)))
    .then(downloadedImages => {
      downloadedImages.forEach(img => outputDiv.appendChild(img));
    })
    .catch(error => {
      errDiv.innerText = error.message;
    })
    .finally(() => {
      loadingDiv.style.display = "none"; 
    });
}

btn.addEventListener("click", downloadImages);

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];