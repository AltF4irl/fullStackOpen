const Header = ({name}) => {
    console.log('Header:', name)

    return (
        <h2> {name} </h2>
    )
}

const Part = ({part}) => {
    console.log('Part:', part)

    return (
        <p> {part.name} {part.exercises} </p>
    )
}
  
const Content = ({parts}) => <div>{parts.map(part => <Part part={part} key={part.id} />)}</div>
            
            

const Total = ({totalExercises}) => {
    console.log('Total', totalExercises)
  
    return (
       <b><p>Number of exercises {totalExercises}</p></b>
    )
}

const Course = ({course}) => {
    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total totalExercises={course.parts.reduce((a, c) => {
                console.log('here', a, c);
                return a + c.exercises
            }, 0)} />
        </>
    )
}

export default Course