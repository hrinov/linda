import { FC, useEffect, useRef, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import ArrowDown from "./../../assets/icons/arrow-down.svg?react";
import { ModalWindow } from "./components/ModalWindow";
import "./index.sass";

export const Home: FC = () => {
  const [modalStatus, setModalStatus] = useState<{ item: any } | null>();
  const wrapperRef = useRef(null);
  const [rows, setRows] = useState(3);
  const [list, setList] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 18;
  const [lastList, setLastList] = useState(false);
  const [maxScrollPoint, setMaxScrollPoint] = useState<number | null>(null);

  const closeModal = () => setModalStatus(null);

  const handleDownload = (e, link: string) => {
    e.preventDefault();
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const handleItemClick = (item) => {
    setModalStatus({ item });
  };

  const getItems = async () => {
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
    setMaxScrollPoint(null);
  };

  const getMaxScrollPoint = () => {
    const rowsHeights: number[] = [];
    wrapperRef.current.childNodes.forEach((item) =>
      rowsHeights.push(item.scrollHeight)
    );
    const scrollPoint = Math.min(...rowsHeights);
    maxScrollPoint !== scrollPoint && setMaxScrollPoint(scrollPoint);
  };

  const onScroll = (e) => {
    getMaxScrollPoint();
    const item = e.target;
    if (lastList) return;
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

    const groups: number[][] = Array.from({ length: rows }, () => []);
    arr.forEach((number, index) => {
      const groupIndex = index % rows;
      if (groupIndex === partNum - 1) {
        groups[groupIndex].push(number);
      }
    });

    return groups[partNum - 1];
  };

  const imageBlock = (list: any[], rowNum: number) => {
    const rowItems = defineRowSize(rowNum);
    const items = list.filter((_, i) => rowItems.includes(i + 1));

    return (
      <div className="row-wrapper" key={rowNum}>
        {items.map((item, i) => (
          <div
            className="image-wrapper"
            style={{ aspectRatio: `${item.width} / ${item.height}` }}
            key={`${item.id}-${rowNum}-${i}`}
            onClick={() => handleItemClick(item)}
          >
            <img src={item.urls.small} />
            <a onClick={(e) => handleDownload(e, item.links.download)}>
              <ArrowDown />
            </a>
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    if (!list.length && page === 1) getItems();
    if (maxScrollPoint && page > 1) getItems();
  }, [page]);

  return (
    <>
      <div className="main-wrapper" onScroll={onScroll}>
        <header>
          <div className="switchers-holder">
            <div
              className={rows == 3 ? "active" : ""}
              onClick={() => rows !== 3 && setRows(3)}
            >
              |||
            </div>
            <div
              className={rows == 5 ? "active" : ""}
              onClick={() => rows !== 5 && setRows(5)}
            >
              |||||
            </div>
          </div>
        </header>
        <SwitchTransition mode={"out-in"}>
          <CSSTransition
            key={rows}
            classNames="fade"
            appear={true}
            timeout={0}
            unmountOnExit
          >
            <div
              className="view-scope"
              style={maxScrollPoint ? { height: maxScrollPoint } : {}}
            >
              <div className={`images-wrapper rows-${rows}`} ref={wrapperRef}>
                {Array.from({ length: rows }, (_, index) =>
                  imageBlock(list, index + 1)
                )}
              </div>
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
      <ModalWindow
        isOpen={!!modalStatus?.item}
        item={modalStatus?.item}
        close={closeModal}
      />
    </>
  );
};

export default Home;
