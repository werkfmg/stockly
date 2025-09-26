import NavButtons from '../PagesBtn'
import { ModeToggle } from './ModeToggel'
import { AiFillProduct } from 'react-icons/ai'

const AppHeader = () => {
  return (
    <div className="flex justify-between items-center p-2">
      <AppLogo />
      <div className="flex items-center gap-4">
        <NavButtons />
        <ModeToggle />
      </div>
    </div>
  )
}

function AppLogo() {
  return (
    <div className="flex items-center gap-2 transition-all">
      <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <AiFillProduct className="text-xl" />
      </div>
      <span className="truncate font-semibold text-[24px]">Stockly</span>
    </div>
  )
}

export default AppHeader
