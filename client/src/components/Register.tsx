import React from "react";
import { Formik, Form, Field } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Text,
  Heading,
  Center,
  Link,
  Checkbox,
  AlertIcon,
  Alert,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { registerUser } from "../lib/api";

interface LoginFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreedToTerms: boolean | undefined | string;
}

const initialValues: LoginFormValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreedToTerms: false,
};

export function Register() {
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = async (values: LoginFormValues) => {
    console.log(values);
    try {
      const { token } = await registerUser(values);
      console.log(token);
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  const validateForm = (values: LoginFormValues) => {
    const errors: Partial<LoginFormValues> = {};
    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (values.email && !emailRegex.test(values.email)) {
      errors.email = "Please enter a valid email address";
    }
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (values.password && !passwordRegex.test(values.password)) {
      errors.password =
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number";
    }

    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!values.agreedToTerms) {
      errors.agreedToTerms = "You must agree to the Terms and Conditions";
    }
    return errors;
  };

  return (
    <Center minH="100vh">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={validateForm}
      >
        {(props) => (
          <Form>
            <Stack
              w="400px"
              spacing={5}
              p={10}
              border="1px"
              borderColor="gray.200"
              borderRadius="lg"
            >
              <Heading as="h3" size="md" textAlign="center">
                REGISTER
              </Heading>
              {errorMessage && (
                <Alert status="error">
                  <AlertIcon />
                  {errorMessage}
                </Alert>
              )}
              <Field name="username">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.username && form.touched.username}
                  >
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Input
                      {...field}
                      id="username"
                      placeholder="Enter username"
                    />
                    {form.errors.username && form.touched.username && (
                      <Text color="red">{form.errors.username}</Text>
                    )}
                  </FormControl>
                )}
              </Field>
              <Field name="email">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel htmlFor="email">Email address</FormLabel>
                    <Input {...field} id="email" placeholder="Enter email" />
                    {form.errors.email && form.touched.email && (
                      <Text color="red">{form.errors.email}</Text>
                    )}
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      {...field}
                      id="password"
                      placeholder="Enter password"
                      type="password"
                    />
                    {form.errors.password && form.touched.password && (
                      <Text color="red" textAlign="justify">
                        {form.errors.password}
                      </Text>
                    )}
                  </FormControl>
                )}
              </Field>
              <Field name="confirmPassword">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={
                      form.errors.confirmPassword &&
                      form.touched.confirmPassword
                    }
                  >
                    <FormLabel htmlFor="confirmPassword">
                      Confirm Password
                    </FormLabel>
                    <Input
                      {...field}
                      id="confirmPassword"
                      placeholder="Confirm password"
                      type="password"
                    />
                    {form.errors.confirmPassword &&
                      form.touched.confirmPassword && (
                        <Text color="red" textAlign="justify">
                          {form.errors.confirmPassword}
                        </Text>
                      )}
                  </FormControl>
                )}
              </Field>
              <Field name="agreedToTerms">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={
                      form.errors.agreedToTerms && form.touched.agreedToTerms
                    }
                  >
                    <Checkbox
                      {...field}
                      isChecked={form.values.agreedToTerms}
                      onChange={(e) => {
                        form.setFieldValue("agreedToTerms", e.target.checked);
                      }}
                    >
                      I agree to the Terms and Conditions
                    </Checkbox>
                    {form.errors.agreedToTerms &&
                      form.touched.agreedToTerms && (
                        <Text color="red" textAlign="justify">
                          {form.errors.agreedToTerms}
                        </Text>
                      )}
                  </FormControl>
                )}
              </Field>

              <Button
                colorScheme="blue"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Register
              </Button>
              <Text textAlign="center">
                Already a member?{" "}
                <Link as={RouterLink} to="/login" color="blue.500">
                  Login here.
                </Link>
              </Text>
            </Stack>
          </Form>
        )}
      </Formik>
    </Center>
  );
}
