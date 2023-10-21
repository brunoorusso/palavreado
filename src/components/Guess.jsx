import { React, useState, useEffect} from 'react'

export default function Guess(props){

    /*
    *
    *   VERIFICAR EXISTÊNCIA DE BUGS
    *                         PRÓXIMOS UPDATES:
    *       1. BUG FIXES
    *       2. MENU SETTINGS
    *       3. INTRODUÇÃO DE FORMA A GUARDAR AS LETRAS (PODE SER ESTILO TECLADO)
    *       4. ANIMAÇÕES
    * 
    */

    const [guess, setGuess] = useState([
        {
          word: "",
          number: 0,
          oldStyle: ['letter', 'letter', 'letter', 'letter', 'letter']
        }
      ]);
    const [inputLetter, setInputLetter] = useState(['', '', '', '', ''])
  
    useEffect(() => {
        function renderStyles(){
            const updatedGuess = guess.slice();
            let lastGuess = guess[guess.length - 1]
            if(guess.length > 1){
                const newStyle = inputLetter.map((letter, index) => {
                    if(letter === props.selectedWord[index]){
                        console.log(`Corrected -> ${letter} = ${props.selectedWord[index]}`)
                        return "letter--correct--position"
                        }else if(letter && props.selectedWord.includes(letter)){
                            console.log(`Exists -> ${letter}`)
                            return "letter--exists"
                        }else{
                            return "letter"
                        }
                    }) 
                
                    if (JSON.stringify(lastGuess.oldStyle) !== JSON.stringify(newStyle)){
                    lastGuess = {
                        ...lastGuess,
                        oldStyle: newStyle
                    }
                    updatedGuess[guess.length - 1] = {
                        ...lastGuess,
                        oldStyle: newStyle
                    }
                    setGuess(updatedGuess)
                    }
        }
    }
    renderStyles()
}, [guess])

    function handleOnClick(){
        if(props.tryNumber < props.maxTries){
            const newWord = inputLetter.join('')
            if(validWord(newWord)){
                setGuess([
                    ...guess,
                    {
                    word: newWord.toUpperCase(),
                    number: props.tryNumber + 1,
                    oldStyle: guess[guess.length - 1].oldStyle
                    }
                ])
                props.updateTryNumber()
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
       const letters = []
       const oldStyle = guess[activeRow + 1]?.oldStyle || []

        for(let i=0; i<5; i++){
            const style = oldStyle[i] || "letter"

            letters.push(
                <input key={i}
                type="text" 
                className={style}
                maxLength={1} 
                disabled={!isEditable ? true : false}
                onChange={(event) => handleOnChange(i, event.target.value)}
                onKeyPress={handleKeyPress}/> //deprecated, ver outra forma depois
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
            {props.tryNumber != 0 && <h1>{guess.word == props.selectedWord ? "TENTATIVAS:" + props.tryNumber : "Tenta outra vez"}</h1>}
            {props.tryNumber == 6 && <h1>RESPOSTA: {props.selectedWord} </h1>}
     
        </div>
    )
}   