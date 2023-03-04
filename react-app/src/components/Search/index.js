import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPinsThunk } from '../../store/pins'

const Search = () => {
  const dispatch = useDispatch()
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [filter, setFilter] = useState()

  const onSubmit = async (e) => {
    e.preventDefault()
    setHasSubmitted(true)

    await dispatch(getPinsThunk(filter))
  }

  return (
    <form onSubmit={onSubmit} hasSubmitted={hasSubmitted}>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder='Search'
        maxLength="30"
      />
    </form>
  )
}

export default Search