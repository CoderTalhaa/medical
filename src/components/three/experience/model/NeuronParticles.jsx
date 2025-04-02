import * as THREE from "three";
import { useRef, useMemo } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

const NeuronParticleMaterial = shaderMaterial(
  {
    time: 0,
    colorBlue: new THREE.Color(0.3, 0.5, 1.0), // Blue color
    colorPurple: new THREE.Color(0.8, 0.3, 1.0), // Purple color
    pointSize: 0.8, // Even smaller size for sharper appearance
  },
  // Vertex shader
  `
  uniform float time;
  uniform float pointSize;
  
  attribute float random;
  attribute float colorMix;
  attribute vec3 startPoint;
  attribute vec3 endPoint;
  
  varying float vColorMix;
  
  // Noise function for more natural movement
  float noise(float x) {
    return sin(x * 1.5) * 0.5 + sin(x * 3.7) * 0.25 + sin(x * 7.3) * 0.125;
  }
  
  void main() {
    vColorMix = colorMix;
    
    // Calculate position along the line with slower time-based movement
    float speed = 0.05 + random * 0.07;  // Much slower speed
    float progress = fract(time * speed + random); // Fractional part for looping
    
    // Linear interpolation between start and end points
    vec3 pos = mix(startPoint, endPoint, progress);
    
    // Create two perpendicular directions for varied movement
    vec3 dir = normalize(endPoint - startPoint);
    vec3 perpDir1 = normalize(cross(dir, vec3(0.0, 1.0, 0.0)));
    vec3 perpDir2 = normalize(cross(dir, perpDir1));
    
    // Add oscillating movement in perpendicular directions
    float noiseTime = time * 0.2 + random * 10.0;
    float offset1 = noise(noiseTime) * (random * 0.3);
    float offset2 = noise(noiseTime + 3.14) * (random * 0.3);
    
    // Apply the oscillations
    pos += perpDir1 * offset1;
    pos += perpDir2 * offset2;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = pointSize * (120.0 / -mvPosition.z); // Even smaller base size
    gl_Position = projectionMatrix * mvPosition;
  }
  `,
  // Fragment shader - even sharper with minimal blur
  `
  uniform vec3 colorBlue;
  uniform vec3 colorPurple;
  
  varying float vColorMix;
  
  void main() {
    // Create an even sharper point
    float dist = distance(gl_PointCoord, vec2(0.5));
    float alpha = smoothstep(0.5, 0.45, dist); // Very small smooth edge
    
    // Mix blue and purple based on the colorMix attribute
    vec3 finalColor = mix(colorBlue, colorPurple, vColorMix);
    
    gl_FragColor = vec4(finalColor, alpha * 0.7); // Reduced opacity for less bloom
  }
  `
);

extend({ NeuronParticleMaterial });

export const NeuronParticles = ({ positions = [] }) => {
  const particlesRef = useRef();
  const count = 1000;

  // Create the particles with attributes
  const [particles, randoms, colorMixes, startPoints, endPoints] =
    useMemo(() => {
      if (!positions || positions.length < 5)
        return [
          new Float32Array(),
          new Float32Array(),
          new Float32Array(),
          new Float32Array(),
          new Float32Array(),
        ];

      const posArray = new Float32Array(count * 3);
      const randArray = new Float32Array(count);
      const colorMixArray = new Float32Array(count);
      const startPointsArray = new Float32Array(count * 3);
      const endPointsArray = new Float32Array(count * 3);

      // Convert positions to Vector3
      const organPoints = positions.map(
        (p) => new THREE.Vector3(p[0], p[1], p[2])
      );

      // Create pentagon edges - connect each point to the next
      const connections = [];
      for (let i = 0; i < organPoints.length; i++) {
        const nextIndex = (i + 1) % organPoints.length;
        connections.push([i, nextIndex]);
      }

      let particleIndex = 0;
      const particlesPerConnection = Math.floor(count / connections.length);

      // Distribute particles along the pentagon edges
      connections.forEach(([startIdx, endIdx]) => {
        const startPoint = organPoints[startIdx];
        const endPoint = organPoints[endIdx];

        for (
          let i = 0;
          i < particlesPerConnection && particleIndex < count;
          i++
        ) {
          // Random initial position along the line
          const t = Math.random();
          const pos = startPoint.clone().lerp(endPoint, t);

          // Store position
          posArray[particleIndex * 3] = pos.x;
          posArray[particleIndex * 3 + 1] = pos.y;
          posArray[particleIndex * 3 + 2] = pos.z;

          // Store random value for animation variation
          randArray[particleIndex] = Math.random();

          // Store color mix value - more blue bias for sharper look
          colorMixArray[particleIndex] = Math.random() * 0.7; // Bias toward blue

          // Store start and end points for this particle's path
          startPointsArray[particleIndex * 3] = startPoint.x;
          startPointsArray[particleIndex * 3 + 1] = startPoint.y;
          startPointsArray[particleIndex * 3 + 2] = startPoint.z;

          endPointsArray[particleIndex * 3] = endPoint.x;
          endPointsArray[particleIndex * 3 + 1] = endPoint.y;
          endPointsArray[particleIndex * 3 + 2] = endPoint.z;

          particleIndex++;
        }
      });

      // Fill any remaining particles
      while (particleIndex < count) {
        // Pick a random edge
        const [startIdx, endIdx] =
          connections[Math.floor(Math.random() * connections.length)];
        const startPoint = organPoints[startIdx];
        const endPoint = organPoints[endIdx];

        // Random position along the line
        const pos = startPoint.clone().lerp(endPoint, Math.random());

        // Store position
        posArray[particleIndex * 3] = pos.x;
        posArray[particleIndex * 3 + 1] = pos.y;
        posArray[particleIndex * 3 + 2] = pos.z;

        // Store random value for animation
        randArray[particleIndex] = Math.random();

        // Store color mix value
        colorMixArray[particleIndex] = Math.random() * 0.7; // Bias toward blue

        // Store start and end points
        startPointsArray[particleIndex * 3] = startPoint.x;
        startPointsArray[particleIndex * 3 + 1] = startPoint.y;
        startPointsArray[particleIndex * 3 + 2] = startPoint.z;

        endPointsArray[particleIndex * 3] = endPoint.x;
        endPointsArray[particleIndex * 3 + 1] = endPoint.y;
        endPointsArray[particleIndex * 3 + 2] = endPoint.z;

        particleIndex++;
      }

      return [
        posArray,
        randArray,
        colorMixArray,
        startPointsArray,
        endPointsArray,
      ];
    }, [positions, count]);

  useFrame((state) => {
    if (particlesRef.current) {
      // Animate material uniforms
      particlesRef.current.material.uniforms.time.value =
        state.clock.getElapsedTime();
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-random"
          array={randoms}
          count={count}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-colorMix"
          array={colorMixes}
          count={count}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-startPoint"
          array={startPoints}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-endPoint"
          array={endPoints}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <neuronParticleMaterial
        attach="material"
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        pointSize={0.8}
      />
    </points>
  );
};
