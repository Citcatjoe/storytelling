"use client";

interface Activity {
  id: string;
  label: string;
  subLabel?: string;
  imageSrc?: string;
}

const ACTIVITIES: Activity[] = [
  {
    id: "decharges",
    label: "Décharges",
  },
  {
    id: "gravieres",
    label: "Gravières",
  },
  {
    id: "promo",
    label: "Promo",
    subLabel: "immobilière",
  },
  {
    id: "construction",
    label: "Construction",
  },
  {
    id: "annexes",
    label: "Activités",
    subLabel: "annexes",
  },
];

export function ActivityGrid() {
  return (
    <div className="w-full my-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 lg:gap-8 justify-center">
        {ACTIVITIES.map((activity) => (
          <div 
            key={activity.id} 
            className="group flex flex-col items-center w-full"
          >
            {/* Boîte d'image / Placeholder */}
            <div className="relative w-full aspect-[9/16] rounded-2xl bg-[#E5DCC3]/30 border-2 border-dashed border-[#CBBFA0] flex flex-col items-center justify-center transition-all duration-500 ease-out hover:bg-[#D5C9A3]/40 hover:border-[#A69B7B] hover:shadow-[0_8px_30px_rgba(213,201,163,0.25)] group-hover:scale-[1.03] overflow-hidden">
              {/* Effet de reflet premium au survol */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              
              {/* Icône SVG premium en arrière-plan */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-10 h-10 text-[#CBBFA0] opacity-70 group-hover:opacity-95 group-hover:text-[#887754] transition-all duration-300 transform group-hover:rotate-3 group-hover:scale-110"
              >
                <path d="M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
              
              {/* Un petit indicateur technique premium */}
              <span className="absolute bottom-3 text-[10px] uppercase tracking-widest text-[#A69B7B]/70 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Gabarit 9:16
              </span>
            </div>

            {/* Label text */}
            <div className="mt-4 text-center flex flex-col justify-start items-center min-h-[50px] w-full">
              <span className="font-normal text-lg md:text-xl text-gray-800 leading-snug tracking-tight group-hover:text-accent2 group-hover:font-semibold transition-all duration-300 block">
                {activity.label}
              </span>
              {activity.subLabel && (
                <span className="font-normal text-lg md:text-xl text-gray-800 leading-snug tracking-tight group-hover:text-accent2 group-hover:font-semibold transition-all duration-300 block">
                  {activity.subLabel}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
