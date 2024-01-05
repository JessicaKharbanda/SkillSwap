import React from "react"
import './home.css'
import blockchain from './images/blockchain.png'
import ai from './images/ai.png'
import dance2 from './images/dance2.png'
import guitar from './images/guitar.png'
import react from './images/react.png'
import purplecoins from './images/purplecoins.png'
import NavigationBar from "./navigation";

function Home(){
    return(
        
        <div>
            <NavigationBar/>
            <div className="background">
                <img src={blockchain} alt="" className="floating-image blockchain"/>
                 <img src={ai} alt="" className="floating-image ai" />
                 <img src={dance2} alt="" className="floating-image dance2" />
                 <img src={guitar} alt="" className="floating-image guitar" />
                 <img src={react} alt="" className="floating-image react" />
                 <img src={purplecoins} alt="" className="floating-image purplecoins" />
            </div>

            <div className="banner">
            <h1 className="heading">SKILLSWAP</h1>
                <h1 className="moto">SHARE LEARN THRIVE</h1>
            </div>
        </div>
    )
}
export default Home;