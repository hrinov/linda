import { FC } from "react";
import { Modal } from "antd";
import Location from "./../../../../assets/icons/location.svg?react";
import "./index.sass";

export const ModalWindow: FC<ModalWIndowProps> = ({ isOpen, item, close }) => {
  console.log(item);
  return (
    <Modal footer={false} open={isOpen} onCancel={close}>
      <div className="user-info">
        <img src={item?.user?.profile_image?.medium} />
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
        <Location />
        {item?.location?.name}
      </div>
    </Modal>
  );
};
