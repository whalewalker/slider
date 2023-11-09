import React from "react";
import { Draggable } from "react-beautiful-dnd";
import {FileItemType} from "../util/types";


interface DragDropCardProps {
  columnId: number;
  index: number;
  file: FileItemType
}
const DragDropCard: React.FC<DragDropCardProps> = ({ file, columnId, index }) => {

  const displayTaskModal = () => {
    const newTaskModal = {
      cardId: file.id,
      columnId: columnId,
    };
    localStorage.setItem("activeTaskModal", JSON.stringify(newTaskModal));
  };


  return (
    <Draggable draggableId={String(file.id)} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-color-white rounded-lg  p-3 mb-4 shadow-3xl"
          onClick={displayTaskModal}
        >
          Hello
        </li>
      )}
    </Draggable>
  );
};
export default DragDropCard;
