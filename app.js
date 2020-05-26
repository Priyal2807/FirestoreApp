const cafeList = document.querySelector('#cafe-list');
var count = 0;

function renderList(doc) {
  let li = document.createElement('li');
  let name = document.createElement('span');
  let city = document.createElement('span');
  li.setAttribute('data-id', doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  li.appendChild(name);
  li.appendChild(city);
  cafeList.appendChild(li);
  count++;
  if (count === 1) {
    $('li').css('border-radius', '0px 120px 0px 0px');
  }
}
db.collection('cafes').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    renderList(doc);
  })

})