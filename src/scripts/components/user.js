'use strict';
import './user.scss';
import Modal from '../ui/modal';

export default function User(modal) {
  this.form = modal.querySelector('form');
  this.addDOM(this.makeCard(this.getValues().modalValues));
}

User.prototype.getValues = function () {
  const modalEmpty = {
    name: this.form.querySelector('[data-form="name"]'),
    lastname: this.form.querySelector('[data-form="lastname"]')
  }
  const modalValues = {
    name: modalEmpty.name.value,
    lastname: modalEmpty.lastname.value
  }
  return {
    modalEmpty, modalValues
  }
};

User.prototype.makeCard = function (modalValues) {
  const card = document.createElement('div');
  card.innerHTML = this.makeCardHTML(modalValues);
  console.log(modalValues);

  card.querySelector('.js_edit').onclick = () => {
    this.editCard(card, modalValues);
  }
  card.querySelector('.js_delete').onclick = () => {
    this.deleteCard(card);
  }

  return card;
}

User.prototype.makeCardHTML = function (modalValues) {
  return `<div class="card" style="width: 18rem;">
  <img class="card-img-top" src="">
  <div class="card-body">
  <div class="modifyCard d-flex align-items-between">
          <button type="button" class="js_edit fas fa-user-edit mx-3"></button>
          <button type="button" class="js_delete fas fa-trash-alt mx-3"></button>
  </div>
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

User.prototype.editCard = function (card, modalValues) {
  
  const {modalEmpty} = this.getValues();

  console.log('values',modalEmpty);

  for (const fields in modalEmpty) {
    modalEmpty[fields].value = modalValues[fields];
  };

  const modal = new Modal ({
    element: document.querySelector('.js_modal_form'),
    runUser: () => {
      this.setValues(card);
    }
  })
modal.edit()
}

User.prototype.deleteCard = function (card) {
  card.remove();
}

User.prototype.setValues = function(card) {

  const { modalValues } = this.getValues();

  console.log('valores',this.getValues());

  card.innerHTML = this.makeCardHTML(modalValues);

  card.querySelector('.js_edit').onclick = () => {
    this.editCard(card,modalValues);
  }
  card.querySelector('.js_delete').onclick = () => {
    this.deleteCard(card);
  }
}

