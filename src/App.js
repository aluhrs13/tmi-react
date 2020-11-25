import React from "react";
import { BrowserRouter, Switch, Route, withRouter } from "react-router-dom";

//Global Sections
import Index from "./pages/Index";
import BrowseMinis from "./pages/BrowseMinis";
import BrowseCreators from "./pages/BrowseCreators";
import ViewMini from "./pages/ViewMini";
import ScrollToTop from "./utils/scrollToTop";

export default function App() {
    return (
        <BrowserRouter>
            <ScrollToTop>
                <Switch>
                    <Route exact path="/">
                        <Index />
                    </Route>
                    <Route path="/minis/:id" component={withRouter(ViewMini)} />
                    <Route path="/minis">
                        <BrowseMinis />
                    </Route>
                    <Route path="/creators">
                        <BrowseCreators />
                    </Route>
                </Switch>
            </ScrollToTop>
        </BrowserRouter>
    );
}
