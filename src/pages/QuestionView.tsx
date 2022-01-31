import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Question from '../components/Question'
import { makeOrder } from '../utils/makeOrder'


export default function QuestionView(){
 const navigate = useNavigate()
 
 const [order, setOrder] = useState<number[]>(makeOrder([1,2,3]))


    return (
        <>
        <Question />
        </>
    )
}