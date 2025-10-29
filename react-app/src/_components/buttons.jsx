import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function EditBtn({ onEdit }) {
    return (
        <button className="edit__btn" onClick={onEdit}>
            <FontAwesomeIcon icon={faPen} className="icon"></FontAwesomeIcon>
        </button>
    )
}

function DelBtn({ onDelete, id }) {
    return (
        <button className="del__btn" onClick={() => onDelete(id)}>
            <FontAwesomeIcon icon={faTrash} className="icon"></FontAwesomeIcon>
        </button>
    )
}

function ToggleBtn({ completed, id, onToggle }) {
    return (
        <>
            { completed === false ?
                (<button className="toggle__btn" onClick={() => onToggle(id, completed)}>
                    <FontAwesomeIcon icon={faArrowRight} className="icon"></FontAwesomeIcon>
                </button>) :
                (<button className="toggle__btn" onClick={() => onToggle(id, completed)}>
                    <FontAwesomeIcon icon={faArrowLeft} className="icon"></FontAwesomeIcon>
                </button>  
                )
            }
        </>
    )
}

export default function Buttons( {
    completed, 
    children, 
    onDelete, 
    id, 
    startEdit, 
    title,
    editId,
    saveEdit,
    onToggle
}) {

    const isEditing = editId === id;

    return (
        <>
            { completed === false ? 
                (<div className="btn__div">
                    <EditBtn onEdit={() => isEditing ? saveEdit(id) : startEdit(id, title)}></EditBtn>
                    <DelBtn onDelete={onDelete} id={id}></DelBtn>
                    <ToggleBtn completed={false} onToggle={onToggle} id={id}></ToggleBtn>
                </div>) :
                (<div className="completed__div">
                    <ToggleBtn completed={true} onToggle={onToggle} id={id}></ToggleBtn>
                    {children}
                    <div className="btn__div">
                        <EditBtn onEdit={() => isEditing ? saveEdit(id) : startEdit(id, title)}></EditBtn>
                        <DelBtn onDelete={onDelete} id={id}></DelBtn>
                    </div>
                </div>)
            }
        </>
    )
}