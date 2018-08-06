"use strict";
let openCount = 0;
let solved = 0; let clock;
let timer = 0;
let moves = 0;
let array = [];
let match = 0;
let list = $('.card');
let sound = document.getElementById('myAudio');

//call shuffle function and store the shuffled array in newList
let newList = shuffle(list);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

let length = list.length-1;
let i = 0;

//Select all the cards in deck, save in elem and remove all cards.
const elem = document.querySelector('.card');
elem.remove();

//Add the new shuffled array to the deck
const newFrag = document.createDocumentFragment();
const deckElem = document.querySelector('.deck');
for (i = 0; i<=length; i++){
    newFrag.appendChild(newList[i]);
}
deckElem.appendChild(newFrag);


//Call openAndShow when clicked on a card.
list.click(openAndShow);

//Start timer when first clicked on deck
$('.deck').one('click', function(){
    clock = setInterval(myCounter, 1000);
});

//Call restart
$('.fa-repeat').click(restart);

//Open the card
function openAndShow(){
    updateMoves();
    // sound.play();
    array[openCount] = $(this).find('i').attr("class");
    openCount++;
    list.removeClass('reverse');
    $(this).addClass('open show').unbind('click');
    if(openCount > 1){
        list.unbind('click');
        setTimeout(OnlyTwoCards, 500);
    }
}

//Check if two card matches and if the whole deck is solved.
function OnlyTwoCards(){
    sameOrNot();
    if(openCount == 2 && match !== 1){
        $('.open.show').not('.match').toggleClass('open show reverse');
        // $('.match').addClass('open show');
    } else if (openCount === 2 && match === 1){
        $('.open.show').addClass('match');
        solved++;
        if (solved == 8){
            clearInterval(clock);
            result();
        }
    }
    openCount = 0;
    list.not('.match').bind('click', (openAndShow));
}

function sameOrNot(){
    if(array[0] === array[1]){
        match = 1;
    } else {
        match = 0;
    }
}

function updateMoves(){
    moves++;
    document.querySelector('.moves').textContent = moves;
    if(moves === 26 || moves === 36){
        updateStars();
    }
}

//Updates the number of stars.
function updateStars(){
    if (moves >= 26 && timer >= 20){
        $('.stars>li:nth-child(1)').remove();

    } else if((moves >= 36 && timer >= 26) || moves >= 45){
        $('.stars>li:nth-child(2)').remove();
    }
}

function myCounter() {
    timer++;
    document.querySelector(".timer").textContent = timer + " " + "  seconds";
}

//displays the result
function result(){
    let howManyStars = (moves >= 36) ? 'img/star.svg' : (moves >= 26) ? 'img/2-stars-symbol.svg' : 'img/3-stars-symbol.svg';
    swal({
        title: "Congratulations!!",
        buttons: {
            Again:{
                text: "Play Again",
                value: "Again",
            },

            Cancel:{
                text: "Cancel",
                value: "Cancel",
            },
        },
        icon: howManyStars,
        className: "swal_icon",
        // text: ""
        text: "Time: " + " " + timer + " seconds" + ", " + " " + " Moves: " + " " + moves
    })
    .then((value) => {
        switch (value){
            case "Again": location.reload();
                          break;

            case "Cancel": break;
        }
    });
}

function restart(){
    location.reload();
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
