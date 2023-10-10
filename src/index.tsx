import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider, baseTheme, extendTheme } from "@chakra-ui/react";

import { UserProvider } from "context";
import { App, CreatePetition, Developers, Mpass, Msign, Petition } from "pages";

import "@fontsource/libre-baskerville";
import "@fontsource/inter";
import "./styles/index.css";
import { ScrollToTop } from "components";

const theme = extendTheme({
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
    serif: `'Libre Baskerville', serif`,
  },
  colors: {
    primary: baseTheme.colors.blue,
  },
  withDefaultColorScheme: {
    colorScheme: "primary",
  },
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <ScrollToTop>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/petitions/:petitionId" element={<Petition />} />
                <Route path="/petitions/create" element={<CreatePetition />} />
                <Route path="/msign" element={<Msign />} />
                <Route path="/mpass" element={<Mpass />} />
                <Route path="/developers" element={<Developers />} />
              </Routes>
            </ScrollToTop>
          </BrowserRouter>
        </UserProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
