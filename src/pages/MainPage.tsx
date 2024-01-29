import React, { useState } from "react";
import Chevron from "../components/Chevron";
import { AiOutlineFileSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    value && navigate(`/comics?value=${value}`);
  }

  return (
    <div className="wrapper">
      <div className="wrapper__header-container">
        <img
          className="header-container__bcg-img"
          src="public/img/boom.png"
          alt=""
          width={300}
        />
        <h2 className="header-container__search-label">
          Откройте для себя новые вселенные!
        </h2>
      </div>
      <Chevron />
        <form className="wrapper__input-box" onSubmit={handleSearch}>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="input-box__search-filed"
            type="text"
            placeholder="Введите Ваш запрос"
          />

          <button className="input-box__search-icon-box" type="submit">
            <AiOutlineFileSearch />
          </button>
        </form>
      <img
        src="public/img/spider-man.png"
        alt="Человек-Павук"
        className="wrapper__spider-man"
      />
      <img
        src="public/img/mysterio.png"
        alt="Мистерио"
        className="wrapper__mysterio"
      />
    </div>
  );
}
