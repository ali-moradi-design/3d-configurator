// Compresses the source GLB: Meshopt geometry + WebP textures (max 1024 px).
// KTX2 needs the `toktx` binary, which is not installed in CI, so WebP is used instead.
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { MeshoptEncoder, MeshoptDecoder } from 'meshoptimizer';
import { dedup, prune, resample, textureCompress, meshopt } from '@gltf-transform/functions';
import sharp from 'sharp';

await MeshoptEncoder.ready;
const io = new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({ 'meshopt.decoder': MeshoptDecoder, 'meshopt.encoder': MeshoptEncoder });

const doc = await io.read('assets-src/MaterialsVariantsShoe.glb');
await doc.transform(
  dedup(),
  prune(),
  resample(),
  textureCompress({ encoder: sharp, targetFormat: 'webp', resize: [1024, 1024], quality: 82 }),
  meshopt({ encoder: MeshoptEncoder, level: 'high' }),
);
await io.write('public/models/shoe.glb', doc);
console.log('written public/models/shoe.glb');
