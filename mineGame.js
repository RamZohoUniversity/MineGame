alpha = ['A','B','C','D','E','F','G','H'];
score = 0;

/*	createSmallDiv() for create 64 small div than append the main div										*/

function createSmallDiv()
{
	container = document.getElementById('smallContainDiv');
	document.getElementById('thinkingImg').src = "images/thinking.gif";
	while(container.firstChild)
	{
		container.removeChild(container.firstChild)
	}
	smallDivIdList = new Array();
	for (var i = 0; i < 8; i++) 
	{
		var temp = new Array();
		for (var j = 0; j < 8; j++) 
		{
			smallDiv = document.createElement('div');
			smallDiv.className = "smallDiv";
			smallDiv.setAttribute("onClick" , "getBombPosition(this)");
			smallDiv.id = alpha[i]+(j+1);
			smallDiv.style.marginLeft = 55*j +"px";
			smallDiv.style.marginTop = 55*i +"px";
			container.appendChild(smallDiv);

			temp.push(alpha[i]+(j+1));
		}
		smallDivIdList.push(temp);
	}

	getNumberOfBomb();
}

/*	getNumberOfBomb() gaves how many BOMBS to Create in this game; It's return the value to setBombImage()	*/

function getNumberOfBomb() 
{
	numberOfBomb = null;
	while(numberOfBomb == null)
	{
		var temp = parseInt(Math.random()*100);
		if (temp >= 10 && temp <= 15) {
			numberOfBomb = temp;
		}
	}
	document.getElementById('noOfBomeDiv').innerHTML = numberOfBomb + " Bombs are there";
	setBombImage();
}

/*	setBombImage() for create a image tag and set the Bomb image											*/

function setBombImage() 
{
	while(numberOfBomb > 0)
	{
		x = parseInt(Math.random()*10);
		y = parseInt(Math.random()*10);
		if (x < 8 && y < 8) 
		{
			tempId = smallDivIdList[x][y];
			bombImg = document.createElement('img');
			bombImg.className = "bombImage";
			bombImg.src = "images/bomb.jpg";

			if (document.getElementById(tempId).firstChild == null) {
				numberOfBomb--;

				document.getElementById(tempId).appendChild(bombImg);
			}
		}
	}
	setTimer();
}

/*	setTimer() using countdown; It's break the after 180 Sec (3 Minutes) 									*/

function setTimer () 
{
	timer = 1;
	timerInterval = setInterval(function()
	{
		document.getElementById('timerDiv').innerHTML = timer + " Sec";

		if (timer == 181) 
		{
			clearInterval(timerInterval);
			document.getElementById('thinkingImg').src = "images/gameOver.gif"
			document.getElementById('timerDiv').innerHTML = "Time out";
			confirmation = confirm("Time out\nYou want to play New Game");
			if (confirmation == true) 
			{
				createSmallDiv();
			}
		}
		timer++;
	},1000);
}

/*	checkValues() for selectBox	accessing; It's contain NewGame, +30 Sec, resetTimer						*/

function checkValues (getIt) 
{
	var accessValue = getIt.value;
	if (accessValue == "newGame") 
	{
		clearInterval(timerInterval);
		document.getElementById('scoreDiv').innerHTML = '';
		createSmallDiv();
	}
	else if(accessValue == "timerPlus30")
	{
		if (timer > 35) 
		{
			timer -= 30;
		}
	}
	else if(accessValue == "resetTimer")
	{
		if (timer > 100) 
		{
			timer = 1;
		}
	}
}

/*	Below function are very i portant function for this Game												*/
/*	getBombPosition() using for checking bomb in current position and left, right position 					*/

function getBombPosition (getIt) 
{
	if(getIt.firstChild == "[object HTMLImageElement]")
	{
		isBomb();
	}
	else
	{
		score += 500;
		numberOfBombRoundIt = 0;
		frontBack = [];
		getIt.style.boxShadow = "0 0 10px black inset";
		getIt.setAttribute("onClick",null);
		accessId = getIt.id.split('');
		if (parseInt(accessId[1]) < 8) 
		{
			frontImg = document.getElementById(accessId[0]+(parseInt(accessId[1])+1));
			if (frontImg.firstChild == "[object HTMLImageElement]")
			{
				numberOfBombRoundIt++;
			}
			else
			{
				frontImg.style.boxShadow = "0 0 10px black inset";
				score += 500;
			}
			frontBack[0] = true;
		}
		if (parseInt(accessId[1]) > 1) 
		{
			backImg = document.getElementById(accessId[0]+(parseInt(accessId[1])-1));
			if (backImg.firstChild == "[object HTMLImageElement]")
			{
				numberOfBombRoundIt++;
			}
			else
			{
				backImg.style.boxShadow = "0 0 10px black inset";
				score += 500;
			}
			frontBack[1] = true
		}
		getBombPositionTop(getIt);
	}
}

