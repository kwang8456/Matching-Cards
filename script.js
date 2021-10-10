class Card 
{
    constructor (cards)
    {
        this.arr = cards;
        this.score = document.getElementById("numCount");
    }

    /*
     * initialized the game
     */
    startGame ()
    {
        console.log ("Start!");
        this.cardToCheck = null;
        this.count = 0;
        this.matchedCards = [];
        this.busy = false;
        this.removeFlipped ();
        this.shuffle (); 
        this.score.innerHTML = this.count;
        //console.log ("start: " + this.busy);
        //console.log(this.cardToCheck);
    }

    /*
     * flips the card at you clicked on 
     */
    flipCard (card)
    {
        /*
            console.log (card != this.cardToCheck);
            console.log (!this.matchedCards.includes(card));
            console.log ("start: " + this.busy);
        */
        if (!this.busy && card != this.cardToCheck && !this.matchedCards.includes(card))
        {
            this.count++;
            //console.log ("num: " + this.count);
            this.score.innerHTML = this.count;
            /*
             * Adding visible to the card's class so it flips to the other side
             */
            card.classList.add("visible");

            if (this.cardToCheck != null)
            {
                this.checkMatch (card);
                //console.log ("a: " + this.getCardType (this.cardToCheck));
                this.cardToCheck = null;
            }
            else
            {
                this.cardToCheck = card;
                //console.log("f: " + this.getCardType (this.cardToCheck));
            }
        }
        //console.log ("flipped");
    }

    /*
     * check whether two cards match each other
     */
    checkMatch (card)
    {
        if (this.getCardType (card) == this.getCardType (this.cardToCheck))
        {
            //console.log ("checked");
            this.matchedCards.push(card);
            this.matchedCards.push(this.cardToCheck);
            card.classList.add("revealed");
            this.cardToCheck.classList.add("revealed");
            if (this.matchedCards.length == 16)
            {
                this.overlayOn ();
            }
        }
        else
        {
            //console.log ("busy: " + this.busy);
            this.misMatched (card, this.cardToCheck);
            //setTimeout (function () {console.log ("go!");}, 500);
        }
    }

    /*
     * flips the two most recent flipped card back
     */
    misMatched (card1, card2)
    {
        this.busy = true;
        setTimeout (() => {card1.classList.remove("visible"); card2.classList.remove("visible"); this.busy = false;}, 500)
    }

    /*
     * flips all the card back
     */
    removeFlipped ()
    {
        this.arr.forEach (card => {card.classList.remove("visible"); card.classList.remove("revealed");})
    }

    /*
     * changes the order of the cards
     */
    shuffle ()
    {
        for (let i = this.arr.length - 1; i > 0; i--)
        {
            let num = Math.floor (Math.random () * (i + 1));
            this.arr [num].style.order = i;
            this.arr [i].style.order = num;
        }
    }

    /*
     * return source of the card
     */
    getCardType (card)
    {
        return card.getElementsByClassName ("front")[0].src;
    }

    overlayOff ()
    {
        document.getElementById ("overlay").style.display = "none";
        document.getElementById ("beginning").style.display = "none";
        document.getElementById ("overlay1").style.display = "none";
        document.getElementById ("overlay2").style.display = "none";
        document.getElementById ("overlay3").style.display = "none";
    }

    overlayOn ()
    {
        if (this.count == 16)
        {
            document.getElementById ("overlay").style.display = "block";
            document.getElementById ("overlay1").style.display = "block";
        }
        else if (this.count > 16 && this.count <= 35)
        {
            document.getElementById ("overlay").style.display = "block";
            document.getElementById ("overlay2").style.display = "block";
        }
        else
        {
            document.getElementById ("overlay").style.display = "block";
            document.getElementById ("overlay3").style.display = "block";
        }
    }
}

function start ()
{
    /*
     * creates an array for the pokemon cards
     */
    pokemonCards = Array.from (document.getElementsByClassName("card"));
    //console.log(pokemonCards.length);
    pokemonArr = new Card (pokemonCards)
    pokemonArr.startGame ();

    pokemonArr.overlayOff ();
    /*
     * add an "event" or a function to the card so that it will flip over when you click on it
     */
    pokemonCards.forEach (function (card) {card.addEventListener("click", function () {pokemonArr.flipCard(card);})});

}
