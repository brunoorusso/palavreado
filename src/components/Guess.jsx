import { React, useState} from 'react'

export default function Guess(props){

    const [guess, setGuess] = useState("")
    const [inputLetter, setInputLetter] = useState(['', '', '', '', '']);

    function handleOnClick(){
        if(props.tryNumber < props.maxTries){
            const newWord = inputLetter.join('');
            if(validWord(newWord)){
                props.updateTryNumber();
                setGuess(newWord.toUpperCase())
            }else{  
                alert("Palavra não existe")
            }
        }
    }

    function handleOnChange(index, letter){
        const updatedLetters = [...inputLetter];
        updatedLetters[index] = letter;
        setInputLetter(updatedLetters)
    }

    function validWord(word){
        return props.wordList.includes(word) ? true : false
    }

    function renderLetters(isEditable){
        const letters = [];
        for(let i=0; i<5; i++){
            letters.push(
                <input key={i}
                type="text" 
                className="letter" 
                maxLength={1} 
                disabled={!isEditable ? true : false}
                onChange={(event) => handleOnChange(i, event.target.value)}></input>
            )
        }
        return letters;
    }

    function renderRows(){
        const rows = [];
        for(let i=0; i<props.maxTries; i++){
            rows.push(
                <div key={i} className='guess--row'>
                {i == props.tryNumber ? renderLetters(true) : renderLetters(false)}
                </div>
            )
        }
        return rows;
    }

    return(
        <div>
            {renderRows()}
            <button onClick={handleOnClick}>Teste</button>
            <h1>{guess == props.selectedWord ? "Boa" : "Mau"}</h1>
            <h2>Guess: {guess} Props: {props.selectedWord}</h2>
        </div>
    )
}