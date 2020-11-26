import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider, theme } from "@chakra-ui/react";
import reportWebVitals from "./utils/reportWebVitals";

//Global Sections
import "./index.css";
import App from "./App";

const tmiTheme = {
    ...theme,
    colors: {
        ...theme.colors,
        primary: {
            50: "#e4f8f5",
            100: "#cae3df",
            200: "#adcfca",
            300: "#90bcb4",
            400: "#72a99f",
            500: "#588f86",
            600: "#436f68",
            700: "#2e504a",
            800: "#18312d",
            900: "#001310",
        },
        sourceSites: {
            thingiverse: "#3F8CFE",
            patreon: "#E85B46",
            myminifactory: "#3fbc9c",
            shapeways: "#FF4B5A",
            gumroad: "#198C8C",
            cults3d: "#822ef5",
            wargaming3d: "#41533b",
            duncanshadow: "#4E2B07",
            prusaprinters: "#fa6831",
            atelierstoria: "#5F7E23",
            website: "#18312d",
        },
        sourceSitesFG: {
            thingiverse: "black",
            patreon: "black",
            myminifactory: "black",
            shapeways: "black",
            gumroad: "black",
            cults3d: "white",
            wargaming3d: "white",
            duncanshadow: "white",
            prusaprinters: "black",
            atelierstoria: "white",
            website: "white",
        },
    },
};

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider theme={tmiTheme}>
            <App />
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
