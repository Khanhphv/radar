import { ButtonLoading } from "@/components/ui/button";
import { useState } from "react";

const DeleteKeyButton = (props: {
  id: string;
  onDelete?: () => Promise<any>;
}) => {
  const [loading, setLoading] = useState(false);
  const { id } = props;
  const onDelete = async () => {
    try {
      setLoading(true);
      await fetch(`/api/key/delete/${id}`, {
        method: "PUT",
        cache: "no-cache",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      props?.onDelete?.();
    }
  };
  return (
    <ButtonLoading
      variant="destructive"
      loading={loading}
      onClick={() => onDelete()}
    >
      Delete
    </ButtonLoading>
  );
};

export default DeleteKeyButton;
