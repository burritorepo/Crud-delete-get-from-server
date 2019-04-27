'use strict';
import Modal from '../ui/modal';

export function User(modal) {
  this.modal = modal;
  this.form = modal.querySelector('form');
  this.addDOM(this.makeCard(this.getValues().modalValues));
}

export async function getData() {
  const response = await fetch(`http://localhost:3000/users`);
  const users = await response.json();
  const usersJSON = new User (document.querySelector('.js_modal_form'));

  users.forEach((user) => {
    usersJSON.addDOM(usersJSON.makeCard(user));
     });
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
}


User.prototype.makeCard = function (modalValues) {
  const card = document.createElement('div');
  card.innerHTML = this.makeCardHTML(modalValues);

  card.querySelector('.js_edit').onclick = () => {
    this.editCard(card, modalValues);
  }
  card.querySelector('.js_delete').onclick = () => {
    this.deleteCard(card);
  }
  return card;
}

User.prototype.makeCardHTML = function (modalValues) {
  return `<div class="card d-flex justify-content-center align-items-center" style="width: 18rem;">
            <div class="modifyCard d-flex align-items-between">
              <button type="button" class="js_edit fas fa-user-edit mx-3"></button>
              <button type="button" class="js_delete fas fa-trash-alt mx-3"></button>
            </div>
            <img class="card-img-top" src="https://picsum.photos/id/237/200/300" alt="Card image cap">
            <div class="card-body d-flex">
              <h5 class="card-title">${modalValues.name}</h5>
            </div>
          </div>`
}

User.prototype.addDOM = function (card) {
  const cardContainers = document.querySelector('#users');
  cardContainers.appendChild(card);
}

User.prototype.editCard = function (card, modalValues) {
  const { modalEmpty } = this.getValues();
  console.log('values', modalEmpty);
  for (const fields in modalEmpty) {
    modalEmpty[fields].value = modalValues[fields];
  };
  const modal = new Modal({
    element: document.querySelector('.js_modal_form'),
    runUser: () => {
      this.setValues(card);
    }
  })
  modal.edit()
}

User.prototype.deleteCard = function (card) {
  const deleteBtn = document.querySelector('.js_delete_user');
  const create = new Modal({
    element: document.querySelector('.js_modal_alert'),
  });
  create.open();
  function deleteBtnAction() {
    card.remove();
    create.close();
  }
  deleteBtn.onclick = deleteBtnAction.bind(this);
}

User.prototype.setValues = function (card) {
  const { modalValues } = this.getValues();
  card.innerHTML = this.makeCardHTML(modalValues);

  card.querySelector('.js_edit').onclick = () => {
    this.editCard(card, modalValues);
  }
  card.querySelector('.js_delete').onclick = () => {
    this.deleteCard(card);
  }
}
