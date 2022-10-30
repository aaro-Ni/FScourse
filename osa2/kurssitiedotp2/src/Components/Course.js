const Course = (props) => {

    return(
      <>
        <Header course={props.course.name}></Header>
        <Content parts={props.course.parts}></Content>
        <TotalPoints parts={props.course.parts}></TotalPoints>
      </>
    )
  
  }
  
  const TotalPoints = ({parts}) =>{
    const sum = parts.reduce((sum, current) => sum + current.exercises, 0)
    return(
      <>total of {sum} exercises</>
    )
  }
  
  
  
  
  const Header = (props) => {
    return(
    <>
    <h1>{props.course}</h1>
    </>)
  }
  
  const Content = (props) => {
    return(
    <>
      {props.parts.map(part => <Part part={part} key={part.id}></Part>)}
    </>)
  }
  
  const Part = (props) => {
    return(
      <p>{props.part.name} {props.part.exercises}</p>
    )
  }
  
  const Total = (props) => {
    let sum = 0
    for (let i = 0; i<props.parts.length; i++)
    {
      sum = sum + props.parts[i].exercises
    }
    return(
    <>
    <p>Number of exercises {sum}</p>
    </>)
  }
  
  export default Course