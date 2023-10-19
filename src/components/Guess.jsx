import { React, useState, useEffect} from 'react'

export default function Guess(props){

    const [guess, setGuess] = useState("")
    const [inputLetter, setInputLetter] = useState(['', '', '', '', ''])
    const [inputClass, setInputClass] = useState("letter")

    useEffect(() => {
        function renderStyles() {
          if (guess !== "") {
            const updatedInputClass = inputLetter.map((letter, i) => {
              if (props.selectedWord[i] == letter.toUpperCase()) {
                return "letter--correct--position";
              }else if(letter && props.selectedWord.includes(letter.toUpperCase())){
                return "letter--exists";
              }else {
                return "letter";
              }
            });
            setInputClass(updatedInputClass);
          }
        }
        renderStyles();
      }, [guess]);

    function handleOnClick(){
        if(props.tryNumber < props.maxTries){
            const newWord = inputLetter.join('')
            if(validWord(newWord)){
                props.updateTryNumber()
                setGuess(newWord.toUpperCase())
            }else{
                alert("Palavra não existe")
            }
        }
    }

    function handleOnChange(index, letter){
        const updatedLetters = [...inputLetter]
        updatedLetters[index] = letter
        setInputLetter(updatedLetters)
    }

    function handleKeyPress(event){
        const charCode = event.charCode;

        if(charCode >= 48 && charCode <= 57){
            event.preventDefault()
        }
    }

    function validWord(word){
        return props.wordList.includes(word) ? true : false
    }

    function renderLetters(isEditable, activeRow){
        const letters = [];
        for(let i=0; i<5; i++){ 
            let newClass = "";
            if(inputClass[i] == 'letter--correct--position' && activeRow == props.tryNumber - 1){
                newClass = 'letter--correct--position'
            }else if(inputClass[i] == 'letter--exists' && activeRow == props.tryNumber - 1){
                newClass = 'letter--exists'
            }else{
                newClass = 'letter'
            }
            letters.push(   
                <input key={i}
                type="text" 
                className={newClass} 
                maxLength={1} 
                disabled={!isEditable ? true : false}
                onChange={(event) => handleOnChange(i, event.target.value)}
                onKeyPress={handleKeyPress}
                ></input>
            )
        }
        return letters;
    }

    function renderRows(){
        const rows = [];
        for(let i=0; i<props.maxTries; i++){
            rows.push(
                <div key={i} className='guess--row'>
                {i == props.tryNumber ? renderLetters(true, i) : renderLetters(false, i)}
                </div>
            )
        }
        return rows;
    }

    return(
        <div>
            {renderRows()}
            <button className="btn--submit" onClick={handleOnClick}>Submeter</button>
            {props.tryNumber != 0 && <h1>TENTATIVAS: {guess == props.selectedWord ? props.tryNumber : "Tenta outra vez"}</h1>}
        </div>
    )
}