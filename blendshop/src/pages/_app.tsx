// pages/_app.js
import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";
import '../styles/global.css'
const theme = extendTheme({
  colors: {
    brand: {
      100: "#F88C03",
    },
  },
})

function MyApp({ Component, pageProps } :any) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
