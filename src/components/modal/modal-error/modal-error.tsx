import { Modal } from "@components/modal/modal";
import s from "./modal-error.module.css";
import { FC } from "react";
import { ModalErrorProps } from "./type";

export const ModalError: FC<ModalErrorProps> = ({
  title = "Произошла ошибка!",
  text = "Текст ошибки",
  ...props
}) => (
  <Modal {...props}>
    <div className={s.modalError}>
      <h2 className={s.title}>{title}</h2>
      <p className={s.text}>{text}</p>
    </div>
  </Modal>
);
