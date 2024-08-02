import Country from "../sub-components/Country"

const MoreOutputs = ({ datas, setData, setnum }) =>{
    return(
        <>
        <ul>
            {datas.map(data => 
                <Country key={data.name.common} name={data.name.common} setData={setData} 
                            data={data} setnum={setnum} />
            )}
        </ul>
        </>
    )
} 

export default MoreOutputs