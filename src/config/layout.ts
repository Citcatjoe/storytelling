/**
 * Configuration des débordements (Breakouts)
 * Utilisé pour aligner les Galeries et les Blocs de mise en avant.
 */

export const BREAKOUTS = {
  // Mode "Medium" : Débordement modéré sur tablette/laptop
  // Aligne sur une largeur d'environ 800px (md) à 928px (lg+)
  med: {
    // Les marges négatives sont calculées pour que le bloc touche exactement le padding p-7 (28px) de l'article.
    // md (768px) -> (768 - 56 - 672) / 2 = 20px (-mx-5)
    // lg (1024px) -> (1024 - 56 - 672) / 2 = 148px (-mx-[148px])
    margin: "mx-0 md:-mx-5 lg:-mx-[148px]",
    container: "mx-auto max-w-full md:max-w-[712px] lg:max-w-[968px]",
  },

  // Mode "High" : Débordement maximal (Hero Edge)
  // Aligne sur les bords intérieurs de l'Article (1536px - padding)
  high: {
    // xl (1280px) -> (1280 - 56 - 672) / 2 = 276px
    // 2xl (1536px) -> (1536 - 56 - 672) / 2 = 404px
    galleryMargin: "mx-0 md:-mx-5 lg:-mx-[148px] xl:-mx-[276px] 2xl:-mx-[404px]",
    pageFullWidth: "w-screen max-w-screen-2xl relative left-1/2 -translate-x-1/2",
  }
};
