import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ActivityForm1 from './ActivityForm1';
import { saveToLocalStorage, loadFromLocalStorage } from './localStorageUtils';

const initialDates = ['19 Jul 2024', '20 Jul 2024', '21 Jul 2024', '22 Jul 2024'];

const Overview = () => {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const savedActivities = loadFromLocalStorage('activities');
    if (savedActivities) {
      setActivities(savedActivities);
    }
  }, []);

  useEffect(() => {
    saveToLocalStorage('activities', activities);
  }, [activities]);

  const addActivity = (activity) => {
    setActivities([...activities, activity]);
    setFormVisible(false);
  };

  const updateActivity = (updatedActivity) => {
    setActivities(
      activities.map((activity) =>
        activity.id === updatedActivity.id ? updatedActivity : activity
      )
    );
    setFormVisible(false);
  };

  const deleteActivity = (id) => {
    setActivities(activities.filter((activity) => activity.id !== id));
    setFormVisible(false);
  };

  const handleAddNew = (date) => {
    setSelectedActivity(null);
    setSelectedDate(date);
    setFormVisible(true);
  };

  const handleEdit = (activity) => {
    setSelectedActivity(activity);
    setFormVisible(true);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const updatedActivities = [...activities];
    const [removed] = updatedActivities.splice(source.index, 1);
    removed.date = destination.droppableId;
    updatedActivities.splice(destination.index, 0, removed);

    setActivities(updatedActivities);
  };

  return (
    <div className="container mx-auto p-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {initialDates.map((date) => (
            <Droppable key={date} droppableId={date}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="p-4 bg-white rounded-lg shadow-md"
                >
                  <h2 className="text-lg font-semibold mb-2">{date}</h2>
                  {activities
                    .filter((activity) => activity.date === date)
                    .map((activity, index) => (
                      <Draggable
                        key={activity.id}
                        draggableId={String(activity.id)}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-2 mb-2 bg-blue-100 rounded cursor-pointer"
                            onClick={() => handleEdit(activity)}
                          >
                            <div className="font-semibold">{activity.title}</div>
                            <div>{activity.location}</div>
                            <div>{activity.duration}</div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                  <button
                    className="mt-2 w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    onClick={() => handleAddNew(date)}
                  >
                    + Add New
                  </button>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      {isFormVisible && (
        <ActivityForm1
          activity={selectedActivity}
          onSave={(activity) => addActivity({ ...activity, date: selectedDate })}
          onDelete={deleteActivity}
          onCancel={() => setFormVisible(false)}
        />
      )}
    </div>
  );
};

export default Overview;