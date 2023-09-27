// pages/_app.js
import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";
import '../styles/global.css'
import { AuthProvider } from "@/auth/authContext";
const theme = extendTheme({
  colors: {
    brand: {
      100: "#3B82F6",
      200: "#1D4ED8"
    },
  },
})

function MyApp({ Component, pageProps } :any) {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <CSSReset />
          <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
