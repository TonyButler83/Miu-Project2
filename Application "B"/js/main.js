/*
Miu Project 1
by: Tony Butler
date: 3/01/2012
term: 1203
*/



window.addEventListener("DOMContentLoaded", function(){
		
	function fn(x){
		var theElement = document.getElementById(x);
		return theElement;
	}

function makeCats(){
	var formTag = document.getElementsByTagName("form"),
		selectLi = fn('select'),
		makeSelect = document.createElement('select');
		makeSelect.setAttribute("id", "groups");
	for(var i=0, j=entryGroups.length; i<j; i++){
		var makeOption = document.createElement('option');
		var optText = entryGroups[i];
		makeOption.setAttribute("value", optText);
		makeOption.innerHTML = optText;
		makeSelect.appendChild(makeOption);
	}
	selectLi.appendChild(makeSelect);
}



function getSelectedRadio(){
	var radios = document.forms[0].sort;
	for(var i=0; i<radios.length; i++){
		if(radios[i].checked){
			sortValue = radios[i].value;
		}
	}
}



	function toggleControls(n){
		switch(n){
			case "on":
				fn('entryForm').style.display = "none";
				fn('clear').style.display = "inline";
				fn('displayLink').style.display = "none";
				fn('addNew').style.display = "inline";
				break;
			case "off":
				fn('entryForm').style.display = "block";
				fn('clear').style.display = "inline";
				fn('displayLink').style.display = "inline";
				fn('addNew').style.display = "none";
				fn('items').style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	
	function storeData(key){
		if(!key){
			var id				= Math.floor(Math.random()*1000000001);
		}else{
			id = key;
		}
	
	getSelectedRadio();
		
		var item			= {};
			item.group		= ["Category:", fn('groups').value];
			item.title		= ["Title:", fn('title').value];
			item.login		= ["Login:", fn('login').value];
			item.pword		= ["Password:", fn('pword').value];
			item.cpword		= ["Confirm Password:", fn('cpword').value];
			item.sort		= ["Sort By:", sortValue];	
			item.usage		= ["Usage:", fn('usage2').value];
			item.date		= ["Date Modified:", fn('dateModified').value];
			item.notes		= ["Notes:", fn('notes').value];
		
		localStorage.setItem(id, JSON.stringify(item));
		alert("Entry Saved!");
}

function getData(){
	toggleControls("on");
	if(localStorage.length === 0){
		autoFillData();
		alert("There are no password entries to display so default data has been added.");
	}
	var makeDiv = document.createElement('div');
	makeDiv.setAttribute("id", "items");
	var makeList = document.createElement('ul');
	makeDiv.appendChild(makeList);
	document.body.appendChild(makeDiv);
	for(var i=0, len=localStorage.length; i<len;i++){
		var makeli = document.createElement('li');
		var linksLi = document.createElement('li');
		makeList.appendChild(makeli);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);
		var makeSubList = document.createElement('ul');
		makeli.appendChild(makeSubList);
		getImage(obj.group[1], makeSubList);
		for(var n in obj){
			var makeSubli = document.createElement('li');
			makeSubList.appendChild(makeSubli);
			var optSubText = obj[n][0]+" "+obj[n][1];
			makeSubli.innerHTML = optSubText;
			makeSubList.appendChild(linksLi);
		}
		makeItemLinks(localStorage.key(i), linksLi);// Create edit and delete button
	}
}

//Get image for correct category
function getImage(groupName, makeSubList){
	var imageLi = document.createElement('li');
	makeSubList.appendChild(imageLi);
	var newImg = document.createElement('img');
	var setSrc = newImg.setAttribute("src", "images/" + groupName + ".png");
	imageLi.appendChild(newImg);
}

	
//Auto Fill Local Storage from Json file.
function autoFillData(){
	for(var n in json){
	var id = Math.floor(Math.random()*1000000001);
	localStorage.setItem(id, JSON.stringify(json[n]));		
	}
}

function makeItemLinks(key, linksLi){
	var editLink = document.createElement('a');
	editLink.href = "#";
	editLink.key = key;
	var editText = "Edit Entry";
	editLink.addEventListener("click", editItem);
	editLink.innerHTML = editText;
	linksLi.appendChild(editLink);
	
	var breakTag = document.createElement('br');
	linksLi.appendChild(breakTag);
	
	var deleteLink = document.createElement('a');
	deleteLink.href = "#";
	deleteLink.key = key;
	var deleteText = "Delete Entry";
	deleteLink.addEventListener("click", deleteItem);
	deleteLink.innerHTML = deleteText;
	linksLi.appendChild(deleteLink);
}

function editItem(){
	//Grab the data from our item from Local Storage.
	var value = localStorage.getItem(this.key);
	var item = JSON.parse(value);
	
	//Show the form
	toggleControls("off");
	
//Populate the form fields with current localStorage values.
	fn('groups').value = item.group[1];
	fn('title').value = item.title[1];
	fn('login').value = item.login[1];
	fn('pword').value = item.pword[1];
	fn('cpword').value = item.cpword[1];
	var radios = document.forms[0].sort;
	for(var i=0; i<radios.length; i++){
		if(radios[i].value == "Category" && item.sort[1] == "Category"){
			radios[i].setAttribute("checked", "checked");
		}else if(radios[i].value == "Title" && item.sort[1] == "Title"){
			radios[i].setAttribute("checked", "checked");
		}else if(radios[i].value == "Usage" && item.sort[1] == "Usage"){
			radios[i].setAttribute("checked", "checked");
		}else if(radios[i].value == "Date Added" && item.sort[1] == "Date Added"){
			radios[i].setAttribute("checked", "checked");
		}		
	}
	fn('usage2').value = item.usage[1];
	fn('dateModified').value = item.date[1];
	fn('notes').value = item.notes[1];

	save.removeEventListener("click", storeData);
	fn('submit').value = "Edit Entry";
	var editSubmit = fn('submit');	
//Save the key value establised in this function as a property of the editSubmit event
//so we can use that value when we save the data we edited.
	editSubmit.addEventListener("click", validate);
	editSubmit.key = this.key;
}

function deleteItem(){
	var ask = confirm("Are you sure you want to delete this entry?");
	if(ask){
		localStorage.removeItem(this.key);
		alert("Entry is deleted!");
		window.location.reload();
	}else{
		alert("Entry was NOT deleted.")
		}
	}
	
function clearLocal(){
	if(localStorage.length === 0){
		alert("There is no data to clear.")
	}else{
		localStorage.clear();
		alert("All password entries have been deleted!");
		window.location.reload();
		return false;
	}
}

function validate(e){
	var getGroup = fn('groups');
	var getTitle = fn('title');
	var getPword = fn('pword');
    var getCpword = fn('cpword');
	
	
//Reset Error Messages	
	errMsg.innerHTML = "";
	getGroup.style.border = "1px solid black";
	getTitle.style.border = "1px solid black";
	getPword.style.border = "1px solid black";
	getCpword.style.border = "1px solid black";
		
	var messageAry = [];
//Category validation
	if(getGroup.value ==="--Select Category--"){
		var groupError = "Please select a category.";
		getGroup.style.border = "1px solid red";
		messageAry.push(groupError);
	}
//Title validation		
	if(getTitle.value === ""){
		var titleError = "Please enter a title."
		getTitle.style.border = "1px solid red";
		messageAry.push(titleError);
	}
//Password validation
	if(getPword.value === ""){
		var pwordError = "Please enter a password."
		getPword.style.border = "1px solid red";
		messageAry.push(pwordError);
	}	
//Confirm Password validation
	if(getCpword.value === ""){
		var cpwordError = "Please retype your password for confirmation."
		getCpword.style.border = "1px solid red";
		messageAry.push(cpwordError);
	
	}
	
////Displays messages on screen	
	if(messageAry.length >= 1){
		for(var i=0, j=messageAry.length; i < j; i++){
			var txt = document.createElement('li');
			txt.innerHTML = messageAry[i];
			errMsg.appendChild(txt);
		}
		e.preventDefault();
		return false;
	}else{
	
		storeData(this.key);
	}
}


//// Check Password function

var getPword = fn('pword');
var getCpword = fn('cpword');
var check = fn('submit');


function checkPword(){
	if(getPword.value != ""){
		getCpword.removeAttribute("disabled", "disabled");
	}else{
		getCpword.setAttribute("disabled", "disabled");
	}
}

function comparePwords(){
	if(getPword.value === getCpword.value){
		
	}else{
		alert("The passwords do not match. Please try again.");
	}
}


var entryGroups = ["--Select Category--", "Computer_Logins", "Email", "Financial", "Online_Shopping", "Personal", "Other"], 
	sortValue,
	errMsg = fn('errors');
;	
	makeCats();

var displayLink = fn('displayLink');
displayLink.addEventListener("click", getData);
var clearLink = fn('clear');
clearLink.addEventListener("click", clearLocal);
var save = fn('submit');
save.addEventListener("click", validate);
getPword.addEventListener("blur", checkPword);
check.addEventListener("click", comparePwords);


});