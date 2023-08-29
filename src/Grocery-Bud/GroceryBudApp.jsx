import React, { useState,useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
import "./index.css";

const getLocalStorage=()=>{
  let list=localStorage.getItem("list");
  if(list){
    return JSON.parse(localStorage.getItem("list"))
  }
  else return []
}

export default function GroceryBudApp() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      showAlert(true, "danger", "Please Enter Value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          //Iterates through list and checks if id is same as EditId
          if (item.id === editID) {
            //If true changes title to name
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName(""); //Clears out input
      setIsEditing(false);
      setEditID(null);
      showAlert(true, "success", "Item Edited"); //Alerts that item has been edited
    } else {
      showAlert(true, "success", "Item Added");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };
  const clearList = () => {
    showAlert(true, "danger", "Items cleared");
    setList([]); //Sets list as an empty array
  };
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show: show, type: type, msg: msg });
  };
  const removeItem = (id) => {
    showAlert(true, "danger", "Item removed");
    setList(list.filter((item) => item.id !== id)); //Iterates through list and returns which item id is not equal to id
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id); //Finds the item that wants to be edited
    setIsEditing(true);
    setEditID(id); //Gets the id as a global variable
    setName(specificItem.title); //Sets input as item name to be edited
  };
  useEffect(() => {
    localStorage.setItem("list",JSON.stringify(list))
  }, [list])
  

  return (
    <section className="section-center">
      <form action="submit" className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            Clear Items
          </button>
        </div>
      )}
    </section>
  );
}
