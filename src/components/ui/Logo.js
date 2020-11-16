import React from "react";
import logo from "../../logo.svg";

export default function Logo(props) {
    return <img src={logo} alt="logo" {...props} />;
}
