// import React, { useState } from 'react';
// import Modal from './components/Modal';

// function App() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
//       <header className="w-full flex justify-between items-center py-4 px-6 bg-white shadow">
//         <div className="text-xl font-bold">picnic</div>
//         <div className="space-x-4">
//           <button className="py-2 px-4 bg-gray-200 rounded">Trip</button>
//           <button className="py-2 px-4 bg-yellow-400 rounded">Overview</button>
//           <button className="py-2 px-4 bg-gray-200 rounded">Day</button>
//           <button className="py-2 px-4 bg-gray-200 rounded">Map</button>
//           <button className="py-2 px-4 bg-gray-200 rounded">Budget</button>
//         </div>
//         <div className="flex items-center space-x-4">
//           <button className="py-2 px-4 bg-gray-200 rounded">Save</button>
//           <div className="w-10 h-10 rounded-full bg-gray-300"></div>
//         </div>
//       </header>

//       <main className="w-full max-w-4xl mt-8">
//         <div className="grid grid-cols-4 gap-4">
//           {['19 Jul 2024', '20 Jul 2024', '21 Jul 2024', '22 Jul 2024'].map((date, index) => (
//             <div key={index} className="bg-white p-4 shadow rounded-lg">
//               <div className="text-lg font-semibold">{date}</div>
//               <button
//                 onClick={openModal}
//                 className="mt-4 py-2 px-4 bg-yellow-400 rounded"
//               >
//                 + Add New
//               </button>
//             </div>
//           ))}
//         </div>
//       </main>

//       {isModalOpen && <Modal closeModal={closeModal} />}
//     </div>
//   );
// }

// export default App;


// import React, { useState } from 'react';
// import DayView from './components/DayView';

// function App() {
//   const [view, setView] = useState('Overview');

//   const switchView = (newView) => setView(newView);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="w-full flex justify-between items-center py-4 px-6 bg-white shadow">
//         <div className="text-xl font-bold">picnic</div>
//         <div className="space-x-4">
//           <button onClick={() => switchView('Trip')} className="py-2 px-4 bg-gray-200 rounded">Trip</button>
//           <button onClick={() => switchView('Overview')} className="py-2 px-4 bg-gray-200 rounded">Overview</button>
//           <button onClick={() => switchView('Day')} className="py-2 px-4 bg-gray-200 rounded">Day</button>
//           <button onClick={() => switchView('Map')} className="py-2 px-4 bg-gray-200 rounded">Map</button>
//           <button onClick={() => switchView('Budget')} className="py-2 px-4 bg-gray-200 rounded">Budget</button>
//         </div>
//         <div className="flex items-center space-x-4">
//           <button className="py-2 px-4 bg-gray-200 rounded">Save</button>
//           <div className="w-10 h-10 rounded-full bg-gray-300"></div>
//         </div>
//       </header>

//       <main className="w-full max-w-4xl mt-8 mx-auto">
//         {view === 'Day' ? <DayView /> : <div>Select a view</div>}
//       </main>
//     </div>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import DayView from './components/DayView';
import Overview from './components/Overview';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
           
            <Route path="/overview" element={<Overview />} />
            <Route path="/day" element={<DayView />} />
      
            
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
