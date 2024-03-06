
const Sum = ({content}) =>{
    const total = content.reduce((sum, part) => sum + part.exercises, 0)

    return(
        <p><b>total of {total} exercises</b></p>
    )
}

export default Sum