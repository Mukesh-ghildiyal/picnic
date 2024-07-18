// DayView.js
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ActivityForm from './ActivityForm';
import 'tailwindcss/tailwind.css';
import Overview from './Overview';

const DayView = () => {
  const [activities, setActivities] = useState([]);
  const [unassignedActivities, setUnassignedActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const savedActivities = JSON.parse(localStorage.getItem('activities')) || [];
    setActivities(savedActivities.filter(activity => activity.assigned));
    setUnassignedActivities(savedActivities.filter(activity => !activity.assigned));
  }, []);

  useEffect(() => {
    const allActivities = [...activities, ...unassignedActivities];
    localStorage.setItem('activities', JSON.stringify(allActivities));
  }, [activities, unassignedActivities]);

  const addActivity = (activity) => {
    setUnassignedActivities([...unassignedActivities, { ...activity, id: Date.now(), assigned: false }]);
    setFormVisible(false);
  };

  const updateActivity = (updatedActivity) => {
    if (updatedActivity.assigned) {
      setActivities(activities.map(activity => activity.id === updatedActivity.id ? updatedActivity : activity));
    } else {
      setUnassignedActivities(unassignedActivities.map(activity => activity.id === updatedActivity.id ? updatedActivity : activity));
    }
    setFormVisible(false);
  };

  const deleteActivity = (id) => {
    setActivities(activities.filter(activity => activity.id !== id));
    setUnassignedActivities(unassignedActivities.filter(activity => activity.id !== id));
    setFormVisible(false);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    let updatedActivities = [];
    if (source.droppableId === 'overview-activities') {
      updatedActivities = Array.from(activities);
      const [moved] = updatedActivities.splice(source.index, 1);
      moved.assigned = destination.droppableId === 'overview-activities';
      if (moved.assigned) {
        updatedActivities.splice(destination.index, 0, moved);
        setActivities(updatedActivities);
      } else {
        setActivities(updatedActivities);
        setUnassignedActivities([...unassignedActivities, moved]);
      }
    } else {
      updatedActivities = Array.from(unassignedActivities);
      const [moved] = updatedActivities.splice(source.index, 1);
      moved.assigned = destination.droppableId === 'overview-activities';
      if (moved.assigned) {
        setActivities([...activities, moved]);
        setUnassignedActivities(updatedActivities);
      } else {
        updatedActivities.splice(destination.index, 0, moved);
        setUnassignedActivities(updatedActivities);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 grid grid-cols-2 gap-4">
      <div>
        <Overview />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="overview-activities">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="p-4 bg-white rounded-lg shadow-md">
                {activities.map((activity, index) => (
                  <Draggable key={activity.id} draggableId={String(activity.id)} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-2 mb-2 bg-blue-100 rounded cursor-pointer"
                        onClick={() => {
                          setSelectedActivity(activity);
                          setFormVisible(true);
                        }}
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
        </DragDropContext>
      </div>
      <div>
        <button
          className="mb-4 py-2 px-4 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          onClick={() => {
            setSelectedActivity(null);
            setFormVisible(true);
          }}
        >
          + Add New Activity
        </button>
        {isFormVisible && (
          <ActivityForm
            activity={selectedActivity}
            onSave={selectedActivity ? updateActivity : addActivity}
            onDelete={deleteActivity}
            onCancel={() => setFormVisible(false)}
          />
        )}
        <h2 className="text-lg font-semibold mb-4">Unassigned Tasks</h2>
        <DragDropContext onDragEnd={onDragEnd}>
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
                        onClick={() => {
                          setSelectedActivity(activity);
                          setFormVisible(true);
                        }}
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
        </DragDropContext>
      </div>
    </div>
  );
};

export default DayView;
