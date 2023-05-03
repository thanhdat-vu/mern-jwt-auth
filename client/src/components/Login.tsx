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
  Checkbox,
  Center,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

export function Login() {
  const handleSubmit = (values: LoginFormValues) => {
    console.log(values);
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
                LOGIN
              </Heading>
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
              <Checkbox defaultChecked>Remember me</Checkbox>
              <Button
                colorScheme="blue"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Login
              </Button>
              <Text textAlign="center">
                Not a member?{" "}
                <Link as={RouterLink} to="/register" color="blue.500">
                  Register now
                </Link>
              </Text>
            </Stack>
          </Form>
        )}
      </Formik>
    </Center>
  );
}
