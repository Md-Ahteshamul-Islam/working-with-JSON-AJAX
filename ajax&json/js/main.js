var pageCounter = 1;
var animalContainer = document.getElementById('animal-info');
var btn = document.getElementById('btn');

btn.addEventListener('click', function(){
	var ourRequest = new XMLHttpRequest();
	ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json');

	ourRequest.onload = function(){

		if (ourRequest.status >= 200 && ourRequest.status<400) {	
			var ourData = JSON.parse(ourRequest.responseText);
			renderHTML(ourData);
		}
		else
		{
			console.log('connected to the server bt it returned an error');
		}
	};

	ourRequest.onerror = function(){
		console.log('Connection error');
	}

	ourRequest.send();
	pageCounter++;

	if (pageCounter > 3) {
		btn.classList.add("hide-me");
	}
});

function renderHTML(data){
	var petInfo = "";
	for (i = 0; i < data.length; i++) {
		petInfo += "<p>"+ data[i].name + "is a " + data[i].species +" that likes to eat ";

		for(j = 0; j < data[i].foods.likes.length; j++)
		{
			if (j==0) {
				petInfo += data[i].foods.likes[j];
			}
			else
			{
				petInfo += " and " + data[i].foods.likes[j];
			}
		}

		petInfo += " and dislikes ";

		for(j = 0; j < data[i].foods.dislikes.length; j++)
		{
			if (j==0) {
				petInfo += data[i].foods.dislikes[j];
			}
			else
			{
				petInfo += " and " + data[i].foods.dislikes[j];
			}
		}
		petInfo += ".</p>";
	}
	animalContainer.insertAdjacentHTML('beforeend', petInfo);
}

	