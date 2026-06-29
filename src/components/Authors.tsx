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

export function Authors({ authors, date }: AuthorsProps) {
  return (
    <div className="mx-auto flex flex-col md:flex-row flex-wrap py-5 max-w-2xl border-y border-gray-100 gap-6 md:gap-x-12 mt-10">
      {authors.map((author, i) => (
        <div key={i} className="flex items-center gap-3">
          {author.img && (
            <img 
              src={`images/${author.img}`} 
              alt={author.name} 
              className="hidden md:block w-12 h-12 rounded-full object-cover bg-gray-100" 
              loading="lazy"
            />
          )}
          <div className="text-xs leading-tight">
            <div className="font-extrabold tracking-tight">
              {author.link ? (
                <a href={author.link} target="_blank" rel="noopener noreferrer" className="underline  underline-offset-2 transition-colors">
                  {author.name}
                </a>
              ) : (
                author.name
              )}
            </div>
            <div className="text-gray-500">{author.job}</div>
          </div>
        </div>
      ))}
      {date && <div className="w-full text-xs">Publié le {date}</div>}
    </div>
  );
}
