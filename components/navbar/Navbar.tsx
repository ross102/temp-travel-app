import NavSearch from "./NavSearch";
import LinksDropDown from "./LinksDropDown";
import DarkMode from "./DarkMode";
import Logo from "./Logo";
import { Suspense } from 'react';



function Navbar() {
  return (

    <nav className='border-b'>
    <div className='container flex flex-col sm:flex-row  sm:justify-between sm:items-center flex-wrap gap-4 py-8'>
      <Logo />
      <Suspense fallback={'...'}>
      <NavSearch />
      </Suspense>
      <div className='flex gap-4 items-center '>
        <DarkMode />
        <LinksDropDown />
      </div>
    </div>
  </nav>
  )
}

export default Navbar