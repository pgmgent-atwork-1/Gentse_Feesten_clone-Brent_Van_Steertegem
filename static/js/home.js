const fillHomepage = async() => {
  this.eventApi = new EventApi();
  this.newsApi = new NewsApi();

  cacheElements();

  loadEvents();
  loadNews();
}

const cacheElements = () => {
  this.$events = document.querySelector('#events_home');
  this.$news = document.querySelector('#news_home');
}

const randomNumber = (num) => {
  return Math.floor(Math.random()*num);
}

const getEvents = async() => {
  const events = await this.eventApi.getEvents();
  let num = randomNumber(events.length);
  const a = num;
  while (num == a) {
    num = randomNumber(events.length);
  }
  const b = num;
  while (num == a || num == b) {
    num = randomNumber(events.length);
  }
  const c = num;
  
  return [events[a], events[b], events[c]];
}

const loadEvents = async() => {
  const events = await getEvents();
  this.$events.innerHTML = events.map((event) => `
    <li>
      <a href="#">
        <div data-id="${event.id}"></div>
        <div>
          <span>${event.day_of_week.slice(0, 2)} ${event.day} Jul ${event.start.replace(':','.')} u.</span>
          <h2>${event.title}</h2>
          <span>${event.location}</span>
        </div>
      </a>
    </li>
  `).join('');
  for (event of events) {
    if (event.image) {
      document.querySelector(`[data-id='${event.id}']`).style.backgroundImage = `url("${event.image.full}")`;
    } else {
      document.querySelector(`[data-id='${event.id}']`).style.backgroundImage = 'url("https://data.stad.gent/explore/dataset/gentse-feesten-evenementen-2019/files/8661c545d6f9da58e13a9fcd6b8aab9c/300/")';
    }
  }
}

const getNews = async() => {
  const news = await this.newsApi.getNews();
  return news.splice(0,3);
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