import './App.css';

import React, { useState } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


 const App = ()=> {
  const pageSize = 5;
  const apiKey=process.env.REACT_APP_NEWS_API;//to acces custom environment Variable we use process
  // const [pageSize, setpageSize] = useState(0);
  // setpageSize(5);
  // const [apiKey,] = useState(process.env.REACT_APP_NEWS_API);
  const [progress, setProgress] = useState('0')
  // state = {
  //   progress:0
  // } 

  // setProgress = (progress)=>{
  //   this.setState({progress:progress})
  // }
  // setProgress(progress);
  // a = 'Himan'//this is a class variable so ne need to write let or var here.

    // console.log(apikey);
    return (
      <div>
        <BrowserRouter>
        
          <Navbar/>
          <LoadingBar
            height={3}
            color='#03fc41'
            progress={progress}

          />
          
         
          <Routes>

            <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey}  key="general" pageSize={pageSize} country={'in'} category={"general"} />} />
            <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey}  key="business" pageSize={pageSize} country={'in'} category={"business"} />} />
            <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey}  key="entertainment" pageSize={pageSize} country={'in'} category={"entertainment"} />} />
            <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey}  key="general" pageSize={pageSize} country={'in'} category={"general"} />} />
            <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey}  key="health" pageSize={pageSize} country={'in'} category={"health"} />} />
            <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey}  key="science" pageSize={pageSize} country={'in'} category={"science"} />} />
            <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey}  key="sports" pageSize={pageSize} country={'in'} category={"sports"} />} />
            <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey}  key="technology" pageSize={pageSize} country={'in'} category={"technology"} />} />
            {/* we use key here so that we can force react to re render our componenet with uodated props other wise it will display same componenet whenever we click on any link */}
          </Routes>
        </BrowserRouter>
      </div>
    );
  
}
export default App;