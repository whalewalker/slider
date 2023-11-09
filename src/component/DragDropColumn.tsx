import React from "react";
import DragDropCard from "./DragDropCard";
import {StrictModeDroppable} from "./StrictModeDroppable";
import {FileColumnType, FileItemType} from "../util/types";


type DragDropColumnProps = {
    column: FileColumnType;
};

export const DragDropColumn = ({column}: DragDropColumnProps) => {
    return (
        <div className="relative snap-center">


            <StrictModeDroppable droppableId={column?.id.toString()}>
                {(provided: any) => (
                    <ul
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="min-h-[0.5rem]"
                    >
                        {/* list of draggable */}
                        {column.fileItem.map((card: FileItemType, i: number) => (
                            <DragDropCard
                                key={String(card.id)}
                                file={card}
                                columnId={column.id}
                                index={i}
                            />
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </StrictModeDroppable>
        </div>
    );
};

export default DragDropColumn;
