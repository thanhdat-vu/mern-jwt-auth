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
import { Link as RouterLink, useParams } from "react-router-dom";
import { resetPassword } from "../lib/api";

interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

const initialValues: ResetPasswordFormValues = {
  password: "",
  confirmPassword: "",
};

export function ResetPassword() {
  const { token } = useParams();

  const [errorMessage, setErrorMessage] = useState("");
  const [resetSuccessful, setResetSuccessful] = useState(false);

  const handleSubmit = async (values: ResetPasswordFormValues) => {
    try {
      const { password } = values;
      if (token) {
        await resetPassword(token, password);
      }
      setResetSuccessful(true);
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  const validateForm = (values: ResetPasswordFormValues) => {
    const errors: Partial<ResetPasswordFormValues> = {};
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (values.password && !passwordRegex.test(values.password)) {
      errors.password =
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  if (resetSuccessful) {
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
              Password Reset!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              You have successfully reset your password. You may now log into
              your account.
            </AlertDescription>
          </Alert>
          <Link as={RouterLink} to="/login" color="blue.500">
            Back to login
          </Link>
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
                RESET PASSWORD
              </Heading>
              {errorMessage && (
                <Alert status="error">
                  <AlertIcon />
                  {errorMessage}
                </Alert>
              )}
              <Field name="password">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel htmlFor="password">New Password</FormLabel>
                    <Input
                      {...field}
                      id="password"
                      placeholder="Enter new password"
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
                      Confirm New Password
                    </FormLabel>
                    <Input
                      {...field}
                      id="confirmPassword"
                      placeholder="Confirm new password"
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
              <Button
                colorScheme="blue"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Reset Password
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Center>
  );
}
