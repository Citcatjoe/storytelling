/**
 * Configuration des débordements (Breakouts)
 * Utilisé pour aligner les Galeries et les Blocs de mise en avant.
 */

export const BREAKOUTS = {
  // Mode "Medium" : Largeur intermédiaire d'environ 968px max
  med: {
    container: "w-full max-w-[968px] mx-auto px-4 md:px-7",
  },

  // Mode "High" : Largeur maximale (Hero Edge) s'alignant sur l'Article (1536px max)
  high: {
    container: "w-full max-w-screen-2xl mx-auto px-4 md:px-7",
    pageFullWidth: "-mx-4 md:-mx-7 w-[calc(100%+2rem)] md:w-[calc(100%+3.5rem)]",
  }
};
