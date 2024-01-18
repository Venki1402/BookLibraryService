// Filename - App.js

import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
} from "react-router-dom";
import "./App.css";
import Create from "./components/Create";
import Edit from "./components/Edit";
import Home from "./components/Home.js";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Header from "./components/Header.js";


function App() {
	return (
		<div className="App">
			<Header />
			{/* <h1 className="label">Book Library</h1> */}
			<Tabs
				defaultActiveKey="home"
				id="uncontrolled-tab-example"
				className="mb-3"
			>
				<Tab eventKey="home" title="Home">
					{/* Tab content for Home */}
					<Home />
				</Tab>

				<Tab eventKey="profile" title="Create">
					<Create />
				</Tab>
				<Tab eventKey="contact" title="Contact" className="contactDetails">
					Ph : +91 80749 62223
					<br></br>
					Mail : saivenkatesh.alampally@gmail.com
				</Tab>
			</Tabs>
		</div>
	);
}

export default App;
