export default function Modal(opt) {
  this.element = opt.element;
  // function to call Run user from Modal
  this.referenceToUserFunction = opt.runUser;
  this.form = this.element.querySelector('form');
  this.runUserFunction();
}

Modal.prototype.open = function open() {
  // Reseting current form before displaying it
  this.form.reset();
  // Adding show class to modal form to display it
  this.element.classList.add('show');
};

Modal.prototype.close = function close() {
  this.element.classList.remove('show');
};

Modal.prototype.edit = function edit() {
  this.element.classList.add('show');
};

Modal.prototype.runUserFunction = function runUserFunction() {
  this.waitsubmit(this.referenceToUserFunction);
  this.cancelModal();
};

Modal.prototype.waitsubmit = function waitsubmit(RunUser) {
  // If I call the submit() the function the onsubmit won't work
  function submit(e) {
    e.preventDefault();
    this.close();
    new RunUser(this.element);
  }
  this.form.onsubmit = submit.bind(this);
};

Modal.prototype.cancelModal = function cancelModal() {
  const upperCloseBtn = this.element.querySelector('.js_close_upper_corner');
  const lowerCloseBtn = this.element.querySelector('.js_close_modal');
  upperCloseBtn.onclick = this.close.bind(this);
  lowerCloseBtn.onclick = this.close.bind(this);
};
