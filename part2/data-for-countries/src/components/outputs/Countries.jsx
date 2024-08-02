import MoreOutputs from "./MoreOutputs"
import SingleOutput from "./SingleOutput"

const Countries = ({ format, datas, setData, setnum }) => {
    if(format === 0) {
        return(
            <div>
                <p>insert a country</p>
            </div>
        )
    } else if (format > 10) {
        return(
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    } else if ((format <= 10) && (format > 1)){
        return(
            <div>
                <MoreOutputs datas={datas} setData={setData} 
                            setnum={setnum} />
            </div>
        )
    } else if (format === 1) {
        return(
            <div>
                <SingleOutput data={datas} />
            </div>
        )
    }
}

export default Countries