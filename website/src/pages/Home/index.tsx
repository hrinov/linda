import { FC, useEffect, useRef, useState } from "react";
import "./index.sass";

export const Home: FC = () => {
  const [rows, setRows] = useState(3);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 18;
  const [lastList, setLastList] = useState(false);

  const getItems = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?count=${pageSize}&page=${page}&client_id=${
          import.meta.env.VITE_UNSPLASH_ACCESS_KEY
        }`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch photos");
      }
      const data = await response.json();
      if (data.length === 0) {
        setLastList(true);
      }
      setList((list) => [...list, ...data]);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
    setLoading(false);
  };

  const onScroll = (e) => {
    const item = e.target;
    if (!item || loading || lastList) return;
    const { scrollTop, scrollTopMax } = item;

    if (scrollTop == scrollTopMax) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const defineRowSize = (partNum: number): number[] => {
    const arr: number[] = [];
    for (let i = 1; i <= list?.length; i++) {
      arr.push(i);
    }

    const result: number[][] = [];
    const size = Math.ceil(arr.length / rows); // Size of each part

    for (let i = 0; i < arr.length; i += size) {
      const part = arr.slice(i, i + size);
      result.push(part);
    }

    return result[partNum - 1];
  };

  const imageBlock = (list: any[], rowNum: number) => {
    const rowItems = defineRowSize(rowNum);
    const items = list.filter((_, i) => rowItems.includes(i + 1));

    return (
      <div className="row-wrapper" key={rowNum}>
        {items.map((item) => (
          <div className="image-wrapper" key={item.id}>
            <img src={item.urls.small} alt={`Image ${item.id}`} />
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    if (!list.length && !loading && page === 1) getItems();
    if (!loading && page > 1) getItems();
  }, [page]);

  return (
    <div className="main-wrapper" onScroll={onScroll}>
      <div
        className="view-scope"
        style={{
          height:
            wrapperRef?.current?.clientHeight - window.innerHeight / 2 ||
            "100vh",
        }}
      >
        <div className="images-wrapper" ref={wrapperRef}>
          {Array.from({ length: rows }, (_, index) =>
            imageBlock(list, index + 1)
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
