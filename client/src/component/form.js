import React, {useState, useEffect} from 'react';
import axios from "axios";

//import Logo from "./logo/Logo";

//import './App.css';

function App() {
  const [artwalks, setArtwalks] = useState([
    {
      name: '',
      bilds: ''
    }
  ])

  const [artwalk, setArtwalk] = useState(
    {
      name: '',
      bilds: ''
    }
  )

  useEffect(() => {
    fetch('/artwalks').then(res => {
      if(res.ok) {
        return res.json()
      }
    }).then(jsonRes => setArtwalks(jsonRes))
  })

  function handleChange(e) {
    const {name, value} = e.target;
    setArtwalk(prevInput => {
      return(
        {
          ...prevInput,
          [name]: value
        }
      )
    })
  }

  function addArtwalk(e) {
    e.preventDefault();
    const newArtwalk = {
      name: artwalk.name,
      bilds: artwalk.bilds
    }

    axios.post('/newartwalk', newArtwalk);
  }

  function deleteArtwalk(id) {
    axios.delete('/delete/' + id);
  }

  return (
    <div className="App" style={{ marginTop: 20 }}>
      <h3>Create Artwalk</h3>
      <form className="formPost">
      <label>ArtWalk: </label>
      <li><input id="Name" onChange={handleChange} name="name" value={artwalk.name}></input></li>
      <label>Bilder: </label>
      <li><input id="Bilds" onChange={handleChange} name="bilds" value={artwalk.bilds}></input></li>
      <li><button  className="btn btn-primary" onClick={addArtwalk}>Add artwalk</button></li>
      </form>
    <hr />
      <h3>Liste der Artwalks</h3>
      {artwalks.map(artwalk => {
        return (
          <div className="formPost">
            <h4 className="h1Title">{artwalk.name}</h4>
            <p className="pDescription">{artwalk.bilds}</p>
            <button onClick={() => deleteArtwalk(artwalk._id)}>Delete</button>
          </div>
        ) 
      })}
    </div>
  );
}

export default App;
