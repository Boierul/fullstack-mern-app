import logo from '../assets/logo.png';
import './Header.css'

export default function Header() {
  return (
    <nav>
      <div className='header-section'>
        <a className='navbar-brand' href='/'>
          <div className='d-flex'>
            <img src={logo} alt='logo' className='mr-4' />
            <div className="header-logo-text">Fullstack GraphQL Web Application</div>
          </div>
        </a>
      </div>
    </nav>
  );
}
