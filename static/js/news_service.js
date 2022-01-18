const NEWS_BASE_PATH = 'https://www.pgm.gent/data/gentsefeesten/news.json';

function NewsApi () {
  // Get all news articles
  this.getNews = async () => { 
    try {
      const response = await fetch(NEWS_BASE_PATH);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('An error occured!', error);
    }
  };
}