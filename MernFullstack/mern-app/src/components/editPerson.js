
import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react";


//Component
export default function EditPerson ({ people, editPeople, deletePerson }) {


    //hooks from react router dom
    const params = useParams() 
    const id = params.personid;
    // console.log(id)
    const navigate = useNavigate()
    

    //Find User object from the data that matches the Id
   const person = people.find((p) => p._id === id ) //array method to find object matching the id

   //Set user info to the form state
   const [newForm, setNewForm] = useState({
    name: person.name,
    image: person.image,
    title: person.title
    })  //initial form state



   //HANDLERS

   //Handle input changes and set it to form state
   const handleChange = (event) => {
        const newFormValue = {...newForm, [event.target.name]:event.target.value}
        setNewForm(newFormValue)
        //console.log(newForm) //updating state as i type inputs
   }

   //Handle form submission
   const handleSubmit = (event) => {
    event.preventDefault();
    editPeople(newForm, id) //This is a prop. Passing user data & user id
    //console.log(newForm,id)
   }

   //Handle delete method
   const remove = () => {
        deletePerson(person._id) //This is a prop. Passing user id
        navigate('/')
   }
 

    return <div className="form-style">
    <h1>{person.name}</h1>
    <h2>{person.title}</h2>
    <img src={person.image} alt="noimage"/>

    <form onSubmit={handleSubmit}>
        <input
        type="text"
        name="name"
        value={newForm.name}
        placeholder="name"
        onChange={handleChange}
        />
        <input
        type="text"
        name="image"
        value={newForm.image}
        placeholder="image URL"
        onChange={handleChange}
        />
        <input
        type="text"
        name="title"
        value={newForm.title}
        placeholder="title"
        onChange={handleChange}
        />
        <button type="submit">Edit Person</button>
    </form>
    <button id='delete' onClick={remove}>Delete Person</button>
    </div>

}



