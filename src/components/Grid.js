import React from 'react'

// components
import Row from './Row'

export default function Grid({ guesses, currentGuess, turn }) {
    return (
        <div>
            {guesses.map((guess, index) => {
                if(turn === index){
                    return <Row key={index} currentGuess={currentGuess}/>
                }
                return <Row key={index} guess={guess} />
            })}
        </div>
    )
}