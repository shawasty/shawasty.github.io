// create variables for the different suits and their values
const suits =[ '♠', '♥', '♦','♣'];  //obtained from google ('HTML suit symbols')
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

export default class Deck {
    // creat a class to take care of the deck, 
    //constructor takes an arguement of cards because the cars could be anything , either a full
    //52 cards or in my case , 26 for each 
    constructor(cards = freshDeck()) {
        this.cards = cards
    };

    get lenCards(){
        return this.cards.length;
    };

    pop(){
        return this.cards.shift()
    }

    push(card){
        this.cards.push(card)
    }
    shuffle(){
        
        //simple way to suffle
        for (let i = this.lenCards -1; i > 0; i--){
            const newIndex = Math.floor(Math.random() * (i + 1));
            //the following assigns new indexes from the newly gained index to the original
            const oldIndex = this.cards[i];
            this.cards[newIndex] = this.cards[i];
            this.cards[i] = oldIndex;

        }
        // this.cards.sort((a,b)=>Math.random()- .5)
    }
};
// create a class for cards ( since a card can vary from A - K) with an aguements of suit, value
class Card {
    constructor(suit , value){
        this.suit = suit
        this.value = value
    }
    //create a getter fxn that can be called for color anywhere
    get colors(){
        return this.suit === '♣' ||this.suit=== '♠' ? 'black' : 'red';
    }
    //use the following as a guide to create divs dianamically
    //<div class = 'card red data-value = '9 ♣'>
    // ♠
    // </div>
getHTML(){
    let cardDiv = document.createElement('div');
    cardDiv.innerText = this.suit;
    cardDiv.classList.add('card', this.colors);
    //change the number on the card dianamically by:
    cardDiv.dataset.value = `${this.value} ${this.suit}`
    return cardDiv
}

};
function freshDeck(){
    return suits.flatMap(suit =>{
        //flatMap fxn turns 4 different arrays of 13 into one formated array
       return values.map(value =>{
            return new Card(suit, value)
        })
    })
};