/*	getBombPositionTop() using for checking bomb in top current position and left, right position			*/

function getBombPositionTop (getIt) 
{
	if (accessId[0].charCodeAt(accessId[0]) > 65) 
	{
		topCurrentPosnImg = document.getElementById(String.fromCharCode(accessId[0].charCodeAt(accessId[0])-1)+accessId[1]);
		if (topCurrentPosnImg.firstChild == "[object HTMLImageElement]")
		{
			numberOfBombRoundIt++;
		}
		else{
			topCurrentPosnImg.style.boxShadow = "0 0 10px black inset";
			score += 500;
		}
		if (frontBack[0] == true) 
		{
			topFrontImg = document.getElementById(String.fromCharCode(accessId[0].charCodeAt(accessId[0])-1)+(parseInt(accessId[1])+1));
			if (topFrontImg.firstChild == "[object HTMLImageElement]")
			{
				numberOfBombRoundIt++;
			}
			else
			{
				topFrontImg.style.boxShadow = "0 0 10px black inset";
				score += 500;
			}
		}
		if (frontBack[1] == true) 
		{
			topBackImg = document.getElementById(String.fromCharCode(accessId[0].charCodeAt(accessId[0])-1)+(parseInt(accessId[1])-1));
			if (topBackImg.firstChild == "[object HTMLImageElement]")
			{
				numberOfBombRoundIt++;
			}
			else
			{
				topBackImg.style.boxShadow = "0 0 10px black inset";
				score += 500;
			}
		}
	}
	getBombPositionBottom(getIt);
}

/*	getBombPositionBottom() using for checking bomb in bottom current position and left, right position		*/

function getBombPositionBottom (getIt) 
{
	if (accessId[0].charCodeAt(accessId[0]) < 72) 
	{
		bottomCurrentPosnImg = document.getElementById(String.fromCharCode(accessId[0].charCodeAt(accessId[0])+1)+accessId[1]);
		if (bottomCurrentPosnImg.firstChild == "[object HTMLImageElement]")
		{
			numberOfBombRoundIt++;
		}
		else
		{
			bottomCurrentPosnImg.style.boxShadow = "0 0 10px black inset";
			score += 500;
		}
		if (frontBack[0] == true) 
		{
			bottomFrontImg = document.getElementById(String.fromCharCode(accessId[0].charCodeAt(accessId[0])+1)+(parseInt(accessId[1])+1));
			if (bottomFrontImg.firstChild == "[object HTMLImageElement]")
			{
				numberOfBombRoundIt++;
			}
			else{
				bottomFrontImg.style.boxShadow = "0 0 10px black inset";
				score += 500;
			}
		}
		if (frontBack[1] == true) 
		{
			bottomBackImg = document.getElementById(String.fromCharCode(accessId[0].charCodeAt(accessId[0])+1)+(parseInt(accessId[1])-1));
			if (bottomBackImg.firstChild == "[object HTMLImageElement]")
			{
				numberOfBombRoundIt++;
			}
			else{
				bottomBackImg.style.boxShadow = "0 0 10px black inset";
				score += 500;
			}
		}
	}
	setScore (getIt);
}

/*	setScore() for calculate score and apply the score div													*/

function setScore (getIt) 
{
	if (numberOfBombRoundIt > 0) 
	{
		getIt.innerHTML = numberOfBombRoundIt;
	}
	else{
		getIt.innerHTML = "luck";
	}
	document.getElementById('scoreDiv').innerHTML = "Score: "+ score;
}

/*	isBomb() for onClicked position as like as bomb than visible all the bomb image and break the game		*/

function isBomb() 
{
	document.getElementById('thinkingImg').src = "images/gameOver.gif"
	clearInterval(timerInterval);
	for (var i = 0; i < smallDivIdList.length; i++) 
	{
		for (var j = 0; j < smallDivIdList.length; j++) 
		{
			if (document.getElementById(smallDivIdList[i][j]).firstChild == "[object HTMLImageElement]") 
			{
				document.getElementById(smallDivIdList[i][j]).firstChild.style.visibility = "visible";
			}
			document.getElementById(smallDivIdList[i][j]).setAttribute("onClick",null);
		}
	}
}
