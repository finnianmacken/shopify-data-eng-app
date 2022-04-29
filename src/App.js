import React, { useState } from 'react';
import UploadImage from './components/UploadImage/UploadImage';
import ViewImage from './components/ViewImage/ViewImage';

function App() {
  const [refreshApp, setRefreshApp] = useState(false)

  return (
    <>
      <UploadImage refreshApp={refreshApp} setRefreshApp={setRefreshApp}/>
      <ViewImage refreshApp={refreshApp} setRefreshApp={setRefreshApp}/>
    </>
  );
}

export default App;
