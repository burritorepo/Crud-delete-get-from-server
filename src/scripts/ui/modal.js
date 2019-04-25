export default function Modal(opt) {
  this.element = opt.element;
  //function to call Run user from Modal
  this.referenceToUserFunction = opt.runUser;
  this.form = this.element.querySelector('form');
  this.runUserFunction();
}

Modal.prototype.open = function () {
  console.log('open', this.element);
  //Reseting current form before displaying it
  this.form.reset();
  //Adding show class to modal form to display it
  this.element.classList.add('show');
};

Modal.prototype.close = function () {
  console.log('close', this.element);
  this.element.classList.remove('show');
};

Modal.prototype.runUserFunction = function () {
  this.waitsubmit(this.referenceToUserFunction);
};

Modal.prototype.waitsubmit = function (runUser) {
  this.form.onsubmit = submit.bind(this); //I didn't use submit() first because it means I'm calling the function and onsubmit won't work
  function submit(e) {
    e.preventDefault();
    this.close();
    new runUser(this.element);
  }
}





