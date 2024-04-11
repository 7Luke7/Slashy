import { Link } from "react-router-dom"

export const SingleChildCat = ({c}) => {
    return <div className="w-1/3 px-3 py-2 flex flex-col">
    <li className="text-gray-900 font-bold lg:text-[14px] xl:text-[15px]">
      <Link to={`/search?category=${c.id}&page=1`}>
        {c.nameEn}
      </Link>
      <hr className="border border-t-0 mt-1 border-l-0 border-r-0 border-[rgb(251,105,40)]"></hr>
    </li>
    <div className="flex flex-wrap flex-col mt-1 gap-2">
      {c.children.map((subchild, index) => {
        return <Link key={index} to={`/search?category=${subchild.id}&page=1`} className="text-xs font-normal text-gray-600 lg:hover:text-[rgb(251,77,1)]">{subchild.nameEn}</Link>
      })}
    </div>
  </div>
}