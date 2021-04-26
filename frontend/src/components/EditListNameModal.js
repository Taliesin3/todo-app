import React, { useEffect, useState } from 'react'

function EditListNameModal(props) {
  const [listName, setListName] = useState(props.listName);
  

  useEffect(() => {
    setListName(props.listName)
  }, [props.listName])

  function handleChange(e) {
    const {value} = e.target;
    setListName(value);
  }

  function submitNewListName(e) {
    e.preventDefault();
    props.editListName(listName);
  }
  
  return (
    <div className="modal fade" id="editListNameModal">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit List Name</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form onSubmit={e => submitNewListName(e)} className="edit-list-name-form">
        <div className="modal-body">
            <div className="form-group">
              <input onChange={e => handleChange(e)} className="form-control" type="text" placeholder="List Name" id="list-name-modal-input" autoComplete="off" value={listName}/>
              <div className="invalid-feedback">
                List name cannot be empty
              </div>
            </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
          <button type="submit" className="btn btn-success commit-task-btn" id="submit-edit-list-btn" data-toggle="modal" data-target="#editListNameModal">Submit</button>
        </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default EditListNameModal
