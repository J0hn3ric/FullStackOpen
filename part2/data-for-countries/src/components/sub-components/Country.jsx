const Country = ({ name, setData, data, setnum }) => {
    const changeData = () => {
        setData(Array(data))
        setnum(1)
    }

    return(
        <>
        <li key={name}>{name}</li> <button key={name.toInt} onClick={changeData}>show</button>
        </>
    )
}

export default Country