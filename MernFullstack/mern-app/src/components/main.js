import {Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import DisplayPeople from './display'
import EditPerson from './editPerson'

// Components: <DisplayPeople/> , <EditPerson/>

export default function Main () {

const [people, setPeople] = useState(null)


const URL = 'http://localhost:4000/people/'


//GET
const getPeople = async() => {
    const response = await fetch(URL) //default get method
    const data = await response.json()
    //console.log(data)
    setPeople(data)  //updating people state with the data retrieved from mongodb
}


//POST | Create
const createPeople = async(person) =>{
    console.log("person: ",person)
   await fetch(URL, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(person)
   });
   //update list of people
   getPeople()
}


//PUT | Edit
const editPeople = async(editedData, personid) => {
    await fetch(URL + personid, {
        method: "put",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedData)
    });
    getPeople()
}


//DELETE | remove
const removePerson = async(removeId) => {
    await fetch(URL+ removeId , {
        method: "delete",
    })
    getPeople();
}


useEffect(()=>{getPeople()},[]) //fetch user data on page load


    return <div>
        <Routes>
            <Route path='/' element={<DisplayPeople people={people} createPeople={createPeople}/>}/>
            <Route path='/people/:personid' 
            element={people?<EditPerson people={people} editPeople={editPeople} deletePerson={removePerson}/> :<h1>Loading...</h1>}/>
        </Routes>
        {/* <button onClick={getPeople}>Fetch Example</button> */}

    </div>
}