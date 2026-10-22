'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import {
  Center,
  ContactShadows,
  Environment,
  Float,
  OrbitControls,
  useGLTF,
} from '@react-three/drei';
import {
  Box3,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Vector3,
  type Group,
  type Material,
} from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useMediaQuery, useReducedMotion } from '@/shared/lib';
import { registerCapture } from '../lib/capture';
import { applyTint, createTintUniforms, type TintUniforms } from '../lib/tint';
import { COLORWAYS, getAccentHex, type ColorwayId, type Design } from '../model/options';

const MODEL_URL = '/models/shoe.glb';
const HDRI_URL = '/hdri/studio_small_09_1k.hdr';
const TARGET_SIZE = 3.4;

type VariantMaterials = Record<ColorwayId, MeshPhysicalMaterial>;

/** Reads the KHR_materials_variants mapping and loads one material per colorway. */
async function loadVariantMaterials(gltf: GLTF, uniforms: TintUniforms): Promise<VariantMaterials> {
  const json = gltf.parser.json as {
    extensions?: { KHR_materials_variants?: { variants: { name: string }[] } };
    meshes: {
      primitives: {
        extensions?: {
          KHR_materials_variants?: { mappings: { material: number; variants: number[] }[] };
        };
      }[];
    }[];
  };
  const names = json.extensions?.KHR_materials_variants?.variants ?? [];
  const mappings =
    json.meshes[0]?.primitives[0]?.extensions?.KHR_materials_variants?.mappings ?? [];

  const entries = await Promise.all(
    COLORWAYS.map(async ({ id }) => {
      const variantIndex = names.findIndex((v) => v.name === id);
      const mapping = mappings.find((m) => m.variants.includes(variantIndex));
      const source = (await gltf.parser.getDependency(
        'material',
        mapping?.material ?? 0,
      )) as MeshStandardMaterial;
      const physical = new MeshPhysicalMaterial();
      MeshStandardMaterial.prototype.copy.call(physical, source);
      applyTint(physical, uniforms);
      return [id, physical] as const;
    }),
  );
  return Object.fromEntries(entries) as VariantMaterials;
}

function applyFinish(material: MeshPhysicalMaterial, finish: Design['finish']) {
  const sheen = finish === 'sheen';
  const wasSheen = material.sheen > 0;
  material.sheen = sheen ? 1 : 0;
  material.sheenRoughness = 0.45;
  material.sheenColor.set('#ffffff');
  material.clearcoat = sheen ? 0.35 : 0;
  material.clearcoatRoughness = 0.5;
  if (sheen !== wasSheen) material.needsUpdate = true;
}

/** Imperative three.js updates live outside React components on purpose. */
function applyDesign(
  mesh: Mesh,
  materials: VariantMaterials,
  uniforms: TintUniforms,
  design: Design,
) {
  const material = materials[design.colorway];
  mesh.material = material as Material;
  applyFinish(material, design.finish);
  const hex = getAccentHex(design.accent);
  uniforms.uAmount.value = hex ? 1 : 0;
  if (hex) uniforms.uAccent.value.set(hex);
}

function ShoeModel({ design, onReady }: { design: Design; onReady: () => void }) {
  const gltf = useGLTF(MODEL_URL, false, true) as unknown as GLTF;
  const uniforms = useMemo(() => createTintUniforms(), []);
  const [materials, setMaterials] = useState<VariantMaterials | null>(null);
  const invalidate = useThree((s) => s.invalidate);
  const readyRef = useRef(false);

  const { mesh, scale } = useMemo(() => {
    let found: Mesh | null = null;
    gltf.scene.traverse((o) => {
      if (!found && (o as Mesh).isMesh) found = o as Mesh;
    });
    const size = new Box3().setFromObject(gltf.scene).getSize(new Vector3());
    return { mesh: found as Mesh | null, scale: TARGET_SIZE / Math.max(size.x, size.y, size.z) };
  }, [gltf]);

  useEffect(() => {
    let cancelled = false;
    loadVariantMaterials(gltf, uniforms).then((m) => !cancelled && setMaterials(m));
    return () => {
      cancelled = true;
    };
  }, [gltf, uniforms]);

  useEffect(() => {
    if (!materials || !mesh) return;
    applyDesign(mesh, materials, uniforms, design);
    invalidate();
    if (!readyRef.current) {
      readyRef.current = true;
      // Wait one frame so the first visible frame already shows the shoe.
      requestAnimationFrame(() => onReady());
    }
  }, [materials, mesh, design, uniforms, invalidate, onReady]);

  const group = useRef<Group>(null);
  return (
    <group ref={group} scale={scale}>
      <Center top>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  );
}

function CaptureBridge() {
  const { gl, scene, camera } = useThree();
  useEffect(() => {
    registerCapture(() => {
      gl.render(scene, camera);
      return gl.domElement.toDataURL('image/png');
    });
    return () => registerCapture(null);
  }, [gl, scene, camera]);
  return null;
}

export default function ShoeCanvas({ design, onReady }: { design: Design; onReady: () => void }) {
  const reducedMotion = useReducedMotion();
  const isSmall = useMediaQuery('(max-width: 768px)');

  return (
    <Canvas
      dpr={isSmall ? [1, 1.25] : [1, 2]}
      camera={{ position: [3.8, 2.6, 5.6], fov: 28 }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      frameloop={reducedMotion ? 'demand' : 'always'}
      style={{ position: 'absolute', inset: 0 }}
      aria-hidden="true"
    >
      <Environment files={HDRI_URL} environmentIntensity={0.9} />
      <directionalLight position={[3, 5, 4]} intensity={1.1} />
      <Float
        speed={reducedMotion ? 0 : 1.4}
        rotationIntensity={reducedMotion ? 0 : 0.12}
        floatIntensity={reducedMotion ? 0 : 0.35}
        floatingRange={[0.05, 0.2]}
      >
        <group position={[0, 0.45, 0]}>
          <ShoeModel design={design} onReady={onReady} />
        </group>
      </Float>
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.38}
        scale={9}
        blur={2.8}
        far={3}
        resolution={isSmall ? 256 : 512}
      />
      <OrbitControls
        makeDefault
        target={[0, 1.15, 0]}
        enablePan={false}
        enableZoom={false}
        autoRotate={!reducedMotion}
        autoRotateSpeed={1.1}
        minPolarAngle={Math.PI * 0.28}
        maxPolarAngle={Math.PI * 0.52}
      />
      <CaptureBridge />
    </Canvas>
  );
}
