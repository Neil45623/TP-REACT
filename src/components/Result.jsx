import React from 'react'

function Result({ gifs }) {
    console.log(gifs)
    return (
        <div className="grid1">
            {gifs.map(gif => {
                return (
                    <div className="gifs_Tenor" key={gif.id}>
                        <a href={gif.url} target="_blank" rel="noopener noreferrer"><img src={gif.media[0].tinygif.url} alt='' /></a>
                    </div>
                )
            })}
        </div>
    )
}

export default Result;