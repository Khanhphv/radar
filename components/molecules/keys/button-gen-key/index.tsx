import { KEY_TYPE, KEY_TYPE_LIST } from "@/app/config/constant";
import { ButtonLoading, Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IKey } from "@/app/views/key-list/fetchData";
import { chipColorByType } from "@/lib/utils";

const ButtonGenKey = (props: { onGen?: () => Promise<any> }) => {
  const [loading, setLoading] = useState(false);
  const [newKeys, setNewKeys] = useState<IKey[]>([]);
  const onGenerate = async ({ type }: { type: string }) => {
    try {
      setLoading(true);
      const data = await fetch("/api/key/create", {
        method: "POST",
        cache: "no-cache",
        body: JSON.stringify({
          type,
        }),
      });
      setNewKeys([...newKeys, await data.json()]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      props?.onGen?.();
    }
  };
  return (
    <div className="my-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Generate key</Button>
        </PopoverTrigger>
        <PopoverContent align="center" side="right" style={{ width: "150px" }}>
          {KEY_TYPE_LIST.map((e, index) => {
            return (
              <>
                <ButtonLoading
                  key={index}
                  className="w-full"
                  loading={loading}
                  variant="default"
                  onClick={() =>
                    onGenerate({
                      type: e.value,
                    })
                  }
                >
                  {e.name}
                </ButtonLoading>
                <br />
                <br />
              </>
            );
          })}
        </PopoverContent>
      </Popover>

      <div className="my-2 p-5 border-2">
        {newKeys.map((key) => {
          return (
            <div key={key.key}>
              <div className="py-2">Key: {key?.key}</div>
              <div className="py-2">
                Type:{" "}
                <span style={{ color: chipColorByType(key.type) }}>
                  {KEY_TYPE_LIST.find((e) => e.value === key?.type)?.name}
                </span>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ButtonGenKey;
