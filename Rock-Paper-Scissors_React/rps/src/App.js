import React, { useCallback, useEffect, useState } from 'react'
import Rock from './imgs/rock.png'
import Paper from './imgs/paper.png'
import Scissors from './imgs/scissors.png'
import Default from './imgs/picture.png'
import { motion } from "framer-motion"
import {VscGithub} from "react-icons/vsc"


const App = () => {

  const [userChoice, setUserChoice] = useState(null)
  const [computerChoice, setComputerChoice] = useState(null)
  const [result, setResult] = useState('DRAW')
  const choices = ['Rock', 'Paper', 'Scissors']
  const [state, setState] = useState(true)


  const handleClick = (val,event) => {
    setUserChoice(val)
    AiChoice();
    setState(!state)
    
    event.preventDefault()
  }

  const AiChoice = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice)
  }
  const input = userChoice + computerChoice;

  const checkRes = useCallback(() => {
    switch (input) {
      case 'ScissorsPaper':
      case 'RockScissors':
      case 'PaperRock':
        setResult('YOU WIN!')
        break;
      case 'PaperScissors':
      case 'ScissorsRock':
      case 'RockPaper':
        setResult('YOU LOSE!')
        break;
      case 'RockRock':
      case 'PaperPaper':
      case 'ScissorsScissors':
        setResult('DRAW')
        break;
      default:
        break;

    }
  }, [input])

  const getImage = (input) => {
    switch (input) {
      case 'Rock':
        return Rock
      case 'Paper':
        return Paper
      case 'Scissors':
        return Scissors
      default:
        return Default;
    }
  }
  useEffect(() => {
    checkRes();
  }, [computerChoice, userChoice, checkRes])

  return (
    <React.Fragment>
      <h1 className='header'>Rock,Paper,Scissors</h1>

      <div className='container'>
        <div className="card">
          <h4>USER CHOICE:</h4>
          <div className="cardImgContainer">
            <motion.img className='cardImg' src={getImage(userChoice)}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              state={state}
              key={new Date().getTime()}
              alt="epe" />
          </div>
        </div>
        <div className="card">
          <h4>BOT CHOICE:</h4>
          <div className="cardImgContainer">
            <motion.img className='cardImg' src={getImage(computerChoice)}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              alt="epe" state={state}
              key={new Date().getTime()} />
          </div>
        </div>
        {choices.map((choice, index) =>
          <div className="btns">
            <button className="btn" type="submit" ey={index} onClick={() => handleClick(choice)}>
              {choice}
            </button>
          </div>)}
        <h1 className={(result === "DRAW" ? 'ordPanel' :
          result === "YOU WIN!" ? "winPanel" : "losePanel")}>{result}</h1>
      </div>

      <div className="footer">
        <a href="https://github.com/LukeGorgadze">Developer: Luka Gorgadze <VscGithub className='icon'/></a>
        
      </div>
    </React.Fragment>
  )
}


export default App
