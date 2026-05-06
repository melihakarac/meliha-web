'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Custom iridescent shader — a pearlescent/holographic gradient
 * (pink → purple → blue → cyan) that swirls across the surface
 * based on view angle and a slowly rotating noise pattern.
 *
 * The look: chrome-like opaque sphere with a swirling oil-slick
 * highlight, similar to a soap bubble photographed under colored
 * lighting.
 */
const IridescentMaterial = () => {
  const matRef = useRef<THREE.ShaderMaterial>(null!)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color('#ff6ec7') }, // pink
      uColor2: { value: new THREE.Color('#a855f7') }, // purple
      uColor3: { value: new THREE.Color('#3b82f6') }, // blue
      uColor4: { value: new THREE.Color('#22d3ee') }, // cyan
      uColor5: { value: new THREE.Color('#fb923c') }, // warm orange highlight
    }),
    [],
  )

  useFrame(({ clock }) => {
    if (matRef.current) {
      ;(matRef.current.uniforms.uTime.value as number) = clock.elapsedTime
    }
  })

  return (
    <shaderMaterial
      ref={matRef}
      uniforms={uniforms}
      vertexShader={`
        varying vec3 vNormal;
        varying vec3 vViewDir;
        varying vec3 vWorldPos;

        void main() {
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPos = worldPos.xyz;
          vNormal = normalize(normalMatrix * normal);
          vViewDir = normalize(cameraPosition - worldPos.xyz);
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `}
      fragmentShader={`
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform vec3 uColor4;
        uniform vec3 uColor5;

        varying vec3 vNormal;
        varying vec3 vViewDir;
        varying vec3 vWorldPos;

        // 3D simplex-ish noise (cheap, smooth)
        vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
        vec4 mod289(vec4 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
        vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

        float snoise(vec3 v){
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i  = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod289(i);
          vec4 p = permute( permute( permute(
                    i.z + vec4(0.0, i1.z, i2.z, 1.0))
                  + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                  + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          float n_ = 0.142857142857;
          vec3 ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ *ns.x + ns.yyyy;
          vec4 y = y_ *ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
          p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
        }

        // 4-color gradient sweep, indexed by t in [0,1]
        vec3 holoGradient(float t) {
          vec3 c1 = mix(uColor1, uColor2, smoothstep(0.0, 0.33, t));
          vec3 c2 = mix(c1, uColor3, smoothstep(0.33, 0.66, t));
          vec3 c3 = mix(c2, uColor4, smoothstep(0.66, 1.0, t));
          return c3;
        }

        void main() {
          vec3 N = normalize(vNormal);
          vec3 V = normalize(vViewDir);

          // Fresnel — controls rim brightness on the bubble's edge
          float fresnel = pow(1.0 - max(dot(N, V), 0.0), 2.0);

          // Animated swirl — noise field rotates slowly through space
          float n1 = snoise(N * 1.6 + vec3(uTime * 0.18, uTime * 0.13, 0.0));
          float n2 = snoise(N * 3.0 + vec3(-uTime * 0.22, uTime * 0.17, uTime * 0.1));
          float swirl = (n1 * 0.6 + n2 * 0.4) * 0.5 + 0.5;

          // Combine view-angle and swirl so colors shift with both rotation
          // and the camera position — true iridescence
          float t = fract(swirl + dot(N, V) * 0.4 + uTime * 0.04);

          vec3 baseColor = holoGradient(t);

          // Warm highlight on the brightest fresnel band
          vec3 rimColor = mix(baseColor, uColor5, fresnel * 0.35);
          baseColor = mix(baseColor, rimColor, fresnel);

          // Specular hot-spot — gives the chrome/glass kick
          vec3 lightDir = normalize(vec3(0.6, 0.8, 0.5));
          float spec = pow(max(dot(reflect(-lightDir, N), V), 0.0), 32.0);
          baseColor += vec3(1.0) * spec * 0.4;

          // Slight darkening at center (back of sphere) to add depth
          float centerShade = smoothstep(0.0, 1.0, dot(N, V));
          baseColor *= mix(0.85, 1.0, centerShade);

          // Lift edges with a soft glow
          baseColor += baseColor * fresnel * 0.6;

          gl_FragColor = vec4(baseColor, 1.0);
        }
      `}
    />
  )
}

function HoloSphere() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = clock.elapsedTime * 0.08
    meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.15) * 0.1
  })

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 128, 128]} />
        <IridescentMaterial />
      </mesh>
    </Float>
  )
}

export default function HeroScene() {
  return (
    <div className="relative w-full h-full">
      {/* Soft floor shadow — colored, sits below the bubble */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 bottom-[6%] w-[65%] h-[14%] rounded-[50%] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(168,85,247,0.45) 0%, rgba(236,72,153,0.25) 40%, transparent 70%)',
          filter: 'blur(32px)',
        }}
      />

      {/* Ambient color halo behind the bubble */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(168,85,247,0.22) 0%, rgba(34,211,238,0.10) 35%, transparent 65%)',
          filter: 'blur(50px)',
        }}
      />

      <Canvas
        camera={{ position: [0, 0, 4.4], fov: 42 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <Environment preset="night" background={false} />
        <HoloSphere />
      </Canvas>
    </div>
  )
}
