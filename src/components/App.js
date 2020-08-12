import React, {useState} from "react";
import store from "../reducers/index";
import {Provider} from "react-redux";
import { Switch, Route, BrowserRouter} from "react-router-dom";
import ContainerValues from "./ContainerValues"
import Playground from "./Playground";
import StylesController from "./StylesController"
import Code from "./Code";
import LandingPage from "./LandingPage";
import HowToUse from "./HowToUse";

function App(){
  let [state, setState] = useState(false);
  return(
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/playground" exact render={() => (
            <div className="drawer">
              <Playground />
              <StylesController />
            </div>
          )} />
          <Route path="/code" component={Code} />
          <Route path="/how-to-use" component={HowToUse} />
        </Switch>
      </Provider>
    </BrowserRouter>
  )
}

export default App