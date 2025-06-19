var accessKey = "kKzaDsAzOd4YbW3O17UHiFVEEtRfpBC9iinPhkv9hgY";
var searchbox = document.getElementById("search-box");
var searchresult = document.getElementById("search-result");
var showmorebtn = document.getElementById("show-more-btn");
var keyword = "";
var page = 1;

function searchImages() {
    keyword = searchbox.value;
    var url = "https://api.unsplash.com/search/photos?page=" + page +
        "&query=" + keyword + "&client_id=" + accessKey + "&per_page=12";

    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(x) {
        if (page == 1) {
            searchresult.innerHTML = "";
        }

        var results = x.results;
        for (var i = 0; i < results.length; i++) {
            var result = results[i];
            var image = document.createElement("img");
            image.src = result.urls.small;

            var imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.rel = "noopener";
            imageLink.appendChild(image);

            searchresult.appendChild(imageLink);
        }

        showmorebtn.style.display = "block";
        page++; // ← needed for pagination
    });
}

showmorebtn.addEventListener("click", searchImages);
