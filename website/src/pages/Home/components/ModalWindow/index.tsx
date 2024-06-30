import { FC } from "react";
import { Modal } from "antd";
import Book from "./../../../../assets/icons/book.svg?react";
import "./index.sass";

export const ModalWindow: FC<ModalWIndowProps> = ({ item, close }) => {
  const capitalizeAndAddDot = (text: string | undefined) => {
    if (!text) return "-";
    const capitalizedText = text.charAt(0).toUpperCase() + text.slice(1);
    if (capitalizedText?.length > 55) {
      return capitalizedText.substring(1, 55) + "...";
    } else {
      return capitalizedText.endsWith(".")
        ? capitalizedText
        : capitalizedText + ".";
    }
  };

  return (
    <Modal footer={false} open={!!item} onCancel={close}>
      <div className="user-info">
        {item && (
          <img
            src={item?.user?.profile_image?.medium}
            style={{ aspectRatio: `${item.width} / ${item.height}` }}
          />
        )}
        {item?.user?.name}
      </div>
      <img src={item?.urls?.regular} />
      <div className="metrics">
        <div>
          Views <span>{item?.views}</span>
        </div>
        <div>
          Downloads <span>{item?.downloads}</span>
        </div>
        <div>
          Likes <span>{item?.likes}</span>
        </div>
      </div>
      <div className={"location"}>
        <Book />
        {capitalizeAndAddDot(item?.description || item?.alt_description)}
      </div>
    </Modal>
  );
};
