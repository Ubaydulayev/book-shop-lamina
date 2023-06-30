import { Button } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import CModal from "components/modal";
import { useDelete } from "hooks";
import { get } from "lodash";
import React from "react";
import { toast } from "react-toastify";

type DeleteProps = {
  isOpen: boolean;
  handleCancel: () => void;
  data: { [key: string]: any };
};

const Delete = ({ isOpen, handleCancel, data }: DeleteProps) => {
  const { mutate } = useDelete();
  const queryClient = useQueryClient();
  return (
    <CModal isOpen={isOpen}>
      <div>
        <div className="font-medium text-center text-xl">
          Do you really want to delete?
        </div>
        <div className="flex mt-6 gap-4">
          <Button
            className="w-1/2"
            variant="contained"
            color="error"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            className="w-1/2"
            variant="contained"
            onClick={() =>
              mutate({
                url: `/books/${data.id}`,
                onSuccess: () => {
                  handleCancel();
                  queryClient.invalidateQueries();
                  toast.success("The book has been deleted.");
                },
                onError: (error) => {
                  toast.error(get(error, "response.data.message"));
                },
              })
            }
          >
            Confirm
          </Button>
        </div>
      </div>
    </CModal>
  );
};

export default Delete;
