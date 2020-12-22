import './Home.css'
import React, { useEffect, useRef, useState } from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";

function Home(){
    const [city, setCity] = useState('');
    const clickCity = (event) => {
		const name = event.target.name;
		//console.log('name = ' + name);
		//console.log('typeof(name) = ' + typeof(name))
		setCity(name);
	}

    return(
        <section className = "Home">
            <div className = "Home-main-picture">
            </div>
            <div>
                <h1>你想去什麼地方</h1>
            </div>
            <div>
                <button className="button" name="taipei" onClick={clickCity}>Taipei</button>
                <button className="button" name="taoyuan" onClick={clickCity}>Taoyuan</button>
                <button className="button" name="hsinchu" onClick={clickCity}>Hsinchu</button>
                <button className="button" name="taichung" onClick={clickCity}>Taichung</button>
                <button className="button" name="kaohsiung" onClick={clickCity}>Kaohsiung</button>
                <button className="button" name="tainan" onClick={clickCity}>Tainan</button>
            </div>
            <div>
                <iframe src="https://www.google.com/maps/d/embed?mid=1TGX6Qn2n5dsTALZGXVHs3crFe-iZkwZp" width="100%" height="400px"></iframe>
            </div>
        </section>
    )
}

export default Home;