import { useState, useEffect } from 'react'
import Guess from './Guess'

const MAX_TRIES = 6;

export default function Game(){

  const [wordList, setWordList] = useState([])
  const [selectedWord, setSelectedWord] = useState("")
  const [tryNumber, setTryNumber] = useState(0)
  

  useEffect(() => {
    /*
    * GET DATA E DÁ RANDOM PARA TER A PALAVRA DO JOGO
    */
    async function fetchData(){
        const response = await fetch("https://gist.githubusercontent.com/un-versed/6373912fbf4649704b6823ea696cfcb1/raw/629137a0d0c7160b94c35013df8d570b31100174/termooo-wordsv2.json")
        const data = await response.json()
        setWordList(data)

        const randomIndex = Math.floor(Math.random() * data.length);
        setSelectedWord(data[randomIndex]);
    }
    fetchData()  
  }, [])

  const updateTryNumber = () => {
    setTryNumber(prevTryNumber => prevTryNumber + 1)
  }


  return (
    <div>
    <div className='game--board'>
        <h1>Olá, palavra selecionada: {selectedWord}</h1>
            <Guess  maxTries={MAX_TRIES} 
                    tryNumber={tryNumber} 
                    updateTryNumber={updateTryNumber}
                    selectedWord={selectedWord.toUpperCase()}
                    wordList={wordList}
                    />
        </div>
    </div>
)
}