"use client"
import React, { useEffect, useState } from 'react'
import Square from '../Square/square'

type Player = "X" | "O" | "BOTH" | null

function CalculateWinner(square:Player[]){
    const items = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
    for(let i=0; i<items.length; i++){
        const [a,b,c] = items[i]
        if(
            square[a] &&
            square[a] === square[b] && 
            square[a] === square[c]
        ){
            return square[a]
        }
    }
    return null
}


const Boards = () => {
    const [Squares, setSquares] = useState(Array(9).fill(null))
    const [currentPlayer, setcurrentPlayer] = useState<"X"|"O">(
        Math.round(Math.random()*1)===1?"X":"O"
    )
    const [winner, setwinner] = useState<Player>(null)
    const [start, setStart] = useState(false)

    function reset(){
        setSquares(Array(9).fill(null))
        setwinner(null)
        setcurrentPlayer(Math.round(Math.random()*1)===1?"X":"O")
    }
    function startNow(){
        setStart(!start)
        setSquares(Array(9).fill(null))
        setwinner(null)
        setcurrentPlayer(Math.round(Math.random()*1)===1?"X":"O")
    }
    function setSquaresValue(index:number){
        const newData = Squares.map((val:any,i:any)=>{
            if(i===index){
                return currentPlayer
            }
            return val
        })
        setSquares(newData)
        setcurrentPlayer(currentPlayer==="X"?"O":"X")
    }
    useEffect(()=>{
        let w = CalculateWinner(Squares)
        if(w){
            setwinner(w)
        }
        if(!w && !Squares.filter((square)=>!square).length){
            setwinner("BOTH")
        }
    },[Squares])
    return (
        <div className='flex flex-col items-center my-20'>
            <p className="text-xl font-semibold">Tic Tac Toe</p>
            <button className='p-3 rounded-lg my-2 bg-orange-600 cursor-pointer text-xl' onClick={startNow} disabled={start}>Start Now</button>
            {!winner && <p className={`text-xl font-semibold ${start?"visible":"hidden"}`}>Hey {currentPlayer} its your turn</p>}
            {winner&& winner!=="BOTH" && <h2 className='text-2xl font-bold'>Congratulaions! {winner} </h2>}
            {winner&& winner==="BOTH" && <h2 className='text-2xl font-bold'>Congratulation Match is Draw!</h2>}
            <div className='grid grid-cols-3 gap-2'>
                {Array(9).fill(null).map((_,i)=>(
                    <Square
                    key={i}
                    winner={winner}
                    value={Squares[i]}
                    OnClick={()=>setSquaresValue(i)}
                    />
                ))}
            </div>
            <button className='p-3 rounded-lg my-2 bg-blue-600 cursor-pointer text-xl' onClick={reset}>Reset Now</button>
        </div>
    )
}

export default Boards