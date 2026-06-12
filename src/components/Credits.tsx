interface CreditItem {
  name: string;
  produces: string;
}

interface CreditsProps {
  items: CreditItem[];
}

interface GroupedCredit {
  produces: string;
  names: string[];
}

export function Credits({ items }: CreditsProps) {
  if (!items || items.length === 0) return null;

  // Regrouper les crédits qui partagent le même label "produces"
  const groupedItems = items.reduce<GroupedCredit[]>((acc, current) => {
    const existing = acc.find(item => item.produces === current.produces);
    if (existing) {
      existing.names.push(current.name);
    } else {
      acc.push({
        produces: current.produces,
        names: [current.name]
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
            {group.names.map((name, nameIdx) => (
              <div key={nameIdx} className="text-gray-700">{name}</div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
