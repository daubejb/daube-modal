const daubeModalTemplate = document.createElement('template');
daubeModalTemplate.innerHTML = `
  <style>

    :host {
      display: block;
      font-size: 1rem;
      font-family: Helvetica, Verdana, sans-serif;
      color: rgba(0,0,0,0.87);
      margin: 0;
      padding: 0;
      z-index: 1;
    }

    :host([hidden]) {
      display: none;
    }

    #daubemodal {
      position: fixed;
      border-radius: 3px;
      box-shadow:  0px 11px 15px -7px rgba(0, 0, 0, 0.2),
                    0px 24px 38px 3px rgba(0, 0, 0, 0.14),
                    0px 9px 46px 8px rgba(0, 0, 0, 0.12);
      padding: 2rem;
      background-color: white;
      margin: auto;
      width: 75%;
      height: 60%;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
    }
    #entirescreen {
      width: 100%;
      height: 100%;
      position: fixed;
      padding: 0;
      margin: 0;
      top: 0;
      left: 0;
      background-color: rgba(0,0,0,0.2);
      z-index: 1;
    }
    #details {
      display: block;
      z-index: 1;
    }
  </style>
  <div id="entirescreen" style="display: none;"></div>
  <div id="daubemodal" style="display: none;">
    <slot name="message" id="message"></slot>
    <slot name="details" id="details"></slot>
    <slot name="positive"></slot>
  </div>
`;

if (window.ShadyCSS) {
  ShadyCSS.prepareTemplate(daubeModalTemplate, 'daube-modal');
}

class DaubeModal extends HTMLElement {
  static get observedAttributes() {
    return ['display'];
  }
  get display() {
    return this.hasAttribute('display');
  }

  set display(val) {
    if (val) {
      this.setAttribute('display', '');
    } else {
      this.removeAttribute('display');
    }
  }
  attributeChangedCallback (atrValue, oldValue, newValue) {
    if (atrValue === 'display') {
      this.toggleDisplay();
      console.log('display toggled');
    }
  }
  constructor() {
    super();

    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(daubeModalTemplate.content.cloneNode(true));
  }
  connectedCallback() {
    var primBtn = this.querySelector(".primary");
    primBtn.addEventListener('click', e => {
      console.log('primary button clicked');
      this.removeAttribute('display');
    });
    if (window.ShadyCSS) {
      ShadyCSS.styleElement(this);
    }
  }

  disconnectedCallback() {
    var primBtn = this.querySelector(".primary");
    primBtn.removeEventListener('click', e => {
      console.log('primary button clicked');
      this.removeAttribute('display');
    });
  }

  toggleDisplay() {
    var daubeModal = this.shadowRoot.querySelector('#daubemodal');
    var entirescreen = this.shadowRoot.querySelector('#entirescreen');
    if (this.display) {
      daubeModal.style.display = 'block';
      entirescreen.style.display = 'block';
    } else {
      daubeModal.style.display = 'none';
      entirescreen.style.display = 'none';
    }
  }

} // Class CustomElement
customElements.define("daube-modal", DaubeModal);