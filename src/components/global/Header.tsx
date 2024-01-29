import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <span className="header__logo">
        <img src="public/svg/Marvel_Logo.svg" alt="Логотип" width={140} />
      </span>
      <nav className="header__navigation-container">
        <ul className="navigation-container__list">
          <li onClick={() => navigate("/")} className="list__item">
            Главная
          </li>
          <li className="list__item">Коллекция</li>
          <li className="list__item list__item_red">Избранное</li>
          <li className="list__item">Корзина</li>
        </ul>
      </nav>
      <div className="header__auth-container">
        <span className="auth-container__text">Авторизация</span>
      </div>
    </header>
  );
}

export default Header;
