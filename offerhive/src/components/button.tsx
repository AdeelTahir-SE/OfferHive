import { MouseEventHandler } from "react";
import RedirectIcon from "./redirectComponent";

export default function Button({
  text,
  onClick,
  className,
  redirectIcon = false,
}: {
  text: string;
  className?: string;
  redirectIcon?: boolean;
  onClick: MouseEventHandler;
}) {
  return (
    <button
      className={`${className} px-[20px] py-[12px] xl:px-[25px] xl:py-[15px]  cursor-pointer rounded-2xl bg-primary hover:bg-secondary text-black font-semibold flex flex-row items-center justify-center gap-[10px] transition duration-200`}
      onClick={onClick}
    >
      {text}
      {redirectIcon ? <RedirectIcon className="max-w-12 w-6 h-6" /> : ""}
    </button>
  );
}
