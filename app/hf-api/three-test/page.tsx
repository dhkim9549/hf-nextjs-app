"use client";

import { useState, useRef } from "react";

import Button from "@mui/material/Button";

import TGraphics from "./t-graphics";

export default function RentLoanMultiInfo() {
  let cameraRef = useRef();

  function moveZp() {
    cameraRef.current.position.z += 1;
  }
  function moveZm() {
    cameraRef.current.position.z -= 1;
  }
  function moveXp() {
    cameraRef.current.position.x += 1;
  }
  function moveXm() {
    cameraRef.current.position.x -= 1;
  }
  function moveYp() {
    cameraRef.current.position.y += 1;
  }
  function moveYm() {
    cameraRef.current.position.y -= 1;
  }

  function setCameraRef(camera) {
    cameraRef.current = camera;
  }

  return (
    <div className="">
      <div className="text-center my-10 py-10 lg:text-left lg:m-10 lg:p-10">
        <blockquote className="text-2xl font-bold italic text-slate-900">
          THREE
        </blockquote>
      </div>
      <div className="m-4 flex flex-wrap">
        <div className="mb-4 w-full text-center">three.js test</div>
        <div className="">
          <TGraphics graphicsData={{}} setCameraRef={setCameraRef} />
        </div>
        <div>
          <div className="bg-blue-200 w-80 p-4 flex flex-wrap gap-4">
            <div className="flex gap-4">
              <div>
                <Button variant="contained" onClick={moveZm}>
                  z -= 1
                </Button>
              </div>
              <div>
                <Button variant="contained" onClick={moveZp}>
                  z += 1
                </Button>
              </div>
            </div>
            <div className="flex gap-4">
              <div>
                <Button variant="contained" onClick={moveXm}>
                  x -= 1
                </Button>
              </div>
              <div>
                <Button variant="contained" onClick={moveXp}>
                  x += 1
                </Button>
              </div>
            </div>
            <div className="flex gap-4">
              <div>
                <Button variant="contained" onClick={moveYm}>
                  y -= 1
                </Button>
              </div>
              <div>
                <Button variant="contained" onClick={moveYp}>
                  y += 1
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

