import './App.css'
import React, { useEffect, useRef, useState } from 'react'
// import useChat from './useChat'
import { Button, Input, message, Tag } from 'antd'

import TopBanner from './TopBanner/TopBanner'

function App() {
	return (
		<div className="App">
			<TopBanner />
			<section>
				<div>
					<iframe src="https://www.google.com/maps/d/embed?mid=1TGX6Qn2n5dsTALZGXVHs3crFe-iZkwZp" width="100%" height="400px"></iframe>
				</div>
				<div>
					<h1>papapapapapa</h1>
				</div>
				<div>
					<button className="button">Taipei</button>
					<button className="button">Taoyuan</button>
					<button className="button">Hsinchu</button>
					<button className="button">Taichung</button>
					<button className="button">Kaohsiung</button>
					<button className="button">Tainan</button>
				</div>
			</section>

		</div>
	);
}

export default App
