import { GoogleTagManager } from '@next/third-parties/google';

export function GTM() {
  // Le composant natif de Next.js remplace votre snippet complexe (qui avait le <script> et le <noscript>).
  // Il injecte tout seul ce qu'il faut au bon endroit, proprement, sans bloquer la page.
  return <GoogleTagManager gtmId="GTM-WCL8QV" />;
}
