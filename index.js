let deckId = ''
document.getElementById("new-deck").addEventListener('click', function() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id
        })
})

document.getElementById("draw-cards").addEventListener('click', function() {
    if(deckId) {
        fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
            .then(res => res.json())
            .then(data => {
                document.getElementById("card1").src = data.cards[0].image
                document.getElementById("card2").src = data.cards[1].image

            })
    }
    else {
        console.log("Please draw a deck before drawing cards!")
    }
})