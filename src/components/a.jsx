// import React, { useState, useEffect } from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import 'tailwindcss/tailwind.css';
// import ActivityForm from './ActivityForm';

// const DayView = () => {
//   const [activities, setActivities] = useState([]);
//   const [unassignedActivities, setUnassignedActivities] = useState([]);
//   const [selectedActivity, setSelectedActivity] = useState(null);
//   const [isFormVisible, setFormVisible] = useState(false);
//   const [newActivityList, setNewActivityList] = useState('unassigned-activities'); // New state to track the list

//   useEffect(() => {
//     const savedActivities = JSON.parse(localStorage.getItem('activities')) || [];
//     setActivities(savedActivities.filter(activity => activity.assigned));
//     setUnassignedActivities(savedActivities.filter(activity => !activity.assigned));
//   }, []);

//   useEffect(() => {
//     const allActivities = [...activities, ...unassignedActivities];
//     localStorage.setItem('activities', JSON.stringify(allActivities));
//   }, [activities, unassignedActivities]);

//   const addActivity = (activity) => {
//     const newActivity = { ...activity, id: Date.now(), assigned: newActivityList === 'overview-activities' };

//     if (newActivityList === 'overview-activities') {
//       setActivities([...activities, newActivity]);
//     } else {
//       setUnassignedActivities([...unassignedActivities, newActivity]);
//     }

//     setFormVisible(false);
//   };

//   const updateActivity = (updatedActivity) => {
//     if (updatedActivity.assigned) {
//       setActivities(activities.map(activity => activity.id === updatedActivity.id ? updatedActivity : activity));
//     } else {
//       setUnassignedActivities(unassignedActivities.map(activity => activity.id === updatedActivity.id ? updatedActivity : activity));
//     }
//     setFormVisible(false);
//   };

//   const deleteActivity = (id) => {
//     setActivities(activities.filter(activity => activity.id !== id));
//     setUnassignedActivities(unassignedActivities.filter(activity => activity.id !== id));
//     setFormVisible(false);
//   };

//   const onDragEnd = (result) => {
//     if (!result.destination) return;

//     const { source, destination } = result;

//     let sourceList = source.droppableId === 'overview-activities' ? activities : unassignedActivities;
//     let destinationList = destination.droppableId === 'overview-activities' ? activities : unassignedActivities;

//     const [movedItem] = sourceList.splice(source.index, 1);
//     movedItem.assigned = destination.droppableId === 'overview-activities'; // Update the assignment status
//     destinationList.splice(destination.index, 0, movedItem);

//     if (source.droppableId === 'overview-activities') {
//       setActivities([...sourceList]);
//     } else {
//       setUnassignedActivities([...sourceList]);
//     }

//     if (destination.droppableId === 'overview-activities') {
//       setActivities([...destinationList]);
//     } else {
//       setUnassignedActivities([...destinationList]);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 grid grid-cols-2 gap-4">
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId="overview-activities">
//           {(provided) => (
//             <div ref={provided.innerRef} {...provided.droppableProps} className="p-4 bg-white rounded-lg shadow-md">
//               <h2 className="text-lg font-semibold mb-4">Unassigned Task</h2>
//               {activities.map((activity, index) => (
//                 <Draggable key={activity.id} draggableId={String(activity.id)} index={index}>
//                   {(provided) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       className="p-2 mb-2 bg-blue-100 rounded cursor-pointer"
//                       onClick={() => {
//                         setSelectedActivity(activity);
//                         setFormVisible(true);
//                       }}
//                     >
//                       <div className="font-semibold">{activity.title}</div>
//                       <div>{activity.location}</div>
//                       <div>{activity.duration}</div>
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//               <button
//                 className="mt-4 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
//                 onClick={() => {
//                   setNewActivityList('overview-activities'); // Set the list to "Overview Task"
//                   setSelectedActivity(null);
//                   setFormVisible(true);
//                 }}
//               >
//                 Add Activity
//               </button>
//             </div>
//           )}
//         </Droppable>

//         <Droppable droppableId="unassigned-activities">
//           {(provided) => (
//             <div ref={provided.innerRef} {...provided.droppableProps} className="p-4 bg-white rounded-lg shadow-md">
//               <h2 className="text-lg font-semibold mb-4">Overview</h2>
//               <h1 className='font-semibold p-2 text-lg'>19 Jul 2024</h1>
//               {unassignedActivities.map((activity, index) => (
//                 <Draggable key={activity.id} draggableId={String(activity.id)} index={index}>
//                   {(provided) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       className="p-2 mb-2 bg-blue-100 rounded cursor-pointer"
//                       onClick={() => {
//                         setSelectedActivity(activity);
//                         setFormVisible(true);
//                       }}
//                     >
//                       <div className="font-semibold">{activity.title}</div>
//                       <div>{activity.location}</div>
//                       <div>{activity.duration}</div>
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//               <button
//                 className="mt-4 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
//                 onClick={() => {
//                   setNewActivityList('unassigned-activities'); // Set the list to "Unassigned"
//                   setSelectedActivity(null);
//                   setFormVisible(true);
//                 }}
//               >
//                 Add Activity
//               </button>
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>

