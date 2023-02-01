document.addEventListener( 'DOMContentLoaded', function () {
    new Splide('#splide_event', {
      type: 'loop',
      perPage: 2,
      autoplay: false,
      interval: 8000,
      flickMaxPages: 1,
      updateOnMove: false,
      pagination: false,
      padding: '10%',
      throttle: 300,
      breakpoints: {
        1440: {
          perPage: 1,
          padding: '30%'
        }
      }
    }).mount();
  });