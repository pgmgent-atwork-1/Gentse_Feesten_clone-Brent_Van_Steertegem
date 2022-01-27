const fillSearchPage = async() => {
  this.eventApi = new EventApi();

  cacheElements();
  registerSearchListeners();
}

const cacheElements = () => {
  this.$searchInput = document.querySelector('.search_input');
  this.$searchSubmit = document.querySelector('.search_submit');
  this.$foundEvents = document.querySelector('#found_events');
}

const registerSearchListeners = async () => {
  await this.$searchSubmit.addEventListener('click', ev => {
    ev.preventDefault();
    loadEvents();
  });
}

const searchEvents = async() => {
  const events = await eventApi.getEvents();
  const filteredEvents = events.filter(event => event.title.toLowerCase().includes(this.$searchInput.value.toLowerCase()));
  return filteredEvents;
}

const loadEvents = async () => {
  const events = await searchEvents();
  console.log(events)
  this.$foundEvents.innerHTML = events.map(event => `
  <li class="event_item">
    <a href="evenementen/detail.html?day=${event.day}&slug=${event.slug}">
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
    }
  }
}

window.addEventListener("load", fillSearchPage);