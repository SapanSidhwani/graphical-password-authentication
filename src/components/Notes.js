// rafc
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = (props) => {

    const { showAlert } = props;
    const context = useContext(NoteContext);
    const [note, setNote] = useState({id:'' ,title: '', description: '', tag: '' });
    const { notes, getNotes, editNote } = context;
    const ref = useRef(null);
    const refClose = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            id: currentNote._id,
            title: currentNote.title, 
            description: currentNote.description, 
            tag: currentNote.tag
        });
    }
    
    
    const handleClick = (e) => {
        e.preventDefault();
        editNote(note.id, note.title, note.description, note.tag)
        refClose.current.click();
        showAlert("Updated Successfully", "success");
    }

    const onChangeFunc = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <> 
            <AddNote showAlert={showAlert} />
            <button type="button" className="visually-hidden btn btn-primary" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" autoComplete="off" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChangeFunc} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" autoComplete="off" className="form-control" id="description" value={note.description} name="description" onChange={onChangeFunc} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" autoComplete="off" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChangeFunc} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" disabled={note.title.length < 5 || note.description.length < 5} onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3 g-2">
                <div className="text-center">
                    <h2>Your Notes</h2>
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return (<NoteItem key={note._id} updateNote={updateNote} showAlert={showAlert} note={note} />);
                })}
            </div>
        </>
    );
}

export default Notes