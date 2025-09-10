import DummyPages from './pages/DummyPages';
import LayeredPage from './pages/LayeredPage';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';

function App() {
  // Calculate start offsets based on dummy page counts (3 dummy pages each)
  const page1StartOffset = 0;
  const page2StartOffset = 4; // After 3 dummy pages
  const page3StartOffset = 7; // After 6 dummy pages
  const page4StartOffset = 10; // After 9 dummy pages

  return (
    <div className="App">
      {/* Dummy pages for scrolling - 3 dummy pages for each of the 4 pages */}
      <DummyPages count={4} />
      <DummyPages count={3} />
      <DummyPages count={3} />
      <DummyPages count={3} />
      
      {/* Layered pages with absolute positioning */}
      <LayeredPage 
        dummyPageCount={4} 
        zIndex={40} 
        backgroundColor="transparent"
        startOffset={page1StartOffset}
      >
        <Page1 />
      </LayeredPage>
      
      <LayeredPage 
        dummyPageCount={3} 
        zIndex={30} 
        backgroundColor="transparent"
       
        startOffset={page2StartOffset}
      >
        <Page2 />
      </LayeredPage>
      
      <LayeredPage 
        dummyPageCount={3} 
        zIndex={20} 
        backgroundColor="transparent"
       
        startOffset={page3StartOffset}
      >
        <Page3 />
      </LayeredPage>
      
      <LayeredPage 
        dummyPageCount={3} 
        zIndex={10} 
        backgroundColor="transparent"
       
        startOffset={page4StartOffset}
      >
        <Page4 />
      </LayeredPage>
    </div>
  );
}

export default App;
