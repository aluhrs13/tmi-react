import React from "react";
import { BrowserRouter, Switch, Route, useParams } from "react-router-dom";

//Global Sections
import Index from "./pages/Index";
import BrowseMinis from "./pages/BrowseMinis";
import BrowseCreators from "./pages/BrowseCreators";
import ViewMini from "./pages/ViewMini";

export default function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Index />
                </Route>
                <Route path="/minis/:id">
                    <ViewMini />
                </Route>
                <Route path="/minis">
                    <BrowseMinis />
                </Route>
                <Route path="/creators">
                    <BrowseCreators />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
