import { KEY_TYPE } from "@/app/config/constant";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function chipColorByType(type: string) {
  let color = "red";
  switch (type) {
    case KEY_TYPE.DAY:
      color = "blue";
      break;
    case KEY_TYPE.WEEK:
      color = "purple";
      break;
    case KEY_TYPE.MONTH:
      color = "orange";
      break;
    default:
      color = "red";
  }
  return color;
}
