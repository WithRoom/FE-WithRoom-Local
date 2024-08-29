import { Link } from 'react-router-dom';
import { Navbar, Button } from 'react-bootstrap';
import kakaoimg from '../../images/kakao.png';

const Header = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <Navbar.Brand href="#" className="mx-2 mt-3">소개</Navbar.Brand>
      <Link to="/login" className="mx-2 mt-3">
        <Button variant="outline-primary" style={{ backgroundColor: 'white', borderColor: 'yellow' }}>
          <img src={kakaoimg} alt="Login" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
        </Button>
      </Link>
      <Navbar.Brand href="#" className="mx-2 mt-3">스터디</Navbar.Brand>
    </div>
  );
};

export default Header;