const fillHomepage = async() => {
  this.newsApi = new NewsApi();

  cacheElements();

  loadNews();
}

const cacheElements = () => {
  this.$news = document.querySelector('#news');
}

const getNews = async() => {
  const news = await this.newsApi.getNews();
  return news;
}

const loadNews = async() => {
  const news = await getNews();
  console.log(news);
  this.$news.innerHTML = news.map((article) => `
  <li>
  <a href="#">
    <div data-id="${article.id}">
      <span>${new Date(article.publishedAt).getDate() < 10 ? `0${new Date(article.publishedAt).getDate()}` : new Date(article.publishedAt).getDate()}/07</span>
    </div>
    <div>
      <h2>${article.title}</h2>
      <p>${article.synopsis}</p>
      <img src="static/media/img/icons/arrow-right.svg" alt="arrow right" />
    </div>
  </a>
</li>
  `).join('');
  for (article of news) {
    if (article.picture) {
      document.querySelector(`[data-id='${article.id}']`).style.backgroundImage = `url("https://www.pgm.gent/data/gentsefeesten/${article.picture.medium}")`;
    } else {
      document.querySelector(`[data-id='${article.id}']`).style.backgroundImage = 'static/media/logo.png';
    }
  }
}

window.addEventListener("load", fillHomepage);