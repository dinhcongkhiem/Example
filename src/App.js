import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './layouts';
import { publicRoutes } from './routes/routes';
import { Fragment } from 'react';
function App() {
    return (
       <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            const Layout = route.layout || DefaultLayout; 

            return (
              <Route
                key={route.path || index} 
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
    );
}

export default App;
