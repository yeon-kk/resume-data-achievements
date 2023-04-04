import { ChakraProvider, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function Redirect() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [response, setResponse] = useState('');

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      setResponse(code);
    }
  }, []);

  return (
    <ChakraProvider>
      <Heading as="h2" size="lg" marginTop={4}>
        Access Token 발급
      </Heading>
      <br />
      <br />
      {response}
    </ChakraProvider>
  );
}
export default Redirect;
