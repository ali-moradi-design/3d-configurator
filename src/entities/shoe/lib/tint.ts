import { Color, type Material, type WebGLProgramParametersWithUniforms } from 'three';

export type TintUniforms = {
  uAccent: { value: Color };
  uAmount: { value: number };
};

export function createTintUniforms(): TintUniforms {
  return { uAccent: { value: new Color('#ffffff') }, uAmount: { value: 0 } };
}

/**
 * Recolors only the saturated (colored) areas of the base color map to the accent color
 * and keeps their light/dark detail. White sole and dark laces are left untouched.
 */
export function applyTint(material: Material, uniforms: TintUniforms) {
  material.onBeforeCompile = (shader: WebGLProgramParametersWithUniforms) => {
    shader.uniforms.uAccent = uniforms.uAccent;
    shader.uniforms.uAmount = uniforms.uAmount;
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        '#include <common>\nuniform vec3 uAccent;\nuniform float uAmount;',
      )
      .replace(
        '#include <map_fragment>',
        `#include <map_fragment>
        #ifdef USE_MAP
        {
          vec3 base = diffuseColor.rgb;
          float hi = max(base.r, max(base.g, base.b));
          float lo = min(base.r, min(base.g, base.b));
          float sat = (hi - lo) / max(hi, 0.0001);
          float mask = smoothstep(0.15, 0.35, sat) * smoothstep(0.01, 0.05, hi);
          float lumBase = dot(base, vec3(0.2126, 0.7152, 0.0722));
          float lumAccent = max(dot(uAccent, vec3(0.2126, 0.7152, 0.0722)), 0.02);
          vec3 tinted = uAccent * clamp(lumBase / lumAccent, 0.25, 2.0);
          diffuseColor.rgb = mix(base, tinted, mask * uAmount);
        }
        #endif`,
      );
  };
  material.customProgramCacheKey = () => 'shoe-tint';
}
