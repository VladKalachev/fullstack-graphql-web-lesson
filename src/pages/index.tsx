import { useState } from 'react';
import { Button, Stack } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePostsQuery } from '../generated/graphql';
import { Link, Box, Heading, Text, Flex } from '@chakra-ui/react';
import { Layout } from '../components/Layout';

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15, 
    cursor: null as null | string
  });
  const [{data, fetching}] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return <div>you got query failed for some reason</div>
  };

  return (
      <Layout>
        <NextLink href="/create-post">
          <Link>create post</Link>
        </NextLink>
        <br />
        {!data && fetching ? ( 
          <div>loading...</div> 
        ) : (
          <Stack spacing={8}>
            {data?.posts.posts.map((p) => (
              <Box key={p.id} p={5} shadow="md" borderWidth="1px">
                <Heading fontSize="xl">{p.title}</Heading> {p.creator.username}
                <Text mt={4}>{p.textSnippet}</Text>
              </Box>
            ))}
          </Stack>
        )}
        {data && data.posts.hasMore ? (
          <Flex>
           <Button onClick={() => {
             setVariables({
               limit: variables.limit,
               cursor: data.posts.posts[data.posts.posts.length - 1].createdAt
             })
           }} isLoading={fetching} m="auto" my={8}>load more</Button>
          </Flex>
        ) : null}
      </Layout>
  )
}
  

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
