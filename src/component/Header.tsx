import HeaderTop from "./HeaderTop"
import HeaderBottom from "./HeaderBottom"

const Header: React.FC = () => {
  return (
    <header 
      className="w-full fixed left-0 z-40 top-0"
      role="banner"
      aria-label="Main header"
    >
      <HeaderTop />
      <HeaderBottom />
    </header>
  )
}

export default Header
