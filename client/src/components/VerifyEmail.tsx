import { useEffect } from "react";
import {
  Center,
  Stack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { verifyEmail } from "../lib/api";

export function VerifyEmail() {
  const { token } = useParams();

  useEffect(() => {
    if (!token) return;
    verifyEmail(token);
  }, [token]);

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
            Account Activated!
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            You have successfully verified your email address. You may now log
            into your account.
          </AlertDescription>
        </Alert>
        <Link as={RouterLink} to="/login" color="blue.500">
          Back to login
        </Link>
      </Stack>
    </Center>
  );
}
