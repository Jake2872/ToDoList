let inputField = document.getElementById('inputField');
let addButton = document.getElementById('addItem__button');
let listContainer = document.getElementById('listUL');
let listItem = document.getElementsByClassName('listItem');


let isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    }

}

function removeItem(e) {

if(e.target.className !== "mySpan") return;

    e.target.parentElement.parentElement.removeChild(e.target.parentElement);
     
 }
 listContainer.addEventListener("click", removeItem);


function colorFunction (e) {
    
    e.target.parentElement.style.backgroundColor = `${myTarget.value}`;

    }


function addItem () {

//if text has been entered, execute
if(inputField.value !== "") {
    
let inputFieldValue = inputField.value;
let toDoItem = document.createElement("li"); //everything must be new for creation
let textNode = document.createTextNode(inputFieldValue); //pass a variable
toDoItem.setAttribute("class", "listItem");

toDoItem.appendChild(textNode);

//the "navigator.userAgent.match" is new to me. I've learned about it here: https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser

inputField.value = ""; //clears input field after item is added. Must precede if isMobile 

//only add color picker to android phones (due to higher support)
if(isMobile.Android()) {

let colorPicker = document.createElement('input');
colorPicker.setAttribute("type", "color");
//colorPicker.className = "toggleColorInput";
colorPicker.className = "colorPickerInput";
colorPicker.setAttribute("value", "#bc01a2");
toDoItem.appendChild(colorPicker);

document.getElementsByClassName('colorPickerInput')[0].addEventListener("input", colorFunction);
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

listContainer.addEventListener("click", taskCompleted);

}

} //end of addItem function.


addButton.addEventListener("click", addItem);
// listener for Add button. 


function taskCompleted(e) {

if(e.target.tagName !== "LI") return;

e.target.classList.toggle("liTextLineThrough");

//removeSpan creates the "x" for delete task
let removeSpan = e.target.querySelector(".mySpan");
//removeSpan.classList.toggle("deleteSpan");
removeSpan.classList.toggle("deleteSpan");

removeSpan.addEventListener("click", removeItem(e));

//remove color picker when checked

if( isMobile.Android()) {
let colorPicker = e.target.querySelector(".colorPickerInput");
colorPicker.classList.toggle("removeInput");    

}
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
