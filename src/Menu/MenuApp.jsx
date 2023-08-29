import React from "react";
import { useState } from "react";
import "./index.css";
import Menu from "./Menu";
import Categories from "./Categories";
import items from "./data";

const allCategories= ["all",...new Set( items.map((item)=>item.category))]  //!Gets unique values of category of items
console.log(allCategories);


export default function MenuApp() {
  const [menuItems, setMenuItems] = useState(items);
  const [categories] = useState(allCategories);

  function filterItems(category) {
    if (category === "all") {
      setMenuItems(items);
      return;
    }
    const newItems = items.filter((item) => item.category === category);
    setMenuItems(newItems);
  }

  return (
    <main>
      <section className="menu section">
        <div className="title">
          <h2>Our menu</h2>
          <div className="underline"></div>
        </div>
        <Categories filterItems={filterItems} categories={categories}/>
        <Menu items={menuItems} />
      </section>
    </main>
  );
}
