import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//Global Sections
import Index from "./pages/Index";
import Browse from "./pages/Browse";
import BrowseCreatorsLayout from "./components/layouts/BrowseCreatorLayout";

export default function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Index />
                </Route>
                <Route path="/minis">
                    <Browse />
                </Route>
                <Route path="/creators">
                    <BrowseCreatorsLayout />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
