# wc-form-generator
Form Generator Web Component

Drop this component on a web page, to automatically generate forms from JSON schema.

You can set and get form data as object.

A simple vanilla javascript component. Customize away...

# HOW TO USE...

```
<wc-form id="myform"></wc-form>

<script>

//Your form schema... supports: text, dropdown, checkbox
var myformschema = [{
  "id": "test1",
  "label": "helo",
  "type": "text"
},
{
  "id": "test2",
  "label": "welcome",
  "type": "dropdown",
  "choices": [0,2,3]
},
{
  "id": "test3",
  "label": "bye",
  "type": "checkbox",
  "choices": [4,5,6]
}

//Your form data
var myformdata = {"test1":"steve","test2":"3","test3":["4","6"]};

//Draw my form
document.getElementById("myform").drawForm( JSON.parse(myformschema) );

//Fill my form data
document.getElementById("myform").setData( JSON.parse(myformdata) );

//Get my form data
var data = document.getElementById("myform").getData();

</script>
```
