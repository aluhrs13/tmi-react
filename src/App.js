import React from "react";
import { BrowserRouter, Switch, Route, withRouter } from "react-router-dom";

//Global Sections
import Index from "./pages/Index";
import BrowseMinis from "./pages/BrowseMinis";
import BrowseCreators from "./pages/BrowseCreators";
import ViewMini from "./pages/ViewMini";
import ViewCreator from "./pages/ViewCreator";
import ScrollToTop from "./utils/scrollToTop";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";

const appInsights = new ApplicationInsights({
    config: {
        instrumentationKey: "e27cf839-5c4e-4e9c-a424-40eb49561e72",
        enableAutoRouteTracking: true,
        disableFetchTracking: false,
    },
});
appInsights.loadAppInsights();
appInsights.trackPageView();

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
                    <Route
                        path="/creators/:id"
                        component={withRouter(ViewCreator)}
                    />
                    <Route path="/creators">
                        <BrowseCreators />
                    </Route>
                </Switch>
            </ScrollToTop>
        </BrowserRouter>
    );
}
