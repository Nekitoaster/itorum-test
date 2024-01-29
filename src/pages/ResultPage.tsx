import React, { useEffect, useState } from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import { useGetComicsQuery } from "../stores/comics/comicsApi";
import ComicsItem from "../components/ComicsItem";
import { useLocation, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { TbFileSad } from "react-icons/tb";

export default function ResultPage() {
  const { search } = useLocation();
  const urlParams = new URLSearchParams(search);
  const [value, setValue] = useState(urlParams.get("value"));
  const navigate = useNavigate();
  let [request, setRequest] = useState<string>("");
  const {
    data: comicsData,
    isLoading,
    isError,
  } = useGetComicsQuery({ value: request });
  const [page, setPage] = useState<number>(0);
  const [pageData, setPageData] = useState<{}[] | []>([]);
  const [n] = useState<number>(8);

  const filterData = comicsData?.data?.results?.filter(
    (item: { title: string }) => {
      return item?.title?.toLowerCase().includes(request?.toLowerCase() || "");
    }
  );

  useEffect(() => {
    setRequest(value || "");
    if (!isLoading) {
      const filteredData = comicsData?.data?.results?.filter(
        (item: { title: string }) => {
          return item.title
            ?.toLowerCase()
            .includes(request?.toLowerCase() || "");
        }
      );
      setPageData(
        filteredData?.filter((_, index) => {
          return index >= page * n && index < (page + 1) * n;
        }) || []
      );
    }
  }, [page, request, isLoading, comicsData]);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const pageOnLoad = parseInt(params.get("page")) || 0;
    setPage(pageOnLoad);
  }, [search]);

  console.log("filterData", filterData);
  console.log("pageData: ", pageData);
  console.log("page", page);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(0);
    setRequest(value);
    navigate(`/comics?value=${value}`);
  };

  const handlePageChange = (e): void => {
    setValue(request);
    navigate(`/comics?value=${value}&page=${e.selected}`);
    setPage(e.selected);
  };
  return (
    <div className="wrapper">
      <form
        className="wrapper__input-box"
        style={{ marginTop: "0" }}
        onSubmit={handleSearch}
      >
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
      <div className="wrapper__results-container">
        {isError && !isLoading && (
          <h2 className="wrapper__error">Произошла неожиданная ошибка</h2>
        )}
        {isLoading && <h2 className="wrapper__loading">Загрузка...</h2>}
        {!isLoading && !isError && !request && (
          <h2 className="wrapper__loading">Начните поиск</h2>
        )}
        {!isLoading && filterData?.length < 1 && (
          <div className="wrapper__nothing-container">
            <h2 className="nothing-container__text">Ничего не найдено</h2>
            <span className="nothing-container__icon">
              <TbFileSad />
            </span>
          </div>
        )}
        {!isLoading &&
          request &&
          pageData &&
          pageData.map((item) => <ComicsItem key={item.id} props={item} />)}
      </div>
      {filterData?.length >= 8 && request && (
        <ReactPaginate
          containerClassName={"wrapper__pagination"}
          activeClassName={"pagination__active"}
          pageClassName={"pagination__page-item"}
          onPageChange={handlePageChange}
          breakLabel="..."
          pageCount={filterData && Math.ceil(filterData?.length / n)}
          previousLabel={<BiSolidLeftArrow />}
          nextLabel={<BiSolidRightArrow />}
          forcePage={page}
        />
      )}
    </div>
  );
}
