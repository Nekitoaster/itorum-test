import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  props: {
    id: number;
    thumbnail: { path: string; extension: string };
    title: string;
  };
};

export default function ComicsItem({ props }: Props) {
  const { id, thumbnail, title } = props;
  const { path, extension } = thumbnail;

  const navigate = useNavigate();

  return (
    <div
      className="results-container__card-container"
      onClick={() => navigate(`/comics/id:${id}`, { state: { props } })}
    >
      <img
        className="card-container__img"
        src={path + "." + extension}
        alt=""
        width={140}
      />
      <p className="card-container__title">{title}</p>
    </div>
  );
}
