import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'

const Addnote = (props) => {

    const { showAlert } = props;
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: '', description: '', tag: '' });

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        showAlert("Added Successfully", "success");
        setNote({ title: '', description: '', tag: '' });
    }

    const onChangeFunc = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className="my-3">
            <h2>Add a Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" autocomplete="off" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChangeFunc} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" autocomplete="off" className="form-control" id="description" name="description" value={note.description} onChange={onChangeFunc} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" autocomplete="off" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChangeFunc} minLength={2} required />
                </div>
                <button type="submit" disabled={note.title.length < 5 || note.description.length < 5} className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    );
}

export default Addnote
