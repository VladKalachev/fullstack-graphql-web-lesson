import { Stack } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePostsQuery } from '../generated/graphql';
import { Link, Box, Heading, Text } from '@chakra-ui/react';
import { Layout } from '../components/Layout';

const Index = () => {
  const [{data}] = usePostsQuery({
    variables: {
      limit: 10
    }
  });
  return (
      <Layout>
        <NextLink href="/create-post">
          <Link>create post</Link>
        </NextLink>
        <br />
        {!data ? ( 
          <div>loading...</div> 
        ) : (
          <Stack spacing={8}>
          {data?.posts.map((p) => (
            <Box key={p.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{p.title}</Heading>
              <Text mt={4}>{p.textSnippet}</Text>
            </Box>
          ))}
          </Stack>
        )}
      </Layout>
  )
}
  

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
