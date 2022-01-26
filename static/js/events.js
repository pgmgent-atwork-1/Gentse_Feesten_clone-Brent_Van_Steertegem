const fillEventspage = async() => {
  this.eventApi = new EventApi();

  cacheElements();
  setSelectedDay();

  if (checkDay()) {
    loadEventsTeaser();
    loadCategories();
    loadEvents()
  }
}

const cacheElements = () => {
  this.$eventsTeaser = document.querySelector('#events_teaser');
  this.$categories = document.querySelector('#categories');
  this.$events = document.querySelector('#events');
}

const randomNumber = (num) => {
  return Math.floor(Math.random()*num);
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

const getEventsForDay = async() => {
  const allEvents = await this.eventApi.getEvents();
  const eventsForDay = allEvents.filter(event => event.day === this.day);
  return eventsForDay;
}

const getRandomEvents = async() => {
  const events = await getEventsForDay();
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

const loadEventsTeaser = async() => {
  const events = await getRandomEvents();
  this.$eventsTeaser.innerHTML = events.map((event) => `
    <li class="event_item">
      <a href="#">
        <div data-id="${event.id}"></div>
        <div>
          <span>${event.start.replace(':','.')} u.</span>
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


const loadCategories = async() => {
  const events = await getEventsForDay();
  const categories = [];
  for (event of events) {
    for (ev of event.category) {
      if (!categories.includes(ev)) {
        categories.push(ev)
      }
    }
  }
  this.$categories.innerHTML = categories.sort((a,b) => {
    if (a < b) { return -1 };
    if (a > b) { return 1 };
    return 0;
  }).map(category => `
  <li>
    <a href="evenementen/dag.html?day=${this.day}#${category.toLowerCase().replaceAll("/", "_").replaceAll(" ", "_").replaceAll(">", "").replaceAll("'", "").replaceAll(",", "_").replaceAll("__", "_")}">${category}</a>
  </li>
  `).join('');
}

const loadEvents = async () => {
  const events = await getEventsForDay();
  const categories = [];
  for (event of events) {
    for (ev of event.category) {
      if (!categories.includes(ev)) {
        categories.push(ev)
      }
    }
  }
  this.$events.innerHTML = categories.sort((a,b) => {
    if (a < b) { return -1 };
    if (a > b) { return 1 };
    return 0;
  }).map(category => `
    <div id="${category.toLowerCase().replaceAll("/", "_").replaceAll(" ", "_").replaceAll(">", "").replaceAll("'", "").replaceAll(",", "_").replaceAll("__", "_")}">
      <section>
        <h2>${category}</h2>
        <a href="evenementen/dag.html?day=${this.day}#events_teaser"><img src="static/media/img/icons/arrow-up.svg" alt="arrow up" /></a>
      </section>
      <ul id="${category.toLowerCase().replaceAll("/", "_").replaceAll(" ", "_").replaceAll(">", "").replaceAll("'", "").replaceAll(",", "_").replaceAll("__", "_")}_list"></ul>
    </div>    
  `).join('');
  for (category of categories) {
    document.querySelector(`#${category.toLowerCase().replaceAll("/", "_").replaceAll(" ", "_").replaceAll(">", "").replaceAll("'", "").replaceAll(",", "_").replaceAll("__", "_")}_list`).innerHTML = events.filter(event => event.category.includes(category)).sort((a,b) => {
      if (a.start < b.start) { return -1 };
      if (a.start > b.start) { return 1 };
      return 0;
    }).map(event => `
    <li class="event_item">
    <a href="#">
      <div data-id="${event.id}"></div>
      <div>
        <span>${event.start.replace(':','.')} u.</span>
        <h2>${event.title}</h2>
        <span>${event.location}</span>
      </div>
    </a>
  </li>
    `).join('');
  }
  for (event of events) {
    if (event.image) {
      document.querySelector(`[data-id='${event.id}']`).style.backgroundImage = `url("${event.image.full}")`;
    } else {
      document.querySelector(`[data-id='${event.id}']`).style.backgroundImage = 'url("https://data.stad.gent/explore/dataset/gentse-feesten-evenementen-2019/files/8661c545d6f9da58e13a9fcd6b8aab9c/300/")';
    }
  }
}

window.addEventListener("load", fillEventspage);