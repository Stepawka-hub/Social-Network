import { FC } from "react";
import { ButtonProps } from "./types";
import s from "./button.module.css";
import clsx from "clsx";

export const Button: FC<ButtonProps> = ({
  className,
  disabled,
  children,
  ...props
}) => (
  <button
    className={clsx(s.button, className, {
      [s.disabled]: disabled,
    })}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);
