import React from "react"
import logo from "../../Logo.svg"

export default function Logo(props) {
    return (
        <img src={logo} alt="logo" {...props} />
    )
  }
