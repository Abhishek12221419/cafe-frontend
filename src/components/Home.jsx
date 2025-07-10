import "./Home.css"
function Home(props){ // or simply pass {name,age} instead of props
  let id = 3453566
  return (
    <>
      <h1 style={{backgroundColor: "Orange", color:"blue"}}>hello {props.name}. you are {props.age} yeas old.</h1>
      <h2 className="App-Home-Header">Your Student Id is {id}</h2>
    </>
  )
}

export default Home;