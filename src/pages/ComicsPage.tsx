import React from "react";
import { useLocation } from "react-router-dom";
import { IoHeartSharp } from "react-icons/io5";

function ComicsPage() {
  const { state } = useLocation();
  const { thumbnail, title, textObjects, prices, creators } = state.props;
  const { text } = textObjects[0] || { text: "Нет описания" };
  const { path, extension } = thumbnail;
  const { price } = prices[0];
  return (
    <div className="wrapper-row">
      <div className="wrapper-row__thumbnail-container">
        <span className="thumbnail-container__heart">
          <IoHeartSharp />
        </span>
        <img
          className="thumbnail-container__thumbnail"
          src={path + "." + extension}
          alt={`Постер ${title}`}
          width={300}
        />
      </div>
      <div className="wrapper-row__description-container">
        <h2 className="description-container__title">
          <span className="underline-text">Название</span>: {title}
        </h2>
        <p className="description-container__desc">
          <span className="underline-text">Описание</span>: {text}
        </p>
        <p className="description-container__creaters">
          <span className="underline-text">Авторы</span>:{" "}
          {creators.items.length > 0
            ? creators.items
                .reduce((acc: string, item) => acc + `${item.name}, `, "")
                .replace(/,\s*$/, "")
            : "Неизвестно"}
        </p>
        <p className="description-container__price">
          <span className="underline-text">Цена</span>: {price}$
        </p>
        {price > 0 ? (
          <button className="description-container__buy">Купить</button>
        ) : (
          <button className="description-container__buy">
            Добавить в коллекцию
          </button>
        )}
      </div>
    </div>
  );
}

export default ComicsPage;
