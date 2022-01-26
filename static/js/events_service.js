const EVENT_BASE_PATH = 'https://www.pgm.gent/data/gentsefeesten/events.json';

function EventApi () {
  // Get all events
  this.getEvents = async () => { 
    try {
      const response = await fetch(EVENT_BASE_PATH);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('An error occured!', error);
    }
  };
}