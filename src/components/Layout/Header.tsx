import {
  Text,
  Button,
  Container,
  Box,
  Flex,
  Grid,
  Image,
  HStack,
  Link as ChakraLink,
  useDisclosure,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useUser } from "hooks";
import headerLogo from "../../public/E-Petiții.svg";
import { LoginModal } from "components/Auth/LoginModal";
import { SearchModal } from "components/Search/SearchModal";

export const Header = () => {
  const { user, setUser } = useUser();
  // const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isSearchOpen, onOpen: onSearchOpen, onClose: onSearchClose } = useDisclosure();

  return (
    <>
      <Box w="full" borderBottomWidth="1px">
        <Container maxW={{ sm: "6xl", "2xl": "8xl" }} px={0}>
          <Grid templateColumns="repeat(16, 1fr)" gap={4} w="full">
            <Box
              gridColumn="span 16"
              sx={{ display: "center" }}
              width="auto"
              padding="6"
            >
              <Flex alignItems="center" gap={55}>
                <Link to="/">
                  <HStack role="group" spacing={4}>
                    <Image src={headerLogo} width="96px" height="27" mr="0.5rem" />
                  </HStack>
                </Link>
                  <ChakraLink href="https://utm.md/" fontSize="sm" display="flex" gap={55} alignItems="center">
                    Site-ul oficial al Universității Tehnice al Moldovei
                  </ChakraLink>
              </Flex>
              <Flex marginLeft="auto" alignItems="center" paddingRight="1rem">
                <Box 
                  as="button"
                  fontSize="12px"
                  backgroundColor="gray.200"
                  textColor="gray.500"
                  rounded="full"
                  px="15px"
                  py="5px"
                  marginRight="5px"
                  onClick={onSearchOpen}
                  display="flex"
                  alignItems="center"
                  gap="7px"
                >
                  <SearchIcon />
                  Find petition
                </Box>
                <Box width="1px" height="20px" backgroundColor="gray.200" marginX="0.5rem" />
                <Button
                  size="sm"
                  as="a"
                  href="#"
                  variant="link"
                  color="black"
                  fontSize="sm"
                  fontWeight="light"
                >
                  EN
                </Button>
                /
                <Button
                  size="sm"
                  as="a"
                  href="#"
                  variant="link"
                  color="black"
                  fontSize="sm"
                  fontWeight="light"
                >
                  RO
                </Button>
                <Box width="1px" height="20px" backgroundColor="gray.200" marginX="0.5rem" />
                {user ? (
                  <HStack spacing={2}>
                    <Link to="/profile">
                      <Text
                        fontSize="sm"
                        fontWeight="light"
                        _hover={{ textDecoration: "underline" }}
                      >
                        {user.email}
                      </Text>
                    </Link>
                    <Box width="1px" height="20px" backgroundColor="gray.200" marginX="0.5rem" />
                    <Button
                      size="sm"
                      variant="link"
                      color="black"
                      fontSize="sm"
                      fontWeight="light"
                      onClick={() => {
                        setUser(null);
                        localStorage.removeItem("user");
                      }}
                    >
                      Ieșire
                    </Button>
                  </HStack>
                ) : (
                  <Button onClick={onOpen} variant="link" color="black">
                    <Text fontSize="sm" fontWeight="light">
                      Autentificare
                    </Text>
                  </Button>
                )}
              </Flex>
            </Box>
          </Grid>

          <LoginModal isOpen={isOpen} onClose={onClose} />
          <SearchModal isSearchOpen={isSearchOpen} onSearchClose={onSearchClose} />

          {/* <Flex
            alignItems="center"
            w="full"
            paddingTop="0.5rem"
            justifyContent="space-between"
            paddingBottom="0.5rem"
            px={0}
          >
            <Link to="/">
              <HStack role="group" spacing={4}>
                <img src={heroLogo} alt="Site Logo" width="270px" />
              </HStack>
            </Link>

            <Flex alignItems="center" paddingRight="0rem">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(searchTerm);
                }}
              >
                <InputGroup size="lg" w="550px">
                  <Input
                    placeholder="Căutaţi petiţia"
                    rounded="full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <InputRightElement>
                    <IconButton
                      colorScheme="blue"
                      aria-label="Search database"
                      rounded="full"
                      icon={<SearchIcon />}
                    />
                  </InputRightElement>
                </InputGroup>
              </form>
            </Flex>
            <Button
              width="auto"
              gap={4}
              marginX="auto"
              rounded="full"
              fontWeight="bold"
              colorScheme="blue"
              size="lg"
              onClick={() => {
                user ? navigate("/petitions/create") : onOpen();
                // navigate("/petitions/create") ;
              }}
            >
              Creaţi o petiţie
              <FaPlus />
            </Button>
          </Flex> */}
        </Container>
      </Box>
    </>
  );
};
