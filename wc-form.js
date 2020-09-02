/*

<wc-form id="yourid"></wc-form>

Instance methods:
  drawForm(schema)
  setData(data)
  getData: returns obj

Usage:
  schema: id, label, type[text,dropdown,checkbox]
  data: {"id": value or array}
  
*/

const styles = document.createElement('style');
styles.innerHTML = `
  div {font-family: sans-serif;}
  .label { font-weight: bold; }
  .fld { background-color:#eeeeee; padding:5px; margin:10px; }
`;


//INPUT TEMPLATE
var fhtml = {
  "text":
    `<div class="fld">Enter Input: <span class="label" id="label">My default text</span><br/>
    <input></input></div>`,
  "dropdown":
    `<div class="fld">Choose One: <span class="label" id="label">My default text</span><br/>
    <select></select></div>`,
  "checkbox":
    `<div class="fld">Mark Any: <span class="label" id="label">My default text</span><br/></div>`,
}

//DRAW INPUT //TODO: default, required
var foptions = {
  "dropdown":  function(el, dfld){
    let sel = el.querySelector("select");
    sel.id = dfld.id;
    dfld.choices.forEach(function (item, index) {
      var option = document.createElement("option");
      option.text =item;
      sel.add(option);
    });
    return el;
  },
  "checkbox": function(el, dfld){
     dfld.choices.forEach(function (item, index) {
       let chkbx = htmlToEl("<span><input type='checkbox' name='" + dfld.id + "' value='" + item + "'>" + item + "<br/></span>");
       el.appendChild(chkbx);
     });
     return el;
  },
  "text": function(el, dfld){
    let input = el.querySelector("input");
    input.id = dfld.id;
    return el;
  }
}

//SET INPUT DATA
var fset = {
  "text": function(doc, id, val){
    doc.querySelector("#" + id).value = val;
  },
  "dropdown": function(doc, id, val){
    doc.querySelector("#" + id).value = val;
  },
  "checkbox": function(doc, id, arr){
    let chks = doc.querySelectorAll("input[type='checkbox'][name=" + id + "]");
    chks.forEach(function (n) {
      n.checked = arr.includes(n.value);
    })
  }
}

//GET INPUT DATA
var fget = {
  "text": function(doc, id){
    return doc.querySelector("#" + id).value; //text
  },
  "dropdown": function(doc, id){
    let sel = doc.querySelector("#" + id);
    return sel.options[sel.selectedIndex].value; //dropdown
  },
  "checkbox": function(doc, id){ //checkboxes
    let arr = [];
    let chks = doc.querySelectorAll("input[type='checkbox'][name=" + id + "]");
    chks.forEach(function (n) {
      if (n.checked) arr.push(n.value);
    })
    return arr;
  }
}

//Form web component
class FormComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    if (this.hasAttribute('mode')) this.mode = this.getAttribute('mode');
  }
  drawForm(schema) { //loop schema, draw inputs
    this.schema = schema; //save schema
    this.shadowRoot.innerHTML = ''; //clear
    this.shadowRoot.appendChild(styles.cloneNode(true)); //add styles
    console.log("redraw...");
    for (var i=0; i<schema.length; i++) { //each input
      let el = htmlToEl(fhtml[schema[i].type]); //input template
      el.querySelector("#label").innerText = schema[i].label; //input label
      el = foptions[schema[i].type](el, schema[i]); //input options
      this.shadowRoot.appendChild(el);
    }
  }
  setData(data) { //loop schema, set input values
    let doc = this.shadowRoot;
    this.schema.forEach(function (item, index) { //each input
      fset[item.type](doc, item.id, data[item.id]); //set data
    })
  }
  getData() {
    let doc = this.shadowRoot;
    let data = {};
    this.schema.forEach(function (item, index) { //each input
      data[item.id] = fget[item.type](doc, item.id); //get data
    })
    return data;
  }
}


//assign web components to tags
try {
  customElements.define("wc-form", FormComponent)
} catch (err) {
  console.log(err);
  alert("Sorry, your browser doesn't support webcomponents. Try another browser.");
}
