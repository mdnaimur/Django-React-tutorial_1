import '../styles/Home.css';

import { useEffect, useState } from 'react';

import api from '../api';
import Note from '../components/Note';

function Home(){
const [notes,setNotes] = useState([]);
const [content,setContent] = useState("")
const [title,setTitle] = useState("")

useEffect(()=>{
    getNotes();
},[])

const getNotes = () => {
    api.get("/api/notes/")
        .then((res) => {
            setNotes(res.data);
            console.log(res.data);
        })
        .catch((err) => {
            alert(err);
        });
}

const deleteNote = (id) => {
    api.delete(`/api/notes/delete/${id}/`)
        .then((res) => {
            if (res.status === 204) {
                alert("Note deleted!");
                // Optionally update the UI or state here
            } else {
                alert("Failed to delete note");
                // Optionally handle failed deletion differently
            }
            getNotes()
        })
        .catch((err) => {
            alert("An error occurred while deleting the note: " + err);
        });
};

const createNote = (e)=>{
    e.preventDefault()
    api.post("api/notes/",{content,title}).then((res)=>{
        if(res.status ===201 ) alert("Note Created!!")
        else alert("Failed to make note")
        getNotes()
    }).catch((err)=>alert(err))

   setTitle("")
   setContent("")
}

return <>
   <div>
    <h2>Notes</h2>
{notes.map((note)=><Note note= {note} onDelete={deleteNote} key={note.id} />)}

   </div>
   <div>
    <h2>Create Note</h2>
    <form onSubmit={createNote}>
<label htmlFor='title'>Title</label> <br />
<input type='text' id='title' name='title' required onChange={(e)=>setTitle(e.target.value)} value={title} />
<br />
<label htmlFor='content'>Content</label> <br />
<textarea type='text' id='content' name='content' required onChange={(e)=>setContent(e.target.value)} />
<br />
<input type="submit" value="Submit" />
    </form>
   </div>
    </>
}

export default Home