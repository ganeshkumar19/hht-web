import { createContext, useContext, useState } from "react";
import BAR1 from '../assets/images/tamn.png'
import BAR2 from '../assets/images/then.png'
import BAR3 from '../assets/images/maan.png'


const ShortFlimsContext= createContext()

export const FlimProvider = ({children})=>{
    const [shortFlims] = useState([
        {
            id: 1,
            src: BAR1,
            title: 'Tamizhi',
            episodes: [
              { episodeId: 101, name: 'Tamizhi Episode 1', link: 'episode-link-1', epSrc: BAR1 },
              { episodeId: 102, name: 'Tamizhi Episode 2', link: 'episode-link-2', epSrc: BAR1 }
            ]
          },
          {
            id: 2,
            src: BAR2,
            title: 'Theeveeran',
            episodes: [
              { episodeId: 201, name: 'Theeveeran Episode 1', link: 'episode-link-1', epSrc: BAR2 },
              { episodeId: 202, name: 'Theeveeran Episode 2', link: 'episode-link-2', epSrc: BAR2 }
            ]
          },
          {
            id: 3,
            src: BAR3,
            title: 'Maanavan',
            episodes: [
              { episodeId: 301, name: 'Maanavan Episode 1', link: 'episode-link-1',  epSrc: BAR3 },
              { episodeId: 302, name: 'Maanavan Episode 2', link: 'episode-link-2',  epSrc: BAR3}
            ]
          }

    ])

    return(
        <ShortFlimsContext.Provider value={{shortFlims}}>
            {children}
        </ShortFlimsContext.Provider>
    )
}

export const useShortFlims = ()=> useContext(ShortFlimsContext)
