const fillSearchPage = async() => {
  this.eventApi = new EventApi();

  cacheElements();
  registerSearchListeners();
}

const cacheElements = () => {
  this.$searchInput = document.querySelector('.search_input');
  this.$searchSubmit = document.querySelector('.search_submit');
}

const registerSearchListeners = async() => {
  await this.$searchSubmit.addEventListener('click', ev => {
    ev.preventDefault();
    searchEvents() 
  });
}

const searchEvents = async() => {
  const events = await eventApi.getEvents();
  const filteredEvents = events.filter(event => event.title.toLowerCase().includes(this.$searchInput.value.toLowerCase()));
  console.log(filteredEvents);
}

const loadEvents = async () => {
  const events = await getEventsForDay();
  const categories = await getCategories();
  this.$events.innerHTML = categories.map(category => `
    <div id="${category.toLowerCase().replaceAll("/", "_").replaceAll(" ", "_").replaceAll(">", "").replaceAll("'", "").replaceAll(",", "_").replaceAll("__", "_")}">
      <section>
        <h2>${category}</h2>
        <a href="evenementen/dag.html?day=${this.day}#events_teaser"><img src="static/media/img/icons/arrow-up.svg" alt="arrow up" /></a>
      </section>
      <ul id="${category.toLowerCase().replaceAll("/", "_").replaceAll(" ", "_").replaceAll(">", "").replaceAll("'", "").replaceAll(",", "_").replaceAll("__", "_")}_list"></ul>
    </div>    
  `).join('');
  for (category of categories) {
    document.querySelector(`#${category.toLowerCase().replaceAll("/", "_").replaceAll(" ", "_").replaceAll(">", "").replaceAll("'", "").replaceAll(",", "_").replaceAll("__", "_")}_list`).innerHTML = events.filter(event => event.category.includes(category)).map(event => `
    <li class="event_item">
    <a href="evenementen/detail.html?day=${this.day}&slug=${event.slug}">
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
    }
  }
}

window.addEventListener("load", fillSearchPage);