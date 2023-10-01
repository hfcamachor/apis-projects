"use client"

import crypto from "crypto";

export default function Marvel () {
  const getApiUrl = () => {
    console.log("process", process.env)
  }
  getApiUrl()
  return <div>Hello Marvel</div>
}