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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { forgotPassword } from "../lib/api";

interface ForgotPasswordFormValues {
  email: string;
}

const initialValues: ForgotPasswordFormValues = {
  email: "",
};

export function ForgotPassword() {
  const [errorMessage, setErrorMessage] = useState("");
  const [sentEmail, setSentEmail] = useState(false);

  const handleSubmit = async (values: ForgotPasswordFormValues) => {
    try {
      const { email } = values;
      await forgotPassword(email);
      setSentEmail(true);
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  const validateForm = (values: ForgotPasswordFormValues) => {
    const errors: Partial<ForgotPasswordFormValues> = {};
    if (!values.email) {
      errors.email = "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (values.email && !emailRegex.test(values.email)) {
      errors.email = "Please enter a valid email address";
    }
    return errors;
  };

  if (sentEmail) {
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
              Password Reset Email Sent!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              We have sent you an email with a link to reset your password.
              Check your inbox and follow the instructions in the email.
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
                FORGOT PASSWORD?
              </Heading>
              <Text>
                Enter your email address and we will send you a link to reset
                your password.
              </Text>
              {errorMessage && (
                <Alert status="error">
                  <AlertIcon />
                  {errorMessage}
                </Alert>
              )}
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
              <Button
                colorScheme="blue"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Reset Password
              </Button>
              <Link
                as={RouterLink}
                to="/login"
                color="blue.500"
                textAlign="center"
              >
                Back to login
              </Link>
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
