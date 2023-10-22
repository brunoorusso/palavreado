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
        const response = await fetch("https://raw.githubusercontent.com/fserb/pt-br/master/dicio") //lista de palavras em formato texto em vez de json
        const data = await response.text() 
        const words = data.split('\n') //dividir os dados por palavras, quando encontra um enter (\n)
        const newData = words.filter(word => word.length === 5) //filtrar só palvras de tamanho 5
        setWordList(newData)

        const randomIndex = Math.floor(Math.random() * newData.length);
        setSelectedWord(newData[randomIndex].toUpperCase());
    }
    fetchData()  
  }, [])

  const updateTryNumber = () => {
    setTryNumber(prevTryNumber => prevTryNumber + 1)
  }


  return (
    <div>
    <div className='game--board'>
      <h1>Palavra: {selectedWord}</h1>
            <Guess  maxTries={MAX_TRIES} 
                    tryNumber={tryNumber} 
                    updateTryNumber={updateTryNumber}
                    selectedWord={selectedWord.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}
                    wordList={wordList}/>
        </div>
    </div>
)
}