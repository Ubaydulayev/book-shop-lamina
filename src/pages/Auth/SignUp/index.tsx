import { Button } from "@mui/material";
import fields from "components/fields";
import { ErrorMessage, Field } from "formik";
import { get } from "lodash";
import Container from "modules";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { cookie } from "services";

const SignUp = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Container.Form
        url="/signup"
        fields={[
          { name: "email", required: true },
          { name: "name", required: true },
          { name: "key", required: true },
          { name: "secret", required: true },
        ]}
        method="post"
        onSuccess={({ data }) => {
          cookie.set("key", get(data, "key"));
          cookie.set("secret", get(data, "secret"));
          navigate("/books");
        }}
        onError={(error) => {
          console.log(error);

          toast.error(
            get(error, "response.data.message") ??
              "This user is already registered or an error occurred!"
          );
        }}
      >
        {({ isSubmitting, isLoading }) => {
          return (
            <div>
              <div className="flex flex-col gap-4">
                <div>
                  <Field
                    label="Email"
                    name={"email"}
                    type={"email"}
                    component={fields.Input}
                  />
                  <ErrorMessage
                    name="email"
                    className="mt-2 text-red-500"
                    component={"div"}
                  />
                </div>
                <div>
                  <Field
                    label="Name"
                    name={"name"}
                    type={"text"}
                    component={fields.Input}
                  />
                  <ErrorMessage
                    name="name"
                    className="mt-2 text-red-500"
                    component={"div"}
                  />
                </div>
                <div>
                  <Field
                    label="Key"
                    name={"key"}
                    type={"text"}
                    component={fields.Input}
                  />
                  <ErrorMessage
                    name="key"
                    className="mt-2 text-red-500"
                    component={"div"}
                  />
                </div>
                <div>
                  <Field
                    label="Password"
                    name={"secret"}
                    type={"password"}
                    component={fields.Input}
                  />
                  <ErrorMessage
                    name="secret"
                    className="mt-2 text-red-500"
                    component={"div"}
                  />
                </div>
              </div>
              <div className="mt-10">
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="w-full !py-4 text-center bg-blue-500"
                  variant="contained"
                >
                  Sign Up
                </Button>
                <div className="mt-4 text-center">
                  <Link
                    className="underline text-blue-500"
                    to={"/auth/sign-in"}
                  >
                    Have an account?
                  </Link>
                </div>
              </div>
            </div>
          );
        }}
      </Container.Form>
    </div>
  );
};

export default SignUp;
