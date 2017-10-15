function renderGameJson() {
	let games = [
	    {'publisher' : 'Namco', 'avatar' : 'https://archive.org/services/img/msdos_Pac-Man_1983', 'subject' : 'Pac-Man', 'body' : 'Pac-Man stars a little, yellow dot-muncher who works his way around to clear a maze of the dots.', 'date' : '1983', 'ifrmSrc' : 'https://archive.org/embed/msdos_Pac-Man_1983'},
	    {'publisher' : 'Broderbund', 'avatar' : 'https://archive.org/services/img/msdos_Where_in_the_World_is_Carmen_Sandiego_1985', 'subject' : 'Where in the World is Carmen Sandiego', 'body' : 'Capture the thief that stole the artifact using clues dealing with your knowledge of geography.', 'date' : '1985', 'ifrmSrc' : 'https://archive.org/embed/msdos_Where_in_the_World_is_Carmen_Sandiego_1985'},
	    {'publisher' : 'Ingenuity', 'avatar' : 'https://archive.org/services/img/msdos_Crosscountry_Canada_1991', 'subject' : 'Crosscountry Canada', 'body' : 'Drive an 18-wheel truck picking up and delivering a variety of commodities with typed-in commands.', 'date' : '1991', 'ifrmSrc' : 'https://archive.org/embed/msdos_Crosscountry_Canada_1991'},
	]; 
	// localStorage.removeItem("gameJson");
	// localStorage.removeItem("trashList");
	if (typeof(Storage) != "undefined") {
	   	if (!localStorage.gameJson) {
	   		  localStorage.setItem("gameJson", JSON.stringify(games));
		}
		renderHtml('inbox');
	} else {
	   alert('Sorry! No Web Storage support..');
	} 
}

function compose(){	
	var composeForm  = document.getElementById("gameComposeForm");	
	var inboxMessage = document.getElementById("main");	
	inboxMessage.style.display = 'none';
	composeForm.style.display = 'block';
	document.getElementById('empty').style.display = 'none';
}

function inbox(){
	var inboxMessage = document.getElementById("main");	
	var composeForm  = document.getElementById("gameComposeForm");	
	inboxMessage.style.display = 'block';
	composeForm.style.display = 'none';
	renderHtml('inbox');
}

function trash(){
	var inboxMessage = document.getElementById("main");	
	var composeForm  = document.getElementById("gameComposeForm");	
	inboxMessage.style.display = 'block';
	composeForm.style.display = 'none';
	renderHtml('trash');
}

function addNewGame() {
	var gameTitle     = document.getElementById('title').value;
	var publisher     = document.getElementById('publisher').value;
	var yearPublished = document.getElementById('yearPublished').value;
	var description   = document.getElementById('description').value;
	var avatorUrl     = document.getElementById('avatorUrl').value;
	var iframeUrl     = document.getElementById('iframeUrl').value;
	if(gameTitle && publisher && yearPublished && avatorUrl && description && avatorUrl && iframeUrl){
		
	} else {
		alert('All fiels are Madatory');
		return false;
	}
	var newGameJson = '{"publisher" : "'+publisher+'", "avatar" : "https://purecss.io/img/common/tilo-avatar.png", "subject" : "'+gameTitle+'", "body" : "'+description+'", "date" : "'+yearPublished+'", "ifrmSrc" : "https://archive.org/embed/msdos_Where_in_the_World_is_Carmen_Sandiego_1985"}';
	if (typeof(Storage) != "undefined") {
	   	if (localStorage.gameJson) {
	   		var games = JSON.parse(localStorage.gameJson).concat(JSON.parse(newGameJson));
	   		localStorage.removeItem("gameJson");
		    localStorage.setItem("gameJson", JSON.stringify(games));
		    renderHtml('inbox');
		}
	} else {
	   alert('Sorry! No Web Storage support..');
	} 
}

