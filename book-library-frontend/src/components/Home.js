import React, { useEffect, useState } from 'react';
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import array from "./array";
// import { Link, useNavigate } from "react-router-dom";
import logo from '.././logo.svg';
import '.././App.css';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';




function App() {

    const [books, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [book_id, setbook_id] = useState("103");


    useEffect(() => {
        //setLoading(true);

        fetch('/api/v1/book/')
            .then(response => response.json())
            .then(data => {
                setGroups(data);
                setLoading(false);
            })
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    function setID(id, name, age) {
        localStorage.setItem("id", id);
        localStorage.setItem("Name", name);
        localStorage.setItem("Age", age);
    }

    



    // Function for creating a post/entry
    const handleBorrowAction = (e, bookid, isBarrowed) => {
        const data = new URLSearchParams();

        e.preventDefault(); // Prevent reload


        data.append('book_id', bookid);




        // array.push({ id: uni, Name: a, Age: b });
        if (isBarrowed) {
            const requestOptions = {
                method: 'POST',
                'Content-Type': 'application/x-www-form-urlencoded',
                body: data
            };

            fetch('/api/v1/book/borrow/return', requestOptions)
                .then(response => response.json())
                .then(data => this.setState({ postId: data.book_id }));
        }
        else {
            const requestOptions = {
                method: 'PUT',
                'Content-Type': 'application/x-www-form-urlencoded',
                body: data
            };

            fetch('/api/v1/book/borrow', requestOptions)
                .then(response => response.json())
                .then(data => this.setState({ postId: data.book_id }));
        }


        // Redirecting to home page after creation done
        // history("/");
        window.location.reload();

    };

    // Function for creating a post/entry
    const handleDeleteAction = (e, bookid) => {
        const data = new URLSearchParams();

        e.preventDefault(); // Prevent reload


        data.append('book_id', bookid);




        // array.push({ id: uni, Name: a, Age: b });

        const requestOptions = {
            method: 'POST',
            'Content-Type': 'application/x-www-form-urlencoded',
            body: data
        };

        fetch('/api/v1/book/delete', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ postId: data.book_id }));




        // Redirecting to home page after creation done
        // history("/");
        window.location.reload();

    };









    return (
        <div className="App">
            <div style={{ margin: "1rem" }}>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr className='tableRow'>
                            <th className='bookId'>Book Id</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Actions</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mapping though every element 
                        in the array and showing the 
                        data in the form of table */}
                        {books.map((item) => {

                            if (item.borrowed) {
                                var action = "Return Book";
                                var actionButton = "outline-primary";
                                var ability = true

                            }
                            else {
                                var actionButton = "outline-success";
                                var action = "Borrow Book"
                                var ability = false
                            }
                            return (
                                <tr className='tableRow'>
                                    <td className='bookId'>{item.book_id}</td>
                                    <td>{item.bookName}</td>
                                    <td>{item.bookAuthor}</td>

                                    {/* getting theid,name, and 
                                    age for storing these
                                    value in the jsx with 
                                    onclick event */}
                                    <td className='availability'>
                                        <Button
                                            onClick={(e) => handleBorrowAction(e, item.book_id, item.borrowed)}
                                            variant={actionButton}

                                        >
                                            {action}
                                        </Button>
                                    </td>


                                    {/* Using thr deleted function passing
                                    the id of an entry */}
                                    <td>
                                        <Button
                                            onClick={(e) => handleDeleteAction(e, item.book_id,)}
                                            variant="outline-danger"
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>

                {/* Button for redirecting to create page for
                insertion of values */}
                {/* <Link className="d-grid gap-2" to="/create">
                    <Button variant="warning" size="lg">
                        Create
                    </Button>
                </Link> */}
            </div>



        </div>
    );
}

export default App;
