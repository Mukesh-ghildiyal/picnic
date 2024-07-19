import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const UnassignedTasks = ({ unassignedActivities, setUnassignedActivities }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Unassigned Tasks</h2>
      <Droppable droppableId="unassigned-activities">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="p-4 bg-white rounded-lg shadow-md">
            {unassignedActivities.map((activity, index) => (
              <Draggable key={activity.id} draggableId={String(activity.id)} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="p-2 mb-2 bg-blue-100 rounded cursor-pointer"
                  >
                    <div className="font-semibold">{activity.title}</div>
                    <div>{activity.location}</div>
                    <div>{activity.duration}</div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default UnassignedTasks;
