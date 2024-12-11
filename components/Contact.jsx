import React from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
export default function Contact() {
  const params = useParams();
  console.log("sdfasd", params);
  return (
    <>
      <h1>Contact</h1>
    </>
  );
}
