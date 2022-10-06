import { useState } from "react";
import { signIn } from "next-auth/react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { Box, Button, Container, Typography } from "@mui/material";

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState<String | null>(null);

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "", name: "", username: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .max(30, "Must be 30 characters or less")
            .email("Invalid email address")
            .required("Please enter your email"),
          password: Yup.string().required("Please enter your password"),
          name: Yup.string().required("Please enter your name"),
          username: Yup.string().required("Please enter your username"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
          const res = "Sign in Api CALL";
          router.push("/login");
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <Container>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                <Typography>{error}</Typography>
                <div className="mb-4">
                  <label htmlFor="username">
                    Username
                    <Field
                      name="username"
                      aria-label="enter your user name"
                      aria-required="true"
                      type="text"
                    />
                  </label>
                  <div>
                    <ErrorMessage name="username" />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="name">
                    Name
                    <Field
                      name="name"
                      aria-label="enter your name"
                      aria-required="true"
                      type="text"
                    />
                  </label>
                  <div>
                    <ErrorMessage name="name" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email">
                    Email
                    <Field
                      name="email"
                      aria-label="enter your email"
                      aria-required="true"
                      type="text"
                    />
                  </label>

                  <div>
                    <ErrorMessage name="email" />
                  </div>
                </div>
                <div>
                  <label htmlFor="password">
                    password
                    <Field
                      name="password"
                      aria-label="enter your password"
                      aria-required="true"
                      type="password"
                    />
                  </label>

                  <div>
                    <ErrorMessage name="password" />
                  </div>
                </div>
                <div>
                  <button type="submit">
                    {formik.isSubmitting ? "Please wait..." : "Sign Up"}
                  </button>
                </div>
              </Box>
            </Container>
          </form>
        )}
      </Formik>
    </>
  );
}
