const fillEventDetailPage = async() => {
  this.eventApi = new EventApi();

  cacheElements();
  setSelectedDay();

  if (checkDay() && checkSlug()) {
    loadEvent();
  }
}

const cacheElements = () => {
  this.$eventTitle = document.querySelector('#event_title');
  this.$eventTime = document.querySelector('#event_time');
  this.$eventImg = document.querySelector('#event_img');
  this.$eventDescription = document.querySelector('#event_description');
  this.$eventUrl = document.querySelector('#event_url');
  this.$eventOrganizer = document.querySelector('#event_organizer');
  this.$eventCategories = document.querySelector('#event_categories');
}


const getDay = () => {
  const params = new URLSearchParams(window.location.search);
  const day = params.get('day');
  return day;
}

const setSelectedDay = () => {
  this.day = getDay();
  const $selectedDay = document.querySelector(`.day_${day}`);
  if ($selectedDay) {
    $selectedDay.classList.add('selectedDay');
  }
}

const checkDay = () => {
  if (this.day) {
    if (this.day >= 19 && this.day <= 28) {
      return true;
    } else {
      document.querySelector('.container.main').innerHTML = '<h2>Geen geldige dag opgegeven!</h2>'
    }
  } else {
    document.querySelector('.container.main').innerHTML = '<h2>Geen dag opgegeven!</h2>'
  }
}

const getSlug = () => {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  return slug;
}

const checkSlug = async () => {
  this.slug = getSlug()
  if (this.slug) {
    const events = await getEventsForDay();
    let correct = false;
    for (event of events) {
      if (event.slug === this.slug) {
        correct = true;
      }
    }
    if (correct == false) {
      document.querySelector('.container.main').innerHTML = '<h2>Geen geldige slug opgegeven!</h2>'
    }
  } else {
    document.querySelector('.container.main').innerHTML = '<h2>Geen slug opgegeven!</h2>'
  }
}

const getEventsForDay = async() => {
  const allEvents = await this.eventApi.getEvents();
  const eventsForDay = allEvents.filter(event => event.day === this.day);
  return eventsForDay;
}

const loadEvent = async() => {
  const events = await getEventsForDay();
  const event = events.find(event => event.slug === this.slug);
  console.log(event);
  this.$eventTitle.innerHTML = event.title;
  this.$eventTime.innerHTML = `${event.day_of_week} ${event.day} juli ${event.start.replace(':','.')} u. > ${event.end.replace(':','.')} u.`;
  if (event.image) {
    this.$eventImg.src = event.image.full;
  } else {
    this.$eventImg.src = "https://data.stad.gent/explore/dataset/gentse-feesten-evenementen-2019/files/8661c545d6f9da58e13a9fcd6b8aab9c/300/";
  }
  this.$eventDescription.innerHTML = event.description;
  this.$eventUrl.href = event.url;
  this.$eventUrl.innerHTML = event.url;
  this.$eventOrganizer.innerHTML = event.organizer;
  this.$eventCategories.innerHTML = event.category.map(category => `
    <a href="evenementen/dag.html?day=${this.day}#${category.toLowerCase().replaceAll("/", "_").replaceAll(" ", "_").replaceAll(">", "").replaceAll("'", "").replaceAll(",", "_").replaceAll("__", "_")}">${category}</a>
  `).join(',');
}

window.addEventListener("load", fillEventDetailPage);