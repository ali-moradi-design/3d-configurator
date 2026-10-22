import { BRAND } from '@/shared/config';
import styles from './credits.module.css';

export function Credits() {
  return (
    <footer id="credits" className={`container ${styles.footer}`}>
      <div>
        <h2 className={styles.heading}>Credits</h2>
        <ul className={styles.list}>
          <li>
            3D model &ldquo;Materials Variants Shoe&rdquo; &copy; 2021 Shopify, licensed{' '}
            <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>, from{' '}
            <a href="https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/MaterialsVariantsShoe">
              Khronos glTF-Sample-Assets
            </a>
            . Compressed for the web.
          </li>
          <li>
            Lighting: &ldquo;Studio Small 09&rdquo; HDRI by Sergej Majboroda,{' '}
            <a href="https://polyhaven.com/a/studio_small_09">Poly Haven</a>, CC0.
          </li>
          <li>
            Typeface: <a href="https://rsms.me/inter/">Inter</a> by Rasmus Andersson, SIL Open Font
            License 1.1.
          </li>
          <li>
            Built with <a href="https://github.com/pmndrs/react-three-fiber">react-three-fiber</a>{' '}
            and <a href="https://github.com/pmndrs/drei">drei</a> (MIT), inspired by the{' '}
            <a href="https://github.com/pmndrs/examples">pmndrs examples</a> (MIT).
          </li>
          <li>{BRAND} is a fictional brand made for a portfolio demo. Nothing here is for sale.</li>
        </ul>
      </div>
      <p className={styles.logo}>
        {BRAND}
        <span aria-hidden="true">.</span>
      </p>
    </footer>
  );
}
