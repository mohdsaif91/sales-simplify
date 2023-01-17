import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import { Content } from './Content'
import { addCard } from '../../Redux/Slice/card'

import './Container.scss'

const Container = () => {
  const [data, setData] = useState([])
  const wallData = useSelector((state) => state.card.wallData)

  useEffect(() => {
    setData(wallData)
  }, [wallData])

  const dispatch = useDispatch()
  const userData = useSelector((state) => state.user)

  const handleAdd = (e, index, cardLength) => {
    console.log(userData, ' User Data')
    dispatch(addCard({ index: index, id: uuidv4(), userId: userData.user.id }))
  }

  console.log(data)

  return (
    <div className="row wall-row">
      {data.map((m, index) => (
        <Content
          key={index + 'fdfgjkfj'}
          id={m.id}
          section_title={m.section_title}
          cards_data={m.cards_data || []}
          handleAdd={handleAdd}
          index={index}
        />
      ))}
    </div>
  )
}

export default Container
