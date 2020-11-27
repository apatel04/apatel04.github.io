// You may wish to find an effective randomizer function on MDN.

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortFunction(b, a, key) {
  if (a[key] < b[key]) {
    return -1;
  } if (org[key] > comparison[key]) {
    return 1;
  }
  return 0;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); 
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  // set fave to yes
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      console.log('fromServer', fromServer);
      if (document.querySelector('.flex-inner')){
        document.querySelector('.flex-inner').remove();
      }
      const arr = range(10);
      const arr2= arr.map(() => {
        const number = getRandomIntInclusive(0,243);
        return fromServer[number];
      });
      const reverseList = arr2.sort((b, a) => sortFunction(b, a, 'name'));
      const ol = document.createElement('ol');
      ol.className = 'flex-inner';
      $('form').prepend(ol);
      reverseList.forEach((el, i) => {
        const li = document.createElement('li');
        $(li).append(`<input type="checkbox" value=${el.code} id=${el.code}/>`);
        $(li).append(`<label for=${el.code}>${el.name}</label>`);
        $(ol).append(li);
      });
    })
    .catch((err) => {
      console.log(err)
      // set fave to no
    });
});