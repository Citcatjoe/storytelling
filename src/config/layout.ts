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

/**
 * Helper to dynamically merge default margin classes with custom margin overrides.
 * If the custom classes contain any margin classes (e.g., mt-, mb-, my-, mx-, m-),
 * the corresponding default margin classes are filtered out to prevent CSS conflicts
 * and margin collapse issues.
 */
export function mergeMargins(defaultClasses: string, customClasses: string): string {
  if (!customClasses) return defaultClasses;
  
  const customWords = customClasses.trim().split(/\s+/);
  const hasCustomMargin = customWords.some(w => /^([a-z0-9]+:)?-?m[tblrxy]?-\S+/.test(w));
  
  if (!hasCustomMargin) {
    return `${defaultClasses} ${customClasses}`;
  }
  
  const hasMt = customWords.some(w => /^([a-z0-9]+:)?-?mt-\S+/.test(w));
  const hasMb = customWords.some(w => /^([a-z0-9]+:)?-?mb-\S+/.test(w));
  const hasMy = customWords.some(w => /^([a-z0-9]+:)?-?my-\S+/.test(w));
  const hasM = customWords.some(w => /^([a-z0-9]+:)?-?m-\S+/.test(w));
  
  let filteredDefaults = defaultClasses.split(/\s+/);
  if (hasM || hasMy) {
    filteredDefaults = filteredDefaults.filter(w => !/^([a-z0-9]+:)?-?(mt|mb|my|m)-\S+/.test(w));
  } else {
    if (hasMt) {
      filteredDefaults = filteredDefaults.filter(w => !/^([a-z0-9]+:)?-?(mt|my|m)-\S+/.test(w));
    }
    if (hasMb) {
      filteredDefaults = filteredDefaults.filter(w => !/^([a-z0-9]+:)?-?(mb|my|m)-\S+/.test(w));
    }
  }
  
  return [...filteredDefaults, ...customWords].join(" ");
}
