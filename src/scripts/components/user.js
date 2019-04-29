import Modal from '../ui/modal';

export function User(modal) {
  this.modal = modal;
  this.form = modal.querySelector('form');
  this.addDOM(this.makeCard(this.getValues().modalValues));
}

export async function getData() {
  const response = await fetch('http://localhost:3000/users');
  const users = await response.json();
  const usersJSON = new User(document.querySelector('.js_modal_form'));
  users.forEach((user) => {
    if (usersJSON.makeCard(user) !== 'noData') {
      usersJSON.addDOM(usersJSON.makeCard(user));
    }
  });
}

User.prototype.manageDB = async function manageDB(id, method) {
  const response = await fetch(`http://localhost:3000/users/${id}`, {
    method: method,
  });
  const users = await response.json();
  users.forEach((user) => {
    if (this.makeCard(user) !== 'noData') {
      this.addDOM(this.makeCard(user));
    }
  });
};

User.prototype.getValues = function getValues() {
  const modalEmpty = {
    name: this.form.querySelector('[data-form="name"]'),
    lastname: this.form.querySelector('[data-form="lastname"]'),
    email: this.form.querySelector('[data-form="email"]'),
    phone: this.form.querySelector('[data-form="phone"]'),
    country: this.form.querySelector('[data-form="country"]'),
    url: this.form.querySelector('[data-form="url"]'),
    aboutme: this.form.querySelector('[data-form="aboutme"]'),
  };
  const modalValues = {
    name: modalEmpty.name.value,
    lastname: modalEmpty.lastname.value,
    email: modalEmpty.email.value,
    phone: modalEmpty.phone.value,
    country: modalEmpty.country.value,
    url: modalEmpty.url.value,
    aboutme: modalEmpty.aboutme.value,
  };
  return {
    modalEmpty, modalValues,
  };
};

User.prototype.makeCard = function makeCard(modalValues) {
  const card = document.createElement('div');
  if (modalValues.name !== '' && modalValues.lastname !== '') {
    card.innerHTML = this.makeCardHTML(modalValues);
    card.querySelector('.js_edit').onclick = () => {
      this.editCard(card, modalValues);
    };
    card.querySelector('.js_delete').onclick = () => {
      this.deleteCard(card, modalValues);
    };
    return card;
  } else { return 'noData'; }
};

User.prototype.makeCardHTML = function makeCardHTML(modalValues) {
  return `<div class="card d-flex justify-content-center align-items-center" style="width: 18rem;">
            <div class="modifyCard d-flex align-items-between">
              <button type="button" class="js_edit fas fa-user-edit mx-3"></button>
              <button type="button" class="js_delete fas fa-trash-alt mx-3"></button>
            </div>
            <img class="card-img-top" src="https://picsum.photos/id/237/200/300" alt="Card image cap">
            <div class="card-body d-flex">
             <h5 class="card-title">${modalValues.name} ${modalValues.lastname} </h5>
            <div class="email">
               <p>${modalValues.phone}</p>
               <p>${modalValues.email}</p>
            </div>
            <p>${modalValues.country}</p>
            <p class="card-text">${modalValues.aboutme}</p>
            <a href="#" class="btn btn-primary">Hire me now!</a>
            </div>
          </div>`;
};

User.prototype.addDOM = function addDOM(card) {
  const cardContainers = document.querySelector('#users');
  if (card !== 'noData') {
    cardContainers.appendChild(card);
  }
};
User.prototype.editCard = function editCard(card, modalValues) {
  const { modalEmpty } = this.getValues();
  for (const fields in modalEmpty) {
    modalEmpty[fields].value = modalValues[fields];
  }
  const modal = new Modal({
    element: document.querySelector('.js_modal_form'),
    runUser: () => {
      this.setValues(card);
    },
  });
  modal.edit();
};

User.prototype.deleteCard = function deleteCard(card, modalValues) {
  const deleteBtn = document.querySelector('.js_delete_user');
  const create = new Modal({
    element: document.querySelector('.js_modal_alert'),
  });
  create.open();
  function deleteBtnAction() {
    card.remove();
    create.close();
    this.manageDB(modalValues.id, 'delete');
  }
  deleteBtn.onclick = deleteBtnAction.bind(this);
};

User.prototype.setValues = function setValues(card) {
  const { modalValues } = this.getValues();
  card.innerHTML = this.makeCardHTML(modalValues);

  card.querySelector('.js_edit').onclick = () => {
    this.editCard(card, modalValues);
  };
  card.querySelector('.js_delete').onclick = () => {
    this.deleteCard(card);
  };
};