function renderHtml(from){
	if(from == 'trash') {
		var jsonType = localStorage.trashList;
	} else {
		var jsonType = localStorage.gameJson;
	}
	if (jsonType) {
		var gamesArray = JSON.parse(jsonType);
		if (localStorage.selectedGameListIndex) {
			var lastSelectedGameListIndex = localStorage.selectedGameListIndex;	
		} else {
			localStorage.setItem("selectedGameListIndex", gamesArray.length);
			var lastSelectedGameListIndex = gamesArray.length;
		}	//console.log(gamesArray);
		if(gamesArray.length){
			var listView = document.getElementById('list');
			listView.innerHTML = '';
			for(var i=gamesArray.length - 1; i>=0; i--){
				var selectedClass = '';
				if(i == lastSelectedGameListIndex){
					selectedClass = 'email-item-selected';
				}
				var gameElements = gamesArray[i];
				var listHtml  = '<div id="'+i+'"class="email-item pure-g '+selectedClass+'" style="cursor:pointer;" onclick="viewGame(this)">';
                    listHtml += '<div class="pure-u">';
                	listHtml += '<img width="64" height="64" alt="'+gameElements.subject+'" class="email-avatar" src="'+gameElements.avatar+'">';
             		listHtml += '</div>';
             		listHtml += '<div class="pure-u-3-4">';
                	listHtml += '<h5 class="email-name">'+gameElements.subject+'</h5>';
                	listHtml += '<h4 class="email-subject">'+gameElements.body+'</h4>';
                 	listHtml += '<p class="email-desc"></p>';
             		listHtml +='</div>';
        			listHtml +='</div>';
    			//var lastHtml = listView.innerHTML;    			
    			listView.innerHTML += listHtml;
    			document.getElementById('empty').style.display = 'none';
    			if(i == lastSelectedGameListIndex){
    				setTimeout(function(){
    					var inboxMessage = document.getElementById("main");	
						var composeForm  = document.getElementById("gameComposeForm");	
						inboxMessage.style.display = 'block';
						composeForm.style.display = 'none';
						
    					document.getElementById('bodyTitle').innerHTML = gamesArray[lastSelectedGameListIndex].subject;
						document.getElementById('bodyPublisher').innerHTML = gamesArray[lastSelectedGameListIndex].publisher;
						document.getElementById('date').innerHTML = gamesArray[lastSelectedGameListIndex].date;
						document.getElementsByTagName('iframe')[0].setAttribute("src", gamesArray[lastSelectedGameListIndex].ifrmSrc);						
						if(from == 'trash') {
							document.getElementById('deletedBtn').innerHTML = 'Deleted';
						} else {
							document.getElementById('deletedBtn').innerHTML = 'Delete';
						}
    				}, 10);					
				}        			
			}
		} else {
			document.getElementById('list').innerHTML = 'Empty';	
			document.getElementById('main').style.display = 'none';	
			document.getElementById('empty').style.display = 'block';
		}
	} else {
		document.getElementById('list').innerHTML = 'Empty';	
		document.getElementById('main').style.display = 'none';	
		document.getElementById('empty').style.display = 'block';
	}
}
function viewGame(obj) {
	document.getElementById('main').style.display = 'block';	
	document.getElementById('empty').style.display = 'none !important';
	var clsElements = document.querySelectorAll(".email-item");
	for(var i=0;i<clsElements.length;i++){
		clsElements[i].classList.remove("email-item-selected");
	}
	obj.className += ' email-item-selected ';
	var id = obj.getAttribute("id");
	var inboxMessage = document.getElementById("main");	
	var composeForm  = document.getElementById("gameComposeForm");	
	inboxMessage.style.display = 'block';
	composeForm.style.display = 'none';
	if (localStorage.gameJson) {
		var gamesArray = JSON.parse(localStorage.gameJson);
		if(gamesArray.length){			
			var gameElements = gamesArray[id];
			document.getElementsByClassName('email-content-title')[0].innerHTML = gameElements.subject;
			document.getElementById('bodyPublisher').innerHTML = gameElements.publisher;
			document.getElementById('date').innerHTML = gameElements.date;
			document.getElementsByTagName('iframe')[0].setAttribute("src", gameElements.ifrmSrc);
		}
		if (typeof(Storage) != "undefined") {
			localStorage.removeItem("selectedGameListIndex");
		   	if (!localStorage.selectedGameListIndex) {
		   		localStorage.setItem("selectedGameListIndex", id);
			}
		} else {
		   alert('Sorry! No Web Storage support..');
		}
	}
}

function deleteList(obj) {
	obj.innerHTML = 'Deleted';
	var clsElements = document.getElementsByClassName("email-item-selected")[0];
	var id = clsElements.getAttribute("id");
	if (localStorage.gameJson) {
		var gamesArray = JSON.parse(localStorage.gameJson);
		if(gamesArray.length){
			var trasharray = [];
			trasharray.push(gamesArray[id]);
		   	if (localStorage.trashList) {					   	
		   		var trashGames = JSON.parse(localStorage.trashList).concat(trasharray);
				trashGames.sort();
		   		localStorage.removeItem("trashList");
			    localStorage.setItem("trashList", JSON.stringify(trashGames));
			} else {
				localStorage.setItem("trashList", JSON.stringify(trasharray));
			}
			gamesArray.splice(id, 1);
			if(gamesArray) {
				localStorage.removeItem("gameJson");
				localStorage.setItem("gameJson", JSON.stringify(gamesArray));
				localStorage.removeItem("selectedGameListIndex");
			   	if (!localStorage.selectedGameListIndex) {
			   		localStorage.setItem("selectedGameListIndex", gamesArray.length - 1);			   		
				}
			}		
			inbox();
		}	
	}
}

