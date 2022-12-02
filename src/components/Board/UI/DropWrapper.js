import React from "react";
import { useDrop } from "react-dnd";
import Card from "./Card";
import Col from "./Col";
import ITEM_TYPE from "../../../data/types";
import { statuses } from "../../../data";

const DropWrapper = ({ onDrop, children, status, lists }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ITEM_TYPE,
    canDrop: (item, monitor) => {
      const itemIndex = lists.findIndex((si) => si.status === item.status);
      const statusIndex = lists.findIndex((si) => si.status === status);
      return itemIndex !== -1 && statusIndex !== -1;
    },
    drop: (item, monitor) => {
      onDrop(item, monitor, status);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={"drop_wrapper-card-list"}>
      {React.cloneElement(children, { isOver })}
    </div>
  );
};

export default DropWrapper;
