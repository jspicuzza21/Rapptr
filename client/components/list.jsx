import React, { useState, useEffect } from 'react';
import { filterList } from '../utils';

const List = (props) => {
  const [searchStr, setSearchStr] = useState('');
  const [newTask, setNewTask] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [toDoList, setToDoList] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [deleteListener, setListener] = useState(false);

  let idx = 0;

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('toDo'));
    if (list !== null) setToDoList(list);
  }, [newTask, deleteListener]);

  useEffect(() => {
    if (searchStr.length > 0) {
      setToDoList(filterList(JSON.parse(localStorage.getItem('toDo')), searchStr));
    } else {
      setToDoList(JSON.parse(localStorage.getItem('toDo')));
    }
  }, [searchStr]);

  const handleNew = () => {
    const newList = JSON.stringify({ ...toDoList, [newTask]: newTask });
    localStorage.setItem('toDo', newList);
    setNewTask('');
  };

  const handleSave = () => {
    localStorage.setItem('toDo', JSON.stringify(toDoList));
    setShowEdit(false);
  };

  const { history } = props;
  return (
    <div className="container">
      <button type="button" onClick={() => history.push('/')}>Logout</button>
      <div>
        <h1>My To-Do List</h1>
        <div className="list-container">
          <div className="list-row">
            <div className="icon-search">
              <input
                className="search-input"
                type="text"
                placeholder="search"
                value={searchStr}
                onChange={(e) => { setSearchStr(e.target.value); }}
              />
              <i className="fa fa-search fa-lg" />
            </div>
            <button type="button" onClick={() => setShowForm(!showForm)}>New</button>
          </div>
          {showForm
            && (
            <div className="list-row">
              <input value={newTask} minLength="1" maxLength="25" onChange={(e) => setNewTask(e.target.value)} />
              <button type="button" onClick={handleNew} style={{ backgroundColor: 'black' }}>Save</button>
            </div>
            )}
          {Object.entries(toDoList).map((elem) => {
            idx += 1;
            if (showEdit[0] && elem[0] === showEdit[1]) {
              return (
                <div className="list-row" key={elem[0]}>
                  <input value={elem[1]} onChange={(e) => setToDoList({ ...toDoList, [elem[0]]: e.target.value })} />
                  <button type="button" onClick={handleSave} style={{ backgroundColor: 'black' }}>Save</button>
                </div>
              );
            }
            return (
              <div className={Object.values(toDoList).length === idx ? 'list-row end' : 'list-row'} key={elem[0]}>
                <h3>{elem[1]}</h3>
                <div className="row-icons">
                  <i className="fa fa-pencil fa-lg" onClick={() => setShowEdit([true, elem[0]])} />
                  <i
                    className="fa fa-trash fa-lg"
                    onClick={() => {
                      delete toDoList[elem[0]];
                      setToDoList(toDoList);
                      setListener(!deleteListener);
                      localStorage.setItem('toDo', JSON.stringify(toDoList));
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>

  );
};

export default List;
