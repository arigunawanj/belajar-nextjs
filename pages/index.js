import Layout from "@/layout";
import { ChakraProvider } from '@chakra-ui/react'

export default function Main({ children}) {
  return (
    <ChakraProvider>
    <div>
      <Layout>
      <p>Home</p>
      </Layout>
    </div>
    </ChakraProvider>
  );
}