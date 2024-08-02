import Weather from "../sub-components/Weather"

const SingleOutput = ({ data }) => {

    const getAllLangs = () => {
        const languages = data[0]. languages
        const keys = Object.keys(languages)
        let langs = []

        keys.forEach(key => {
            langs.push(languages[key])
        })
        return langs
    }

    const datas = {
        name: data[0].name.common,
        capitals: data[0].capital,
        area: data[0].area,
        langs: getAllLangs(),
        lat: data[0].capitalInfo.latlng[0],
        lon: data[0].capitalInfo.latlng[1]
        
    }

    return(
        <div>
            <h1>{datas.name}</h1>

            {datas.capitals.map(capital =>
                <p key={capital}>{capital}</p>
            )}
            <p>area {data[0].area}</p>

            <h2>languages</h2>

            <ul>
                {datas.langs.map(language => 
                    <li key={language}>{language}</li>
                )}
            </ul>

            <div>
                <img src={data[0].flags.png} alt={data[0].flags.alt} />
            </div>

            {datas.capitals.map(capital =>
                <Weather key={capital} capital={capital} lat={datas.lat} lon={datas.lon} />
            )}
        </div>
    )
}

export default SingleOutput