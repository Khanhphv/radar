export enum KEY_TYPE {
  DAY = "1",
  WEEK = "2",
  MONTH = "3",
  UNLIMITED = "4",
}

export const KEY_TYPE_LIST = [
  { name: "DAY", value: KEY_TYPE.DAY },
  { name: "WEEK", value: KEY_TYPE.WEEK },
  { name: "MONTH", value: KEY_TYPE.MONTH },
  { name: "UNLIMITED", value: KEY_TYPE.UNLIMITED },
];

export enum KEY_STATUS {
  ACTIVE = "1",
  INACTIVE = "2",
}
