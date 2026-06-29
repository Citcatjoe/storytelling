interface CreditItem {
  name: string;
  produces: string;
  link?: string;
}

interface CreditsProps {
  items: CreditItem[];
}

interface GroupedCredit {
  produces: string;
  people: { name: string; link?: string }[];
}

export function Credits({ items }: CreditsProps) {
  if (!items || items.length === 0) return null;

  // Regrouper les crédits qui partagent le même label "produces"
  const groupedItems = items.reduce<GroupedCredit[]>((acc, current) => {
    const existing = acc.find(item => item.produces === current.produces);
    const person = { name: current.name, link: current.link };
    if (existing) {
      existing.people.push(person);
    } else {
      acc.push({
        produces: current.produces,
        people: [person]
      });
    }
    return acc;
  }, []);

  return (
    <>
      <hr className="w-full max-w-[672px] mx-auto mt-16 border-gray-200" />
      <div className="w-full max-w-[672px] mx-auto mt-16 text-lg bg-gray-50 p-8">
        {groupedItems.map((group, idx) => (
          <div key={idx} className={idx === groupedItems.length - 1 ? "" : "mb-4"}>
            <div className="font-bold text-black">{group.produces}</div>
            {group.people.map((person, pIdx) => (
              <div key={pIdx} className="text-gray-700">
                {person.link ? (
                  <a
                    href={person.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-accent2 transition-colors"
                  >
                    {person.name}
                  </a>
                ) : (
                  person.name
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
