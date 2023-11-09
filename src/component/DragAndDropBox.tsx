import React from "react";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import DragDropColumn from "./DragDropColumn";
import {FileColumnType} from "../util/types";

interface DragAndDropBoxProps {
    onUpdateColumnModalId: (columnId: string) => void;
    columnModalId: string;
}

const fileColumns: FileColumnType[] = [];
const DragAndDropBox: React.FC<DragAndDropBoxProps> = () => {

    const onDragEnd = ({destination, source}: DropResult) => {
        // Make sure we have a valid destination
        if (!destination) {
            return;
        }

        // If the source and destination columns are the same
        // AND if the index is the same, the item isn't moving
        if (
            source.droppableId === destination.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // Find the start and end columns
        const startColumn = fileColumns.find((column: FileColumnType) => column.id.toString() === source.droppableId);
        const endColumn = fileColumns.find((column: FileColumnType) => column.id.toString() === destination.droppableId);


        // Make sure we found the start and end columns
        if (!startColumn || !endColumn) {
            console.error('Could not find start or end column');
            return;
        }

        // Get the dragged item from the start column
        const draggedItem = startColumn.fileItem[source.index];

        // If start is the same as end, we're in the same column
        if (startColumn === endColumn) {
            // Move the item within the column
            const newFiles = Array.from(startColumn.fileItem);
            newFiles.splice(source.index, 1);
            newFiles.splice(destination.index, 0, draggedItem);
            const newColumn = {...startColumn, files: newFiles};

        } else {
            // Move the item between columns
            const startFiles = Array.from(startColumn.fileItem);
            startFiles.splice(source.index, 1);
            const newStartColumn = {...startColumn, files: startFiles};

            const endTasks = Array.from(endColumn.fileItem);
            endTasks.splice(destination.index, 0, draggedItem);
            const newEndColumn = {...endColumn, files: endTasks};

        }
    }


    const onDragStart = () => {

    }

    return (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
            {fileColumns.map((column) => (
                <DragDropColumn column={column}/>
            ))}
        </DragDropContext>

    );
};

export default DragAndDropBox;
