import React from 'react'
type Player = "X" | "O" | "BOTH" | null

const Square = ({ value, OnClick,winner}: {
    value: Player,
    winner:Player,
    OnClick:()=>void,
}) => {
    if(!value){
    return <button className='h-20 w-20 cursor-pointer bg-slate-300 text-3xl text-white' onClick={OnClick} disabled={Boolean(winner)}/>
    }
    return <button className={`h-20 w-20 cursor-pointer bg-slate-300 text-3xl text-white square_${value?.toLowerCase()}`} disabled>{value}</button>
}

export default Square