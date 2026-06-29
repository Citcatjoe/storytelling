interface Author {
  name: string;
  job: string;
  img: string;
  link?: string;
}

interface AuthorsProps {
  authors: Author[];
  date?: string;
}

export function Authors3({ authors, date }: AuthorsProps) {
  return (
    <div className="mx-auto w-full max-w-2xl mt-8 sm:mt-10 select-none">
      <div className="flex flex-col sm:flex-row justify-between items-stretch gap-y-4 gap-x-0">
        {authors.map((author, i) => (
          <div 
            key={i} 
            className="group flex-1 flex flex-row sm:flex-col items-center sm:items-center text-left sm:text-center py-0 sm:px-4 sm:py-0 gap-4 sm:gap-3 sm:border-r sm:border-[#CBBFA0] last:sm:border-r-0"
          >
            {author.img && (
              <img 
                src={`images/${author.img}`} 
                alt={author.name} 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover bg-gray-100 shadow-lg shrink-0" 
                loading="lazy"
              />
            )}
            <div className="text-xs leading-tight flex flex-col gap-0.5">
              <div className="font-bold tracking-tight text-gray-700">
                {author.link ? (
                  <a 
                    href={author.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="underline underline-offset-2 hover:text-accent2 transition-colors"
                  >
                    {author.name}
                  </a>
                ) : (
                  author.name
                )}
              </div>
              <div className="text-[#8E8366] opacity-100">{author.job}</div>
            </div>
          </div>
        ))}
      </div>
      {date && (
        <div className="text-[12px] text-[#E20000] font-mono mt-6 md:mt-10 text-left sm:text-center">
          Publié le {date}
        </div>
      )}
    </div>
  );
}
