"use client";

import { IKey, useFetchData } from "@/app/views/key-list/fetchData";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { KEY_STATUS, KEY_TYPE_LIST } from "@/app/config/constant";
import moment from "moment";
import DeleteKeyButton from "@/components/molecules/keys/button-delete";
import UpdateButton from "@/components/molecules/keys/button-update";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { chipColorByType } from "@/lib/utils";

export const useKeyColumns = ({
  callback,
}: {
  callback: () => Promise<any>;
}) => {
  const columns: ColumnDef<IKey>[] = [
    {
      accessorKey: "key",
      header: "Key",
    },
    {
      accessorKey: "hwid",
      header: "Hwid",
      cell: ({ row }) => {
        const hwid = row.getValue("hwid") as string;
        return (
          <>
            {hwid && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    {hwid.slice(0, 7)}
                    {"..."}
                  </TooltipTrigger>
                  <TooltipContent>{hwid}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("type") as string;
        const key = KEY_TYPE_LIST.find((e) => e.value === type);
        return (
          <span style={{ color: chipColorByType(type) }}>{key?.name}</span>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <>
            <Badge
              variant={status == KEY_STATUS.ACTIVE ? "default" : "destructive"}
            >
              {status == KEY_STATUS.ACTIVE ? "Active" : "Inactive"}
            </Badge>
          </>
        );
      },
    },
    {
      accessorKey: "active_time",
      header: "Active time",
      cell: ({ row }) => {
        const active_time = row.getValue("active_time");
        return (
          <>
            {active_time && moment(active_time).format("YYYY-MM-DD HH:mm:ss")}
          </>
        );
      },
    },
    {
      accessorKey: "expired_time",
      header: "Expired time",
      cell: ({ row }) => {
        const expired_time = row.getValue("expired_time");
        return (
          <>
            {expired_time && moment(expired_time).format("YYYY-MM-DD HH:mm:ss")}
          </>
        );
      },
    },
    {
      accessorKey: "",
      header: "Action",
      cell: ({ row }) => {
        const key = row.original;

        return (
          <div key={key.key} className="items-center justify-center flex gap-4">
            <DeleteKeyButton id={key.key} onDelete={callback} />
            <UpdateButton item={key} onUpdate={callback} />
          </div>
        );
      },
    },
  ];
  return { columns };
};
