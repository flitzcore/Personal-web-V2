import DummyPages from './pages/DummyPages';
import LayeredPage from './pages/LayeredPage';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';

function App() {
  // Calculate start offsets based on dummy page counts
  const page1StartOffset = 0;
  const page2StartOffset = 5; // After 5 dummy pages
  const page3StartOffset = 5 + 3; // After 5 + 3 dummy pages

  return (
    <div className="App">
      {/* Dummy pages for scrolling - total height determines scrollable content */}
      <DummyPages count={5} />
      <DummyPages count={3} />
      <DummyPages count={4} />
      
      {/* Layered pages with absolute positioning */}
      <LayeredPage 
        dummyPageCount={5} 
        zIndex={30} 
        backgroundColor="transparent"
        pageNumber={1}
        startOffset={page1StartOffset}
      >
        <Page1 />
      </LayeredPage>
      
      <LayeredPage 
        dummyPageCount={3} 
        zIndex={20} 
        backgroundColor="transparent"
        pageNumber={2}
        startOffset={page2StartOffset}
      >
        <Page2 />
      </LayeredPage>
      
      <LayeredPage 
        dummyPageCount={4} 
        zIndex={10} 
        backgroundColor="transparent"
        pageNumber={3}
        startOffset={page3StartOffset}
      >
        <Page3 />
      </LayeredPage>
    </div>
  );
}

export default App;
