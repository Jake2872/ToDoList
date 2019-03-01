let inputField = document.getElementById('inputField');
let addButton = document.getElementById('addItem__button');
let listContainer = document.getElementById('listUL');
let listItem = document.getElementsByClassName('listItem');


function removeItem(unDo) {
if(unDo.target.className !== "mySpan") return;


    unDo.target.parentElement.parentElement.removeChild(unDo.target.parentElement);
 
 console.log("TypeError: f is null: However, the node was obviously found because it's the only way this function works (and removes its parentElement)");
 
 
     
 }
 listContainer.addEventListener("click", removeItem);


function colorFunction (myParam) {

    let myTarget = myParam.target;
    
    myTarget.parentElement.style.backgroundColor = `${myTarget.value}`;

    }


function addItem () {
//if text has been entered, execute
if(inputField.value !== "") {
    
let inputFieldValue = inputField.value;
let toDoItem = document.createElement("li"); //everything must be new for creation
let textNode = document.createTextNode(inputFieldValue); //pass a variable
toDoItem.setAttribute("class", "listItem");

toDoItem.appendChild(textNode);



let colorPicker = document.createElement('input');
colorPicker.setAttribute("type", "color");
colorPicker.className = "toggleColorInput";

toDoItem.appendChild(colorPicker);

//the "navigator.userAgent.match" is new to me. I've learned about it here: https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser

inputField.value = ""; //clears input field after item is added. Must precede if isMobile 

let isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    }

}

if( isMobile.Android()) {
colorPicker.className = "colorPickerInput";
    colorPicker.setAttribute("value", "#bc01a2");
}

//deleteButtonSpan refers to the "x" that appears after user touches list item
let deleteButtonSpan = document.createElement("span");
let deleteTextNode = document.createTextNode("X");
deleteButtonSpan.setAttribute("class", "mySpan deleteSpan"); 
// "deleteSpan" class hides x until li is tapped, and is when it's removed/toggled. 
deleteButtonSpan.appendChild(deleteTextNode);
toDoItem.appendChild(deleteButtonSpan);

listContainer.insertBefore(listContainer.appendChild(toDoItem), listItem[0]);
//place new listItems on top (first)


console.log("TypeError line 78: produces an error for non-android browsers, because they have the color input displayed as none with css... Note to self: Target nodes in a non-lineage-dependent way in future.");
document.getElementsByClassName('colorPickerInput')[0].addEventListener("input", colorFunction);

listContainer.addEventListener("click", taskCompleted);

}

} //end of addItem function.


addButton.addEventListener("click", addItem);
// listener for Add button. 


//taskCompleted is called when person taps listItem. Produces line-through, hides colorInput and reveals "x" to allow person to delete it completely. 
function taskCompleted(e) {

if(e.target.tagName !== "LI") return;

e.target.classList.toggle("liTextLineThrough");

//removeSpan creates the "x" for delete task
let removeSpan = e.target.lastElementChild;
removeSpan.classList.toggle("deleteSpan");
removeSpan.addEventListener("click", removeItem(e));

//remove color picker when checked
let colorPicker = e.target.firstElementChild;
colorPicker.classList.toggle("removeInput");    

} 

listContainer.addEventListener("click", taskCompleted);


function addByEnterKey (e) {

    if(e.key !== "Enter") return;
    
    addItem();
}
inputField.addEventListener('keydown', addByEnterKey);


//plusDiv is the (green +) button at the bottom and brings input into focus in order to bring up keyboard in touch devices.
let plusDiv = document.getElementById("plusDivID");

function gainFocus(e) {
    
    inputField.focus();
}

plusDiv.addEventListener("click", gainFocus);


function hidePlusOnFocus () {

   plusDiv.classList.add("transparentPlusToggle");
//class is removed in next function once input is "focusout"
}

inputField.addEventListener("focus", hidePlusOnFocus);

function displayPlusOnFocusLoss(e) {

    plusDiv.classList.remove("transparentPlusToggle");
    
}
inputField.addEventListener("focusout", displayPlusOnFocusLoss);
