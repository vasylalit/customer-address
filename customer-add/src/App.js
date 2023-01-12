// import logo from './logo.svg';
import Form from './components/Form';
import './App.css';
import { useState, useEffect } from 'react';

function App() {

   // Online state
   const [isOnline, setIsOnline] = useState(navigator.onLine);

   useEffect(() => {
     // Update network status
     const handleStatusChange = () => {
       setIsOnline(navigator.onLine);
     };
 
     // Listen to the online status
     window.addEventListener('online', handleStatusChange);
 
     // Listen to the offline status
     window.addEventListener('offline', handleStatusChange);
 
     // Specify how to clean up after this effect for performance improvment
     return () => {
       window.removeEventListener('online', handleStatusChange);
       window.removeEventListener('offline', handleStatusChange);
     };
   }, [isOnline]);
 
  return (
    <div>
      <Form />
      <div className='container'>
      {isOnline ? (
        <h1 className='online'>You Are Online</h1>
      ) : (
        <h1 className='offline'>You Are Offline</h1>
      )}
    </div>

    </div>
    
  );

 
}

export default App;