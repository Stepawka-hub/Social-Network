import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import './Header.css';
import UserDetails from './UserDetails/UserDetails';
import Loader from '../common/Loader/Loader';

import logo from '../../assets/images/logo.png';
import logoutIcon from '../../assets/images/logout.svg';
import avatarDefault from './../../assets/images/black.png';
import Button from '../common/Button/Button';

import { logoutUser } from '../../redux/auth/thunks';
import { getAuthEmail, getAuthLogin, getIsAuth, getIsLoading } from '../../redux/auth/selectors';


const Header = ({ login, email, photos, ...props }) => {
  const userDetails = {
    login: login,
    email: email,
    photo: photos?.small || avatarDefault
  }

  return (
    <header className="header">
      <img src={logo} className='logo' alt='Logo' />

      <div>
        {
          props.isLoading ?
            <Loader /> :
            <div>
              {
                props.isAuth ?
                  <div className='header__user-details'>
                    <UserDetails {...userDetails} />
                    <Button className='header__logout' onClick={props.logoutUser}>
                      <img src={logoutIcon} alt='Logout'></img>
                    </Button>
                  </div>
                  :
                  <NavLink to='/login' className='header__link'>
                    Login
                  </NavLink>
              }
            </div>
        }
      </div>
    </header>
  );
}

const mapStateToProps = (state) => ({
  login: getAuthLogin(state),
  email: getAuthEmail(state),
  isLoading: getIsLoading(state),
  isAuth: getIsAuth(state),
});

export default connect(mapStateToProps, { logoutUser })(Header);