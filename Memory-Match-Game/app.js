const cards = document.querySelectorAll('.mem-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let trialNumber = 0;
let counter = 0;

function flipCard() {
	
    if (lockBoard) {
		return;
	}
	
    if (this === firstCard) {
		return;
	}

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    } 

    secondCard = this;
    checkForMatch();
		
	trialNumber++;
	document.getElementById("trial").innerHTML = trialNumber + " kere deneme yaptiniz.";
	console.log(counter);
		
	if (counter == 8) {
		document.getElementById("trial").innerHTML = "Tebrikler, " + trialNumber + " denemede oyunu bitirdiniz.";
	}	
}


function checkForMatch(){
	
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework; 
        
	if (isMatch) {
		disableCards();
		counter++;
	}
	
	else {
		unflipCards();
	}
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
	
    lockBoard = true;
	
    setTimeout( function() { 
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
	
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach( function(card) {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
});
})();


cards.forEach( function(card) {
	card.addEventListener('click', flipCard);
});



