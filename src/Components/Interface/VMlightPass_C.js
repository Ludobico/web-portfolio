import * as THREE from "three";

export const VMlightPass_C = {
  uniforms: {
    time: { value: 0 },
    progress: { value: 0.0 },
    radius: { value: 0.1 },
    lightPosition: { value: new THREE.Vector2(0.5, 0.5) },
  },

  vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      
    }`,

  fragmentShader: `
      uniform float time;
      uniform float progress;
      uniform float radius;
      uniform vec2 lightPosition;
      varying vec2 vUv;

      void main() {
        vec2 p = -1.0 + 2.0 * vUv;
        float len = length(p);

        float distort = radius * pow(len, 2.0);
        vec2 uv = vUv + (p / len) * distort * progress;

        float intensity = 0.9 - length(lightPosition - vUv);
        vec3 color = vec3(1.0, 1.0, 1.0) * pow(intensity, 8.0);

        gl_FragColor = vec4(color, 1.0);
      }`,
};
