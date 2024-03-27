import Link from 'next/link';

export const CatNav = () => {
    return <menu className="h-[450px] rounded-br-none rounded-bl-lg border border-gray-100 border-t-0 rounded-t-none shadow-sm">
    <div className="flex flex-col space-y-[18px] p-2 border-r-2 border-gray-100">
      {searchNav.map((cat, i) => {
        return (
          <li key={i} onMouseOver={() => showChildren(cat)} className="w-[180px] font-[500] text-xs">
            <Link href={`/search?category=${cat.id}&page=1`}>
            {cat.nameEn}                  
            </Link>
          </li>
        );
      })}
    </div>
  </menu>
}