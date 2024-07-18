import React, { useState, useEffect } from 'react';

const ActivityForm1 = ({ activity, onSave, onDelete, onCancel }) => {
  const [formState, setFormState] = useState({
    title: '',
    cost: '',
    startTime: '',
    duration: '',
    endTime: '',
    date: '',
    pointOfContact: '',
    location: '',
    notes: '',
  });

  useEffect(() => {
    if (activity) {
      setFormState(activity);
    } else {
      setFormState({
        title: '',
        cost: '',
        startTime: '',
        duration: '',
        endTime: '',
        date: '',
        pointOfContact: '',
        location: '',
        notes: '',
      });
    }
  }, [activity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formState, id: activity ? activity.id : Date.now() });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {activity ? 'Update Activity' : 'Add New Activity'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={formState.title}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Cost</label>
              <input
                type="text"
                name="cost"
                value={formState.cost}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Start Time</label>
              <input
                type="time"
                name="startTime"
                value={formState.startTime}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Duration</label>
              <input
                type="text"
                name="duration"
                value={formState.duration}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">End Time</label>
              <input
                type="time"
                name="endTime"
                value={formState.endTime}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Date</label>
              <input
                type="date"
                name="date"
                value={formState.date}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Point Of Contact</label>
              <input
                type="text"
                name="pointOfContact"
                value={formState.pointOfContact}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Location</label>
              <input
                type="text"
                name="location"
                value={formState.location}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-1 font-medium">Notes</label>
              <textarea
                name="notes"
                value={formState.notes}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            {activity && (
              <button
                type="button"
                onClick={() => onDelete(activity.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            )}
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              {activity ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityForm1;
