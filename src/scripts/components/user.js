import './user.scss';
import Modal from '../ui/modal';

export default function User(modal) {
  this.form = modal.querySelector('form');
  this.addDOM(this.makeCard(this.getValues().modalValues));
}

User.prototype.getValues = function() {
  const modalEmpty = {
    emptyName: this.form.querySelector('.js_name'),
    emptyLastName: this.form.querySelector('.js_lastname')
  }
  const modalValues = {
    name: modalEmpty.emptyName.value,
    lastname: modalEmpty.emptyLastName.value
  }
  return {
    modalEmpty, modalValues
  }
};

User.prototype.makeCard = function(modalValues) {
  const card = document.createElement('div');
  card.innerHTML = this.makeCardHTML(modalValues);
  console.log(modalValues);

  return card;
}

User.prototype.makeCardHTML = function(modalValues) {
  return `<div class="card" style="width: 18rem;">
  <img class="card-img-top" src="">
  <div class="card-body">
    <h5 class="card-title">${modalValues.name}</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`
}

User.prototype.addDOM = function (card) {
  const cardContainers = document.querySelector('#users');
  cardContainers.appendChild(card);
} 
