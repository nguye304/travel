import React from 'react';

import {HomePage} from './webpages/HomePage';

function App() {
  return (
    <div className="App">
      <link rel="stylesheet" type="text/css" href="https://js.arcgis.com/3.30/esri/css/esri.css"></link>
      <script src="https://js.arcgis.com/3.30/"></script>
      <HomePage/>
    </div>
  );
}

export default App;
