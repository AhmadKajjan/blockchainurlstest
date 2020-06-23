import React from 'react';
import TestPage from './pages/testPage/testPage.compnents';
import Header from './components/header/Header.components';
import {Switch,Route} from 'react-router-dom';
import ShowAllData from './components/showAllData/showAllData.components';
function App() {
  
 
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path='/' component={TestPage} />
        <Route exact path='/eos_mainnet' component={()=><ShowAllData chaintype="eos" /> } />
        <Route exact path='/wax_mainnet' component={()=><ShowAllData chaintype="wax" /> } />
        <Route exact path='/telos_mainnet' component={()=><ShowAllData chaintype="telos" /> } />
        <Route exact path='/proton_mainnet' component={()=><ShowAllData chaintype="proton" /> } />
      </Switch>
    </div>
  );
}

export default App;
