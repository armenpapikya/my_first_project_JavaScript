const apikey = "75506d155a9c402d882e26db27a426bc";

const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim();
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        } catch (error) {
            console.log("Error fetching news by query", error);
        }
    }
});

async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching news by query", error);
        return [];
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    if (articles) {
        articles.map((article) => {
            const blogCard = document.createElement("div");
            blogCard.classList.add("blog-card");
            if (article.urlToImage) {
                const img = document.createElement("img");
                img.src = article.urlToImage;
                img.alt = article.title; // Corrected 'art' to 'alt'
                blogCard.appendChild(img);
            }
            const title = document.createElement("h2");
            const truncatedTitle =
                article.title.length > 30
                    ? article.title.slice(0, 30) + "...."
                    : article.title;
            title.textContent = truncatedTitle;
            const description = document.createElement("p");
            description.textContent = article.description;

            blogCard.appendChild(title);
            blogCard.appendChild(description);
            blogCard.addEventListener("click", () => {
                window.open(article.url, "_blank");
            });
            blogContainer.appendChild(blogCard);
        });
    } else {
        console.error("Articles is undefined or null");
    }
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching random news", error);
    }
})();
