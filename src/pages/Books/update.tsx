import { Button } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import fields from "components/fields";
import CModal from "components/modal";
import { ErrorMessage, Field } from "formik";
import { get } from "lodash";
import Container from "modules";
import { toast } from "react-toastify";

type UpdateProps = {
  isOpen: boolean;
  handleCancel: () => void;
  data: { [key: string]: any };
};

const Update = ({ isOpen, handleCancel, data }: UpdateProps) => {
  const queryClient = useQueryClient();

  return (
    <CModal isOpen={isOpen} width={600}>
      <div className=" p-3">
        <Container.Form
          method="patch"
          url={`/books/${get(data, "id")}`}
          fields={[{ name: "status", value: get(data, "status") }]}
          onSuccess={(_, resetForm) => {
            resetForm();
            handleCancel();
            queryClient.invalidateQueries();
            toast.success("The book has been update.");
          }}
          onError={(error) => {
            toast.error(get(error, "response.data.message"));
          }}
        >
          {({ isLoading }) => {
            return (
              <div className="flex flex-col gap-4">
                <div className="font-medium"> Update book</div>
                <div>
                  <Field
                    label="Status"
                    name={"status"}
                    component={fields.Select}
                    options={[
                      { value: 0, label: "New" },
                      { value: 1, label: "Reading" },
                      { value: 2, label: "Finish" },
                    ]}
                  />
                  <ErrorMessage
                    name="status"
                    className="mt-2 text-red-500"
                    component={"div"}
                  />
                </div>
                <div className="flex gap-4 mt-5">
                  {" "}
                  <Button
                    className="w-1/2 !py-4"
                    variant="contained"
                    color="error"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={isLoading}
                    className="w-1/2 !py-4"
                    type="submit"
                    variant="contained"
                  >
                    Update
                  </Button>
                </div>
              </div>
            );
          }}
        </Container.Form>
      </div>
    </CModal>
  );
};

export default Update;
