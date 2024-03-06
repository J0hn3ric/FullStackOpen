import Part from "./content-comps/Part"


const Content = ({content}) =>{
    return(
        <>
        {content.map(content =>
            <Part key={content.id} part={content.name} exercises={content.exercises} />
            )}
    </>
    )
}

export default Content