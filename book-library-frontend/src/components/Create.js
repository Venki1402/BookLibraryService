// Filename - components/Create.js

import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import array from "./array";
import { v4 as uuid } from "uuid";


function Create() {
	// Making usestate for setting and
	// fetching a value in jsx
	const [bookName, setname] = useState("");
	const [bookAuthor, setauthor] = useState("");

	// Using useNavigation for redirecting to pages


	const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookName: bookName ,bookAuthor:bookAuthor})
    };

	// Function for creating a post/entry
	const handelSubmit = (e) => {
		e.preventDefault(); // Prevent reload

		const ids = uuid(); // Creating unique id
		let uni = ids.slice(0, 8); // Slicing unique id

		// Fetching a value from usestate and
		// pushing to javascript object
		let a = bookName,
			b = bookAuthor;
		if (bookName == "" || bookAuthor == "") {
			alert("invalid input");
			return;
		}
		// array.push({ id: uni, Name: a, Age: b });
		fetch('/api/v1/book/', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ postId: data.bookName}));

		// Redirecting to home page after creation done
		// history("/");
		window.location.reload();
	};

	return (
		<div>
			<Form
				className="d-grid gap-2"
				style={{ margin: "5rem" }}
			>
				{/* Fetching a value from input textfirld 
					in a setname using usestate*/}
				<Form.Group
					className="mb-3"
					controlId="formBasicName"
				>
					<Form.Control
						onChange={(e) =>
							setname(e.target.value)
						}
						type="text"
						placeholder="Enter Book Name"
						required
					/>
				</Form.Group>

				{/* Fetching a value from input textfirld in
					a setage using usestate*/}
				<Form.Group
					className="mb-3"
					controlId="formBasicAge"
				>
					<Form.Control
						onChange={(e) =>
							setauthor(e.target.value)
						}
						type="text"
						placeholder="Enter Book Author"
						required
					/>
				</Form.Group>

				{/* handing a onclick event in button for
					firing a function */}
				<Button
					onClick={(e) => handelSubmit(e)}
					variant="primary"
					type="submit"
				>
					Submit
				</Button>

				{/* Redirecting back to home page */}
				
			</Form>
		</div>
	);
}

export default Create;
