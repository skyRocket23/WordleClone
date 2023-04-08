import { useState } from "react";

const useWordle = (solution) => {
     
      const [turn,setTurn] = useState(0);
      const [currentGuess,setCurrentGuess] = useState('');
      const [guesses,setGuesses] = useState([...Array(6)]);  // each guess is an array
      const [history,setHistory] = useState([]);  // each guess is a string
      const [isCorrect,setIsCorrect] = useState(false);
      const [usedKeys, setUsedKeys] = useState({}) // {a: 'grey', b: 'green', c: 'yellow'} etc




    // format a guess into an array of letter objects 
    const formatGuess = () => {
      let solutionArray = [...solution];
      let formattedGuess = [...currentGuess].map( (letter) => {
        return {key:letter,color:'grey'}
      });

    //   find green letters 
    formattedGuess.forEach( (letter,index) =>{
        if(solutionArray[index] == letter.key){
            formattedGuess[index].color = 'green';
            solutionArray[index] = null ;
        }
    })


    // find yellow letters 
    formattedGuess.forEach( (letter,index) => {
        if(solutionArray.includes(letter.key) && letter.color !== 'green'){
            formattedGuess[index].color = 'yellow';
            solutionArray[solutionArray.indexOf(letter.key)] = null ;
        }
    })

     return formattedGuess;
    }

    // add new guess to the guess state 
    // update the isCorrect state if the guess is correct 
    // add one to turn the state 
    const addNewGuess = (formatedGuess) => {
        if(currentGuess === solution){
            setIsCorrect(true);
        }

        setGuesses( (prevGuess) => {
            let newGuesses = [...prevGuess];
            newGuesses[turn] = formatedGuess;
            return newGuesses;
        });


        setHistory( (prevHistory) => {
            return [...prevHistory,currentGuess];
        });

        setTurn( (prevTurn) => {
            return prevTurn+1;
        });

        setUsedKeys(prevUsedKeys => {
            formatedGuess.forEach(l => {
                const currentColor = prevUsedKeys[l.key]

                if (l.color === 'green') {
                    prevUsedKeys[l.key] = 'green'
                    return
                }
                if (l.color === 'yellow' && currentColor !== 'green') {
                    prevUsedKeys[l.key] = 'yellow'
                    return
                }
                if (l.color === 'grey' && currentColor !== ('green' || 'yellow')) {
                    prevUsedKeys[l.key] = 'grey'
                    return
                }
            })

            return prevUsedKeys
        })

        setCurrentGuess('');
    }

    // handle keyup event and tracks current guess 
    // if user press enter add the new guess 
    const handleKeyup = ({key}) => {
        console.log('key pressed - ', key);


        if(key === 'Enter'){
            // only add guess if turn is less than or equal to 5
            if(turn > 5){
                // console.log('You used all your guess');
                return;
            }


            // do not allow duplicate word 
            if(history.includes(currentGuess)){
                // console.log('You already guessed this word');
                return;
            }


            // check word if exactly 5 characters 
            if(currentGuess.length !== 5){
                // console.log('Word must be of length 5');
                return;
            }



            // after passing all the checks, format the currentGuess 
            const formatedGuess = formatGuess();
           addNewGuess(formatedGuess);

        }

        if(key === 'Backspace'){
            setCurrentGuess( prev => prev.slice(0,-1) );
            return;
        }

        if (/^[A-Za-z]$/.test(key)){
            if(currentGuess.length < 5){
                setCurrentGuess( prev => prev + key);
            }
        }
    }


    return { turn, currentGuess, guesses, isCorrect, handleKeyup, usedKeys }


}

export default useWordle;