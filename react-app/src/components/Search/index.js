import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { getPinsThunk } from '../../store/pins'

const Search = () => {
  const dispatch = useDispatch()
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [filter, setFilter] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setHasSubmitted(true)

    dispatch(getPinsThunk(filter))
  }

  return (
    <div>
      <form onSubmit={onSubmit} hasSubmitted={hasSubmitted}>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder='Search'
          maxLength="30"
        />
      </form>
    </div>
  )
}

export default Search