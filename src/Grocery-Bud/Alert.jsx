import React from "react";
import { useEffect } from "react";

export default function Alert({ type, msg, removeAlert, list }) {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [list]);
  return <p className={`alert alert-${type}`}>{msg}</p>;
}
