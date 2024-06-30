import { FC, useEffect, useRef, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import ArrowDown from "./../../assets/icons/arrow-down.svg?react";
import { ModalWindow } from "./components/ModalWindow";
import "./index.sass";
import { Header } from "./components/Header";
import { Helmet } from "react-helmet-async";

export const Home: FC = () => {
  const [modalStatus, setModalStatus] = useState<{ item: PhotoData } | null>();
  const wrapperRef = useRef(null);
  const [mobileMode, setMobileMode] = useState<boolean>(false);
  const [rows, setRows] = useState(mobileMode ? 1 : 3);
  const [list, setList] = useState<PhotoData[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 18;
  const [lastList, setLastList] = useState(false);
  const [maxScrollPoint, setMaxScrollPoint] = useState<number | null>(null);

  const closeModal = () => setModalStatus(null);

  const handleDownload = (e: any, link: string) => {
    e.stopPropagation();
    e.preventDefault();
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const handleItemClick = (item: PhotoData) => {
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
    (wrapperRef!.current as any).childNodes!.forEach((item: any) =>
      rowsHeights.push(item.scrollHeight)
    );
    const scrollPoint = Math.min(...rowsHeights);
    maxScrollPoint !== scrollPoint && setMaxScrollPoint(scrollPoint);
  };

  const onScroll = (e: any) => {
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

  const imageBlock = (list: PhotoData[], rowNum: number) => {
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

  useEffect(() => {
    const checkWindowSize = () => {
      setMobileMode(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setRows(1);
      } else {
        setRows(3);
      }
    };
    checkWindowSize();
    window.addEventListener("resize", checkWindowSize);

    return () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Linda-homepage</title>
      </Helmet>
      ;
      <section className="main-wrapper" onScroll={onScroll}>
        <Header {...{ rows, setRows, mobileMode }} />
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
      </section>
      <ModalWindow item={modalStatus?.item} close={closeModal} />
    </>
  );
};

export default Home;
