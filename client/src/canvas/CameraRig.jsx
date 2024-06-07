import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import state from "../store";

const CameraRig = ({ children }) => {
  const groupRef = useRef();
  const snap = useSnapshot(state);

  const [isBreakPoint, setIsBreakPoint] = useState(window.innerWidth <= 1260);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsBreakPoint(window.innerWidth <= 1260);
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useFrame((state, delta) => {
    let targetPosition = [-0.4, 0, 2];
    if (snap.intro) {
      if (isBreakPoint) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0.2, 2.5];
    } else {
      if (isMobile) targetPosition = [0, 0, 2.5];
      else targetPosition = [0, 0, 2];
    }

    // Ensure state.camera exists and has a position property
    if (state.camera && state.camera.position) {
      easing.damp3(state.camera.position, targetPosition, 0.25, delta);
    }

    // Set the Model Rotation smoothly
    if (groupRef.current) {
      easing.dampE(
        groupRef.current.rotation,
        [state.pointer.y / 10, -state.pointer.x / 5, 0],
        0.25,
        delta
      );
    }
  });

  return <group ref={groupRef}>{children}</group>;
};

export default CameraRig;
