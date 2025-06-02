import { Routes } from "react-router-dom";
import "./App.css";
import Website from "./pages/Website";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Suspense } from "react";
import Layout from "./components/Layout/Layout";
import Properties from "./pages/properties/Properties";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Property from "./pages/Property/Property";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import { useState } from "react";
import userContext from "./context/userContext";

function App() {

  const queryClient = new QueryClient()

  const [userDetails, setUserDetails] = useState({
    favourites:[],
    bookings:[],
    token:null
  })

  return (
  <userContext.Provider value={{userDetails, setUserDetails}}>
    <QueryClientProvider client={queryClient}>
  <BrowserRouter>

      <Suspense fallback={<div>Loading...</div>}>
      <MantineProvider>

      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Website/>} />
          <Route path="/properties">
              <Route index element={<Properties/>}/>
              <Route path=":propertyId" element={<Property/>}/>
          </Route>
        </Route>
      </Routes>
    </MantineProvider>
      </Suspense>
    </BrowserRouter>
    <ToastContainer/>
    </QueryClientProvider>
    </userContext.Provider>
  );
}

export default App;
