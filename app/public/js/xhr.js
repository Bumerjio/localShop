
const xhr = new XMLHttpRequest();

xhr.open('GET', 'http://localhost:3000/users');

xhr.onload = () => {
  const someJData = JSON.parse(xhr.responseText);

  renderHTML(someJData);
}

xhr.send();

function renderHTML(data) {
  for (let i = 0; i <= data.length; i++) {

    const ul = document.getElementById('items');
    const li = document.createElement('li');

    const div = document.createElement('div');
    div.className = "items-text-block";

    const h2 = document.createElement('h2');
    const p = document.createElement('p');
    const pSecond = document.createElement('p');
    const btn = document.createElement('button');
    btn.className = 'items-button-buy';
    btn.type = 'submit';


    h2.innerHTML = data[i].username;
    p.innerHTML = 'артикул: <span>' + data[i].address.zipcode + '</span>';
      pSecond.innerHTML = 'цена: <span>'+ data[i].price +'грн</span>';
    li.innerHTML = '<a href="#"><img src='+ data[i].picture +'></a>';
    btn.innerHTML = 'Заказать';

    div.append(h2, p, pSecond, btn);
    ul.appendChild(li).append(div);
  }
}
