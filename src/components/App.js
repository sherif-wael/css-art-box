import React, {useState} from "react";
import store from "../reducers/index";
import {Provider} from "react-redux";
import { Switch, Route, BrowserRouter} from "react-router-dom";
import ContainerValues from "./ContainerValues"
import Playground from "./Playground";
import StylesController from "./StylesController"
import Code from "./Code";
import LandingPage from "./LandingPage";

function App(){
  let [state, setState] = useState(false);
  return(
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/playground" exact render={() => (
            <div class="drawer">
              <Playground />
              <StylesController />
            </div>
          )} />
          <Route path="/code" component={Code} />
        </Switch>
      </Provider>
    </BrowserRouter>
  )
}

export default App