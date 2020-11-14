import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//Global Sections
import Index from "./pages/Index";
import Browse from "./pages/Browse";

export default function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/index">
                    <Index />
                </Route>
                <Route path="/minis">
                    <Browse />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
