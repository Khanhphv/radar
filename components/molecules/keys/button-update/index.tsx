import { KEY_STATUS } from "@/app/config/constant";
import { IKey } from "@/app/views/key-list/fetchData";
import { ButtonLoading } from "@/components/ui/button";
import { useState } from "react";

const UpdateButton = (props: { item: IKey; onUpdate?: () => Promise<any> }) => {
  const [loading, setLoading] = useState(false);
  const { item } = props;
  const { key: id, status } = item;
  const onUpdate = async () => {
    try {
      setLoading(true);
      await fetch(`/api/key/update/${id}`, {
        method: "PUT",
        cache: "no-cache",
        body: JSON.stringify({
          ...item,
          status:
            status === KEY_STATUS.ACTIVE
              ? KEY_STATUS.INACTIVE
              : KEY_STATUS.ACTIVE,
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      props?.onUpdate?.();
    }
  };
  return (
    <ButtonLoading
      style={{
        width: 100,
      }}
      variant="green"
      loading={loading}
      onClick={() => onUpdate()}
    >
      {status === KEY_STATUS.ACTIVE ? "DEACTIVE" : "ACTIVE"}
    </ButtonLoading>
  );
};

export default UpdateButton;
