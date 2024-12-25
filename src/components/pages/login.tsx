import Logo from '../logo';
import { FormEvent, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { login } from '../../store/api-actions';
import { changeCity } from '../../store/setting-slice';
import { citiesForRandomString } from '../../const';

function Login(){
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(
        login({
          login: loginRef.current.value,
          password: passwordRef.current.value,
        })
      );
    }
  };

  const getRandomCity = () => citiesForRandomString[Math.floor(Math.random() * citiesForRandomString.length)];
  const newCityName = getRandomCity();
  const handleCityClick = () => {
    dispatch(changeCity(newCityName));
  };

  return (
    < div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo/>
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  ref={loginRef}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  ref={passwordRef}
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">
              Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link to="/" className="locations__item-link" onClick={handleCityClick}>
                <span>{newCityName}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>);
}

export default Login;