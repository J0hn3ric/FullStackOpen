const Inputs = ({title, onChange, value}) => {
    return(
        <div>
            {title}: <input name={title} onChange={onChange} value={value} />
        </div>
    )
}

export default Inputs