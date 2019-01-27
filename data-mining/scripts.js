const th = document.querySelectorAll('th');
const tr = document.querySelectorAll('tr');

const hugoData = {}

tr.forEach(row => {
  const td = row.querySelectorAll('td');
  let obj = {}
  for (let i = 2; i < th.length; i++) {
    if(td[i]) obj[th[i].innerText] = td[i].innerText.trim();
  }
  if (td[1]) hugoData[td[1].innerText] = obj;
});

const characterData = document.querySelector('.character-data')

const populateData = obj => {
  for (let attack in obj) {
    // console.log(`%c${attack}`, `font-weight: bold; color: green; font-size: 1.1rem;`)
    const ul = document.createElement('ul');
    ul.innerHTML = `<h3>${attack}</h3>`
    characterData.appendChild(ul)
    for (let data in obj[attack]) {
      const li = document.createElement('li');
      li.innerHTML = `<span class='state'>${data}:</span> <span class='state-value'>${obj[attack][data] !== '-' ? obj[attack][data]: 'n/a' }</span>`;
      ul.appendChild(li)
      // console.log(data, obj[attack][data])
    }
  }
}

populateData(hugoData);