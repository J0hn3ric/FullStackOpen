const Inputs = ({title, onChange, value}) => {
    return(
        <div>
            {title}: <input onChange={onChange} value={value} />
        </div>
    )
}

export default Inputs