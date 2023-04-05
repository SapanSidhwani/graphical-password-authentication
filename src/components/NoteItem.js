import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {

    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote, showAlert } = props;
    return (
        <div className='col-auto'>
            <div className="card h-100" style={{ minWidth: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-pen-to-square" onClick={() => { updateNote(note); }}></i>
                    <i className="ms-2 fa-solid fa-trash-can" onClick={() => { deleteNote(note._id); showAlert("Deleted Successfully", "success"); }}></i>
                </div>
            </div>
        </div>
    );
}

export default NoteItem
