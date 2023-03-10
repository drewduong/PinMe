// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { createBoardThunk } from '../../store/boards';
// import './CreateBoardForm.css';

// const SavePinForm = () => {
//   const history = useHistory()
//   const dispatch = useDispatch()

//   const user = useSelector(state => state.session.user)

//   const [boardId, setBoardId] = useState("")
//   const [hasSubmitted, setHasSubmitted] = useState(false)

//   const [validationErrors, setValidationErrors] = useState([])

//   /* Passive data: dispatch within useEffect
//      Active data, dispatch within onSubmit */

//   useEffect(() => {
//     const errors = []


//     if (!boardId) errors.push("Image url is required")

//     setValidationErrors(errors)
//   }, [boardId])

//   const onSubmit = async (e) => {
//     e.preventDefault()
//     setHasSubmitted(true)

//     if (!validationErrors.length) {
//       const board = {
//         name: name,
//         board_image: boardImage,
//         user_id: user.id
//       }

//       dispatch(createBoardThunk(board))
//       history.push('/boards')
//     }
//   }

//   return (
//     <div className="boarding-container">
//       <form onSubmit={onSubmit} hasSubmitted={hasSubmitted}>
//         <div className="boarding-item">
//           <h2>Create Board</h2>
//           <ul className="errors">
//             {hasSubmitted && validationErrors.length > 0 && validationErrors.map((error, idx) => (
//               <li key={idx}><i class="fa-sharp fa-solid fa-circle-exclamation"></i> {error}</li>
//             ))}
//           </ul>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder='Add your board name'
//             maxLength="30"
//           />
//           <input
//             type="url"
//             value={boardImage}
//             onChange={(e) => setBoardImage(e.target.value)}
//             placeholder='Add your preview image url'
//           />
//           <button type="submit">Create</button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default SavePinForm