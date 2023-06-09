import { useState } from "react";
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
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { registerUser } from "../lib/api";

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreedToTerms: boolean | undefined | string;
}

const initialValues: RegisterFormValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreedToTerms: false,
};

export function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const [accountCreated, setAccountCreated] = useState(false);

  const handleSubmit = async (values: RegisterFormValues) => {
    console.log(values);
    try {
      await registerUser(values);
      setAccountCreated(true);
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  const validateForm = (values: RegisterFormValues) => {
    const errors: Partial<RegisterFormValues> = {};
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

  if (accountCreated) {
    return (
      <Center minH="100vh">
        <Stack
          w="400px"
          spacing={5}
          p={10}
          border="1px"
          borderColor="gray.200"
          borderRadius="lg"
          textAlign="center"
        >
          <Alert
            status="success"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="200px"
            bg="white"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Account Created!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              You have successfully created your account. Please check your
              email to verify your account.
            </AlertDescription>
          </Alert>
        </Stack>
      </Center>
    );
  }

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