//       {isFormVisible && (
//         <ActivityForm
//           activity={selectedActivity}
//           onSave={addActivity} // Note: Always pass the addActivity function; it will handle saving based on the state
//           onDelete={deleteActivity}
//           onCancel={() => setFormVisible(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default DayView;

import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "tailwindcss/tailwind.css";
import ActivityForm from "./ActivityForm";

const DayView = () => {
  const [activities, setActivities] = useState([]);
  const [unassignedActivities, setUnassignedActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);
  const [currentList, setCurrentList] = useState(null);

  const [activitiesBasedOnDates, setActivitiesBasedOnDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const savedActivities =
      JSON.parse(localStorage.getItem("activities")) || [];

      
    let tempActivitiesBasedOnDates = {};

    savedActivities.map((act) => {
      if (!tempActivitiesBasedOnDates[act.date]) {
        tempActivitiesBasedOnDates[act.date] = [];
      }
      tempActivitiesBasedOnDates[act.date].push(act);
    });

    setActivitiesBasedOnDates(tempActivitiesBasedOnDates);
  },[]);

  useEffect(() => {
    setSelectedDate(Object.keys(activitiesBasedOnDates)[index]);
  }, [index, activitiesBasedOnDates]);

  useEffect(() => {
    if (Object.keys(activitiesBasedOnDates).length > 0 && selectedDate) {
      setActivities(
        activitiesBasedOnDates[selectedDate].filter(
          (activity) => activity.assigned
        )
      );
      setUnassignedActivities(
        activitiesBasedOnDates[selectedDate].filter(
          (activity) => !activity.assigned
        )
      );
    }
  }, [activitiesBasedOnDates, selectedDate]);

  // useEffect(() => {
  //   const allActivities = [...activities, ...unassignedActivities];
  //   localStorage.setItem("activities", JSON.stringify(allActivities));
  // }, [activities, unassignedActivities]);

  const addActivity = (activity) => {
    if (currentList === "overview-activities") {
      setActivities([
        ...activities,
        { ...activity, id: Date.now(), assigned: true },
      ]);
    } else {
      setUnassignedActivities([
        ...unassignedActivities,
        { ...activity, id: Date.now(), assigned: false },
      ]);
    }
    setFormVisible(false);
  };

  const updateActivity = (updatedActivity) => {
    if (updatedActivity.assigned) {
      setActivities(
        activities.map((activity) =>
          activity.id === updatedActivity.id ? updatedActivity : activity
        )
      );
    } else {
      setUnassignedActivities(
        unassignedActivities.map((activity) =>
          activity.id === updatedActivity.id ? updatedActivity : activity
        )
      );
    }
    setFormVisible(false);
  };

  const deleteActivity = (id) => {
    setActivities(activities.filter((activity) => activity.id !== id));
    setUnassignedActivities(
      unassignedActivities.filter((activity) => activity.id !== id)
    );
    setFormVisible(false);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    let sourceList =
      source.droppableId === "overview-activities"
        ? activities
        : unassignedActivities;
    let destinationList =
      destination.droppableId === "overview-activities"
        ? activities
        : unassignedActivities;

    const [movedItem] = sourceList.splice(source.index, 1);
    destinationList.splice(destination.index, 0, movedItem);

    if (source.droppableId === "overview-activities") {
      setActivities([...sourceList]);
    } else {
      setUnassignedActivities([...sourceList]);
    }

    if (destination.droppableId === "overview-activities") {
      setActivities([...destinationList]);
    } else {
      setUnassignedActivities([...destinationList]);
    }
  };

  const handleAddClick = (list) => {
    setSelectedActivity(null);
    setFormVisible(true);
    setCurrentList(list);
  };

  const handleCloseForm = () => {
    setFormVisible(false);
    setSelectedActivity(null);
    setCurrentList(null);
  };

  return (
    <div className="container mx-auto p-4 grid grid-cols-2 gap-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="overview-activities">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="p-4 bg-white rounded-lg shadow-md"
            >
              <h2 className="text-lg font-semibold mb-4">Unassigned Task</h2>
              {activities.map((activity, index) => (
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
              <button
                className="mt-4 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => handleAddClick("overview-activities")}
              >
                Add Activity
              </button>
            </div>
          )}
        </Droppable>

        <Droppable droppableId="unassigned-activities">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="p-4 bg-white rounded-lg shadow-md"
            >
              <div className="flex flex-row justify-between">
                <h2 className="text-lg font-semibold mb-4">Overview</h2>
                <div>
                  <h1 className="font-semibold p-2 text-lg">
                    <span
                      onClick={() => {
                        if (index > 0) {
                          setIndex(index - 1);
                        }
                      }}
                    >
                      ←
                    </span>
                    {selectedDate}
                    <span
                      onClick={() => {
                        if (
                          index < Object.keys(activitiesBasedOnDates).length-1
                        ) {
                          setIndex(index + 1);
                        }
                      }}
                    >
                      →
                    </span>
                  </h1>
                </div>
              </div>
              {unassignedActivities.map((activity, index) => (
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
              <button
                className="mt-4 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => handleAddClick("unassigned-activities")}
              >
                Add Activity
              </button>
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {isFormVisible && (
        <ActivityForm
          activity={selectedActivity}
          onSave={selectedActivity ? updateActivity : addActivity}
          onDelete={deleteActivity}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default DayView;
