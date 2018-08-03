/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 // swal("Congratulations!!", "Yov've Won", "warning");
let openCount = 0;
let timer = 0;
let moves = 0;
let array = [];
let match = 0;
let list = $('.card');

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

for (let i=0; i<=list.length-1; i++){
    const elem = document.querySelector('.card');
    elem.remove();
}

for (let i=0; i<=list.length-1; i++){
    const elem = document.querySelector('.deck');
    elem.appendChild(newList[i]);
}

list.click(openAndShow);
$('.deck').one('click', function(){
    setInterval(myCounter, 1000);
});

function openAndShow(){
    updateMoves();
    array[openCount] = $(this).find('i').attr("class");
    openCount++;
    list.removeClass('reverse');
    $(this).addClass('open show').unbind('click');
    if(openCount > 1){
        list.unbind('click');
        setTimeout(OnlyTwoCards, 500);
    }
}

function OnlyTwoCards(){
    sameOrNot();
    if(openCount == 2 && match !== 1){
        $('.open.show').not('.match').toggleClass('open show reverse');
        // $('.match').addClass('open show');
    } else if (openCount === 2 && match === 1){
        $('.open.show').addClass('match');
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
}

function myCounter() {
    timer++;
    document.querySelector(".timer").textContent = timer + " " + "  seconds";
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
