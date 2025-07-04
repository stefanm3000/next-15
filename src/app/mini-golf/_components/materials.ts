import * as THREE from "three";

// Gradient material for the golf ball and course elements
export const gradientMaterial = new THREE.ShaderMaterial({
  uniforms: {},
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    void main() {
      float gradient = 1.0 - length(vUv - 0.5);
      vec3 color1 = vec3(0.25, 0.25, 0.25); // Medium gray
      vec3 color2 = vec3(0.02, 0.02, 0.02); // Deep black
      vec3 finalColor = mix(color2, color1, gradient);
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
});

// Background material for the environment
export const backgroundMaterial = new THREE.ShaderMaterial({
  uniforms: {},
  vertexShader: `
    varying vec3 vWorldPosition;
    void main() {
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vWorldPosition;
    void main() {
      float gradient = clamp((vWorldPosition.y + 10.0) / 20.0, 0.0, 1.0);
      vec3 color1 = vec3(0.08, 0.08, 0.08); // Dark gray
      vec3 color2 = vec3(0.02, 0.02, 0.02); // Almost black
      vec3 finalColor = mix(color2, color1, gradient);
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
  side: THREE.BackSide,
});
