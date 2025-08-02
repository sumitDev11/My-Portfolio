import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import Toolbox from './Components/Toolbox/Toolbox';
import NewAbout from './Components/NewAbout/NewAbout';
import MyProjects from './Components/MyProjects/MyProjects';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';
import mywork_data from './assets/mywork_data';
import AboutMy from './Components/AboutMy/AboutMy';
import MovingBar from './Components/MovingBar/MovingBar';


const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutMy/>
     
      < Toolbox/>   

      <MovingBar/>
 
   
      <NewAbout />
     
      <MyProjects data={mywork_data} />
      
      <Contact />
      <Footer />
    </>
  );
};

export default App;