import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import layoutRoutes from "./routes/index";
import { store, persistor, history } from "./redux/store";
import "./assets/scss/app.scss";

const App = () => {
  return (
    <div className="App">
      <Router history={history}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {/* Layout Routes */}
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/scan" />} />
              {layoutRoutes.map((prop, key) => {
                return (
                  <Route
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                );
              })}
            </Switch>
            {/* Layout Routes */}
          </PersistGate>
        </Provider>
      </Router>
    </div>
  );
};

export default App;
