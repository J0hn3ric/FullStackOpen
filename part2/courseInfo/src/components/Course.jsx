import Header from "./course-components/Header"
import Content from "./course-components/Content"
import Sum from "./course-components/Sum"

const Course = ({course}) =>{
    return(
        <>
        <Header title={course.name} />
        <Content content={course.parts} />
        <Sum content={course.parts} />
    </>
    )
    
}

export default Course