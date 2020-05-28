const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');
var count = 0;

function renderList(doc) {
  let li = document.createElement('li');
  let name = document.createElement('span');
  let city = document.createElement('span');
  let cross = document.createElement('div');
  li.setAttribute('data-id', doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  cross.textContent = 'x';
  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);
  cafeList.appendChild(li);
  // count++;
  // if (count === 1) {
  //   $('div').css('border-radius', '0px 120px 0px 0px');
  //   $('li').css('border-radius', '0px 120px 0px 0px');
  // }

  //deleting data
  cross.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    //this gets only one doc
    db.collection('cafes').doc(id).delete();
  });
}
//getting data
//this gets all the data
//.where().get() helps in querying
//.where('city','==','del').get()
//orderBy('city')
//.where().orderBy().get()
// db.collection('cafes').orderBy('city').get().then((snapshot) => {
//   snapshot.docs.forEach(doc => {
//     renderList(doc);
//   })
//
// });


//sending data
form.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('cafes').add({
    name: form.name.value,
    city: form.city.value
  });
  form.name.value = '';
  form.city.value = '';
});

//real-time database
db.collection('cafes').orderBy('city').onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  changes.forEach(change => {
    if (change.type == 'added') {
      renderList(change.doc);
    } else if (change.type == 'removed') {
      let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
      cafeList.removeChild(li);
    }
  });
});