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

export function Authors2({ authors, date }: AuthorsProps) {
  return (
    <div className="mx-auto flex flex-col py-5 max-w-2xl border-y border-gray-100 mt-10 gap-4">
      {/* Stacked portraits shifting to the right */}
      <div className="flex -space-x-3 mb-1">
        {authors.map((author, i) => (
          author.img && (
            <img 
              key={i}
              src={`images/${author.img}`} 
              alt={author.name} 
              className="w-12 h-12 rounded-full object-cover ring-2 ring-[#f7f3ea] bg-gray-100" 
              style={{ zIndex: authors.length - i }}
            />
          )
        ))}
      </div>
      
      {/* Aligned blocks of names and jobs */}
      <div className="flex flex-wrap items-start gap-x-8 gap-y-4 text-xs">
        {authors.map((author, i) => (
          <div key={i} className="flex flex-col text-left leading-tight">
            <span className="font-extrabold tracking-tight">
              {author.link ? (
                <a 
                  href={author.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="underline underline-offset-2 transition-colors hover:text-red-600"
                >
                  {author.name}
                </a>
              ) : (
                author.name
              )}
            </span>
            {author.job && (
              <span className="text-gray-500 mt-0.5">{author.job}</span>
            )}
          </div>
        ))}
      </div>

      {/* Publication date */}
      {date && (
        <div className="text-xs text-gray-500 mt-2">
          Publié le {date}
        </div>
      )}
    </div>
  );
}
