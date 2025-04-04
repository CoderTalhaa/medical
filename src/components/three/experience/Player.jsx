import * as THREE from "three";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";

const SPEED = 8;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

export function Player() {
  const rigidBodyRef = useRef();
  const [, get] = useKeyboardControls();
  const [isInitialized, setIsInitialized] = useState(false); // Track initialization

  useFrame((state) => {
    if (!rigidBodyRef.current) return;

    const { forward, backward, left, right } = get();
    const velocity = rigidBodyRef.current.linvel();
    const { x, y, z } = rigidBodyRef.current.translation();

    // Initialize player and camera on first frame
    if (!isInitialized) {
      // Reset velocity to prevent falling immediately
      rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      // Set camera to look straight ahead (along Z-axis)
      state.camera.rotation.set(0.4, 0, 0); // X=0 (pitch), Y=0 (yaw), Z=0 (roll)
      setIsInitialized(true);
    }

    // Update camera position to follow the player
    state.camera.position.set(x, y + 1, z); // Adjusted to 1m offset for new capsule size

    // Movement
    frontVector.set(0, 0, backward - forward);
    sideVector.set(left - right, 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(state.camera.rotation);

    // Apply velocity (preserve Y for gravity)
    rigidBodyRef.current.setLinvel(
      { x: direction.x, y: velocity.y, z: direction.z },
      true
    );
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      colliders={false}
      mass={1}
      type="dynamic"
      position={[1, 10, 33]}
      enabledRotations={[false, false, false]}
    >
      <CapsuleCollider args={[0.5, 0.5]} />
    </RigidBody>
  );
}
