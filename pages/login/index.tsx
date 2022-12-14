import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { Box, Button, Container, Typography } from "@mui/material";

export default function SignIn({ session }: any) {
  const router = useRouter();
  const [error, setError] = useState<String | null>(null);

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .max(30, "Must be 30 characters or less")
            .email("Invalid email address")
            .required("Please enter your email"),
          password: Yup.string().required("Please enter your password"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const res = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: `${"/"}`,
          });
          if (res?.error) {
            setError(JSON.parse(res?.error).error);
          } else {
            setError(null);
          }
          if (res?.url) router.push(res.url);
          setSubmitting(false);
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
                  <label
                    htmlFor="email"
                    className="uppercase text-sm text-gray-600 font-bold"
                  >
                    Email
                    <Field
                      name="email"
                      aria-label="enter your email"
                      aria-required="true"
                      type="text"
                      className="w-full bg-gray-300 text-gray-900 mt-2 p-3"
                    />
                  </label>

                  <div className="text-red-600 text-sm">
                    <ErrorMessage name="email" />
                  </div>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="uppercase text-sm text-gray-600 font-bold"
                  >
                    password
                    <Field
                      name="password"
                      aria-label="enter your password"
                      aria-required="true"
                      type="password"
                      className="w-full bg-gray-300 text-gray-900 mt-2 p-3"
                    />
                  </label>

                  <div className="text-red-600 text-sm">
                    <ErrorMessage name="password" />
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="bg-green-400 text-gray-100 p-3 rounded-lg w-full"
                  >
                    {formik.isSubmitting ? "Please wait..." : "Sign In"}
                  </button>
                </div>
                <Button onClick={() => router.push("/signup")}>
                  New User..Go to sign up
                </Button>
              </Box>
            </Container>
          </form>
        )}
      </Formik>
    </>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = await getSession(context);
  console.log("session", session);
  return {
    props: {
      session,
    },
  };
};
