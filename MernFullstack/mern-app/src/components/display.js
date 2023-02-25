import { useState } from "react"
import { Link } from "react-router-dom"

//Component
export default function DisplayPeople ({people, createPeople}) {

    const [newForm, setNewForm] = useState({
        name: '',
        image: '',
        title: ''
    })  //initial form state


    //To Handle input change. Set values to form state
    const handleChange = (event) => {
    const value = {...newForm, [event.target.name]: event.target.value}
    setNewForm(value)
    console.log(value)
    }

    //To Handle form submission
    const handleSubmit =(event)=> {
        event.preventDefault()
        createPeople(newForm) //this is a prop
        setNewForm({
            name: '',
            image: '',
            title: ''
        })

    }


    //This is the JSX to display once I load the data
    const loaded = ()=> {
        return <div>
        {people.map((person) => {
            return <div key={person._id}>
                
                <h1>{person.name}</h1>
                <img src={person.image} alt={person.name} width={200} height={"auto"}/>
                <h3>{person.title}</h3>
                <Link to={`/people/${person._id}`}>
                    Edit
                </Link>
            </div>
        } )}
    </div>
    }

    //Display this JSX if no data or fetching
    const loading = () => {
        return <h1>Loading...</h1>
    }

    return (
        <section className="form-style">
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
                <button type="submit">Create Person</button>
            </form>


           { people? loaded() : loading()}
        </section>
    )
    
}