import React from "react";

const ListGroup = ({
  items,
  onItemSelect,
  selectedItem,
  valueProperty
}) => {
  return (
    <>
      <ul className="list-group mt-3">
        {items.map((item) => (
          <li
            onClick={() => onItemSelect(item)}
            key={item[valueProperty]}
            className={
              item === selectedItem
                ? "list-group-item active"
                : "list-group-item"
            }
          >
            {item.name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListGroup;
