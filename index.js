const cards = document.getElementById("cards") 
const newDeck = document.getElementById("new-deck")
const drawCardsBtn = document.getElementById("draw-cards")
const result = document.getElementById("result")
const cardsRemaining = document.getElementById("cards-remaining")
const computerScoreEle = document.getElementById("computer-score")
const myScoreEle = document.getElementById("my-score")
let computerScore = 0
let myScore = 0
let deckId = ''

newDeck.addEventListener('click', function() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id
            updateRemainingCards(data)
            drawCardsBtn.disabled = false
            result.textContent = "Game of War!"
        })
})

drawCardsBtn.addEventListener('click', function() {
    if(deckId) {
        fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
            .then(res => res.json())
            .then(data => {
                const card1 = data.cards[0]
                const card2 = data.cards[1]
                cards.children[0].src = card1.image
                cards.children[1].src = card2.image
                updateRemainingCards(data)
                const resultText = compareCards(card1, card2)
                result.textContent = resultText
                if (!data.remaining){
                    drawCardsBtn.disabled = true
                    if(myScore > computerScore) {
                        result.textContent = "You won the game!"
                    } else if(myScore < computerScore) {
                        result.textContent = "Computer won the game!"
                    } else {
                        result.textContent = "It's a tie game!"
                    }
                }
            })
    }
    else {
        console.log("Please draw a deck before drawing cards!")
    }
})

function compareCards(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const val1 = valueOptions.indexOf(card1.value)
    const val2 = valueOptions.indexOf(card2.value)
    
    if(val1 > val2) {
        computerScore++
        computerScoreEle.textContent = `Computer score: ${computerScore}`
        return "Computer wins!"
    } else if(val1 < val2) {
        myScore++
        myScoreEle.textContent = `My score: ${myScore}`
        return "You win!"
    } else {
        return "It's a War!"
    }
}

function updateRemainingCards(data) {
    cardsRemaining.textContent = `Remaining cards: ${data.remaining}`
}
