import React, { Fragment, useState, useRef, useEffect } from "react";
import {
  useDrag,
  useDrop,
  XYCoord,
  useDragLayer,
  DragSourceMonitor,
} from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import ITEM_TYPE from "../../../data/types";
import "../Styles/Card.css";
const Card = ({ item, ind, moveItem, status, all_cards }) => {
  const ref = useRef(null);

  // useEffect(() => {
  //   console.log("here");
  //   console.log(ref.current);
  // }, [ref]);
  // console.log("hrer");

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      // const dragIndex = item.index;
      const dragIndex = all_cards.findIndex((i) => i.id === item.id);
      const hoverIndex = ind;
      console.log("drag index: ", dragIndex);
      console.log("hover index: ", hoverIndex);
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      const hoverClientY = mousePosition.y - hoveredRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      // item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { ...item },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const className = isDragging ? " dragged-item" : "";
  const [show, setShow] = useState(false);

  const onOpen = () => setShow(true);

  const onClose = () => setShow(false);

  drag(drop(ref));

  return (
    <Fragment>
      <div
        className={`card${className}`}
        ref={ref}
        // style={{ opacity: isDragging ? 0 : 1 }}
        onClick={onOpen}
      >
        <div className="card-title">
          <p className="title">{item.title}</p>
          <p className="title">{item.icon}</p>
        </div>
        <div className="card-avatar">
          <img
            className="avatar"
            src={require("../../../static/images/temp project picture/simurgh.jpg")}
            alt="avatar picture"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Card;
