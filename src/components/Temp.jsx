import React from 'react'

// function Temp({flag}) {
// //     if(flag) return <h1>Flag is true</h1>
// //     else return <h1>Flag is false</h1>
// //   return (
// //     <div>Temp</div>
// //   )

//     // return flag ? <h1>Flag is true</h1> : <h1>Flag is false</h1>

//     // return flag && <h1>Flag is true</h1>
// }

// function Temp() {
//     const handleClick = () => {
//         alert("Hello World")
//     };
//     const handleSubmit = (name) => {
//         alert(`Hello ${name}`)
//     };
//   return (
//     <div>
//         <button onClick={handleClick}>Click</button>
//         <br />
//         <button onClick={() => handleSubmit("John")}>Submit</button>
//     </div>
//   )
// }


import { useState } from 'react'

function Temp() {
    const [score, setScore] = useState(0);
    const incrementScore = () =>{
        setScore(score + 1);
    }
    const decrementScore = () =>{
        setScore(score - 1);
    }
    const setZero = () =>{
        setScore(0);
    }
  return (
    <div>
        {score}
        <p>
            <button onClick={incrementScore}>Increment Score</button>
            <button onClick={decrementScore}>Decrement Score</button>
            <button onClick={setZero}>Zero Score</button>
        </p>
    </div>
  )
}

export default Temp