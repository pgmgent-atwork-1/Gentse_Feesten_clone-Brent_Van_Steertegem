const fillHomepage = async() => {
  this.eventApi = new EventApi();

  cacheElements();

  loadEvents();
}

const cacheElements = () => {
  this.$events = document.querySelector('#events_home');
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
  console.log(events);
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
    }
  }
}

window.addEventListener("load", fillHomepage);