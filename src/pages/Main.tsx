import { Button, Input, Flex, ChakraProvider, Heading, Text, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import styles from './Main.module.css';

interface InfoType {
  clientId: string;
  redirectURI: string;
  clientSecret: string;
  code: string;
  blogName: string;
}

const CLIENT_ID = 'clientId';
const REDIRECT_URI = 'redirectURI';
const CLIENT_SECRET = 'clientSecret';

function Main() {
  const [info, setInfo] = useState<InfoType>({
    clientId: '',
    redirectURI: '',
    clientSecret: '',
    code: '',
    blogName: '',
  });

  const [response, setResponse] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    const valueReplace = value.replace(/(\s*)/g, '');
    setInfo({ ...info, [name]: valueReplace });
  };

  const handleCreateCodeButton = () => {
    const response = `https://www.tistory.com/oauth/authorize?client_id=${info.clientId}&redirect_uri=${info.redirectURI}&response_type=code`;
    setResponse(response);
  };

  useEffect(() => {
    setInfo({
      clientId: '',
      redirectURI: '',
      clientSecret: '',
      code: '',
      blogName: '',
    });
    setResponse('');
  }, []);
  return (
    <ChakraProvider>
      <Flex minWidth="max-content" flexDirection="column" alignItems="center" gap="2">
        <Heading as="h2" size="lg" marginTop={4}>
          1. 인증 요청 및 Authentication code 발급
        </Heading>
        <Flex flexDirection="column" width={'500px'}>
          <Box w="100%" p={2}>
            <Text mb="8px">client-id</Text>
            <Input placeholder="client-id" name={CLIENT_ID} onChange={handleInput} />
          </Box>
          <Box w="100%" p={2}>
            <Text mb="8px">redirect_uri(CallBack)</Text>
            <Input placeholder="https://" name={REDIRECT_URI} onChange={handleInput} />
          </Box>
          <Box w="100%" p={2}>
            <Text mb="8px">client_secret</Text>
            <Input placeholder="client_secret" name={CLIENT_SECRET} onChange={handleInput} />
          </Box>
          <Button
            colorScheme="yellow"
            onClick={handleCreateCodeButton}
            p={4}
            m={4}
            borderRadius={100}
          >
            Authentication code URL 생성하기
          </Button>
          {response && (
            <div>
              <Box p={4} w="100%" marginTop={2}>
                <Text fontSize="md">1. 다음 링크를 클릭한 뒤, [허가하기] 버튼을 클릭합니다.</Text>
                <Text fontSize="md">2. 화면의 code를 복사합니다.</Text>
                <Text fontSize="md">3. 복사한 code를 아래의 입력란에 붙여넣기 합니다.</Text>
              </Box>
              <Box w="100%" p={4}>
                <a className={styles.link} target="_blank" href={response} rel="noreferrer">
                  {response}
                </a>
              </Box>
            </div>
          )}
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
export default Main;
