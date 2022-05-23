import update from 'immutability-helper'
import { useCallback, useState, setState } from 'react'
import { Card } from './Card.js'
import AuthService from '../../../services/authService'
import axios from 'axios'
const style = {
    width: 400,
}

// function getEvents() {
//     axios.get("localhost:4000/events") => {
//
//     }
// }

export const Container = (props) => {
    {
        let [cards, setCards] =  setState()

        const url = "http://localhost:4000/events"
        axios.get(url)
            .then((Reponse) => {
                [cards, setCards] =  setState(Reponse.data)
                console.log(Reponse.data)

            })
            .catch((error) => {
                console.log(error)
            });

        const moveCard = useCallback((dragIndex, hoverIndex) => {
            setCards((prevCards) =>
                update(prevCards, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, prevCards[dragIndex]],
                    ],
                }),
            )
        }, [])
        const renderCard = useCallback((card, index) => {
            return (
                <Card
                    key={card.id}
                    index={index}
                    id={card.id}
                    format={card.type}
                    path={card.path}
                    moveCard={moveCard}
                />
            )
        }, [])
        return (
            <>
                <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
            </>
        )
    }
}

export default Container
