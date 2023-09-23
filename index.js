import { bingoCardsFormatted, drawnNumbers } from "./formattedData.js"

const bingoCards = bingoCardsFormatted
const answer = document.getElementById("answer")

const markedNumber = -1

const checkRowWin = (card) =>
    card.some((row) => row.every((num) => num === markedNumber))

const checkColumnWin = (card) => {
    for (let j = 0; j < card[0].length; j++) {
        const colNumbers = card.map((row) => row[j])
        if (colNumbers.every((num) => num === markedNumber)) return true
    }
    return false
}

const checkWin = (card) => checkRowWin(card) || checkColumnWin(card)

const markNumberOnCard = (card, number) => {
    let found = false
    card.forEach((row) => {
        row.forEach((num, index) => {
            if (num === number) {
                row[index] = markedNumber
                found = true
            }
        })
    })
    return found
}

const findWinningCardIndex = () => {
    const cardsWon = new Array(bingoCards.length).fill(false)
    let lastDrawnNumber
    let winningCardIndex = -1

    for (const number of drawnNumbers) {
        lastDrawnNumber = number

        for (let cardIndex = 0; cardIndex < bingoCards.length; cardIndex++) {
            if (!cardsWon[cardIndex]) {
                const bingoCard = bingoCards[cardIndex]
                if (markNumberOnCard(bingoCard, number)) {
                    if (checkWin(bingoCard)) {
                        cardsWon[cardIndex] = true
                        winningCardIndex = cardIndex
                        console.log(
                            `Number ${number}: Bingo on card ${cardIndex + 1}!`
                        )
                    }
                }
            }
        }

        if (cardsWon.every((status) => status)) break
    }

    return { winningCardIndex, lastDrawnNumber }
}

const calculateFinalScore = (winningCardIndex, lastDrawnNumber) => {
    if (winningCardIndex === -1) {
        console.log("No card has won.")
        return
    }

    const remainingSum = bingoCards[winningCardIndex]
        .flat()
        .filter((val) => val !== markedNumber)
        .reduce((acc, val) => acc + val, 0)

    const finalScore = remainingSum * lastDrawnNumber

    if (answer) {
        answer.innerHTML = `Card ${
            winningCardIndex + 1
        } has won with a sum of ${remainingSum} (multiplied by ${lastDrawnNumber} = ${finalScore}).`
        console.log(answer.innerHTML)
    } else {
        console.error("Element with id 'answer' not found.")
    }
}

const { winningCardIndex, lastDrawnNumber } = findWinningCardIndex()
calculateFinalScore(winningCardIndex, lastDrawnNumber)
