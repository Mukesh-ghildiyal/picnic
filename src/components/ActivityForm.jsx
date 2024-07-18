import React, { useState, useEffect } from 'react';

function ActivityForm({ activity, onClose, onSave, onDelete }) {
  const [localActivity, setLocalActivity] = useState({
    title: '',
    cost: '',
    startTime: '',
    duration: 0,
    endTime: '',
    date: '',
    contact: '',
    location: '',
    notes: ''
  });

  useEffect(() => {
    if (activity) {
      setLocalActivity(activity);
    }
  }, [activity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalActivity(prev => ({ ...prev, [name]: value }));
  };

  const incrementDuration = () => {
    setLocalActivity(prev => ({ ...prev, duration: prev.duration + 1 }));
  };

  const decrementDuration = () => {
    setLocalActivity(prev => ({
      ...prev,
      duration: prev.duration > 0 ? prev.duration - 1 : 0
    }));
  };

  const handleSubmit = () => {
    onSave(localActivity);
    onClose();
  };

  const handleDelete = () => {
    onDelete(localActivity.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Activity</h2>
          <button onClick={onClose} className="text-gray-600">&times;</button>
        </div>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <input
              type="text"
              name="title"
              value={localActivity.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-1/2 p-2 border rounded"
            />
            <input
              type="number"
              name="cost"
              value={localActivity.cost}
              onChange={handleChange}
              placeholder="Cost"
              className="w-1/2 p-2 border rounded"
            />
          </div>
          <div className="flex space-x-4">
            <input
              type="time"
              name="startTime"
              value={localActivity.startTime}
              onChange={handleChange}
              className="w-1/3 p-2 border rounded"
            />
            <div className="flex items-center space-x-2 w-1/3">
              <button onClick={decrementDuration} className="px-2 py-1 border rounded">-</button>
              <span>{localActivity.duration}m</span>
              <button onClick={incrementDuration} className="px-2 py-1 border rounded">+</button>
            </div>
            <input
              type="time"
              name="endTime"
              value={localActivity.endTime}
              onChange={handleChange}
              className="w-1/3 p-2 border rounded"
            />
          </div>
          <div className="flex space-x-4">
            <input
              type="date"
              name="date"
              value={localActivity.date}
              onChange={handleChange}
              className="w-1/2 p-2 border rounded"
            />
            <input
              type="text"
              name="contact"
              value={localActivity.contact}
              onChange={handleChange}
              placeholder="Point of Contact"
              className="w-1/2 p-2 border rounded"
            />
          </div>
          <input
            type="text"
            name="location"
            value={localActivity.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-2 border rounded"
          />
          <textarea
            name="notes"
            value={localActivity.notes}
            onChange={handleChange}
            placeholder="Notes.. Packing List.. Timings.."
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex justify-between mt-4">
          {activity && (
            <button onClick={handleDelete} className="px-4 py-2 bg-red-400 rounded">Delete</button>
          )}
          <div>
            <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded mr-2">Cancel</button>
            <button onClick={handleSubmit} className="px-4 py-2 bg-yellow-400 rounded">
              {activity ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityForm;
