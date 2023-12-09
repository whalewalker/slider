import React, {useEffect, useState} from "react";
import {DragDropContext, Draggable, DropResult} from "react-beautiful-dnd";
import {usePresentation} from "../context/PresentationContext";
import {StrictModeDroppable} from "./StrictModeDroppable";
import {IDraggableColumn, IMedia} from "../util/types";

const ImageList: React.FC = () => {
    const {presentation, setPresentation} = usePresentation();
    const [columns, setColumns] = useState<IDraggableColumn[]>([]);

    // Initialize columns on component mount
    useEffect(() => {
        if (presentation?.mediaList) {
            const numberOfColumn = 5;
            const itemsPerColumn = Math.ceil((presentation.mediaList.length ?? 0) / numberOfColumn);

            const initialColumns: { columnId: number; media: IMedia[] | undefined }[] = Array.from({length: numberOfColumn}, (_, columnIndex) => {
                const startIndex = 1 + columnIndex * itemsPerColumn;
                const endIndex = Math.min(startIndex + itemsPerColumn, presentation.mediaList?.length ?? 0);

                return {
                    columnId: columnIndex + 1,
                    media: presentation.mediaList?.slice(startIndex, endIndex),
                };
            });

            // @ts-ignore
            setColumns(initialColumns);
        }
    }, [presentation?.mediaList]);

    const onDragEnd = (result: DropResult) => {
        // Ensure result.destination is not null or undefined
        if (!result.destination) return;

        const newColumns = [...columns];

        // Ensure source and destination columns exist
        const sourceColumn = newColumns.find((column) => column.columnId.toString() === result.source.droppableId);

        // Ensure result.destination is not null or undefined before accessing result.destination.droppableId
        const destColumn = newColumns.find((column) => column.columnId.toString() === result.destination!.droppableId);

        if (sourceColumn && destColumn) {
            const sourceMedia = sourceColumn.media;
            const destMedia = destColumn.media;

            // Ensure source index is within bounds
            if (result.source.index >= 0 && result.source.index < sourceMedia.length) {
                const [movedItem] = sourceMedia.splice(result.source.index, 1);

                // Ensure destination index is within bounds
                if (result.destination.index >= 0 && result.destination.index <= destMedia.length) {
                    destMedia.splice(result.destination.index, 0, movedItem);
                }

                // Flatten the columns into a single mediaList array
                const updatedMediaList = newColumns.reduce(
                    (acc: IMedia[], column: IDraggableColumn) => [...acc, ...column.media.filter((item) => item !== undefined)],
                    []
                );

                // Update the position of each media item
                const updatedMediaListWithPosition = updatedMediaList.map((media, index) => ({
                    ...media,
                    position: index,
                }));

                // Update both state variables together
                setColumns(newColumns);
                setPresentation({ ...presentation, mediaList: updatedMediaListWithPosition });
            }
        }
    };






    return (
        <DragDropContext onDragEnd={onDragEnd} >
            <div>
                {columns.map((column) => (
                    <StrictModeDroppable key={column.columnId} droppableId={column.columnId.toString()} direction="horizontal">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" // Adjust based on your design
                            >
                                {column.media.map((media, index) => (
                                    <Draggable key={media.id} draggableId={media.id.toString()} index={index}>
                                        {(provided) => (
                                            <div
                                                className="flex-shrink-0"
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                                style={{
                                                    ...provided.draggableProps.style,
                                                    margin: "8px",
                                                }}
                                            >
                                                <div className="border border-gray-300 p-2 rounded-md">
                                                    <img
                                                        src={media.path.replace(/&export=download/, "")}
                                                        alt={`${media.id}`}
                                                        className="w-full h-auto"
                                                    />
                                                    <p className="text-center mt-2">Position: {media.position}</p>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </StrictModeDroppable>
                ))}
            </div>
        </DragDropContext>
    );
};

export default ImageList;
