import { useState } from 'react';
import { Button, Stack, IconButton, Link, Box, Heading, Text, Flex } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useDeletePostMutation, useMeQuery, usePostsQuery } from '../generated/graphql';
import { Layout } from '../components/Layout';
import { UpdootSection } from '../components/UpdootSection';

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15, 
    cursor: null as null | string
  });
  const [{data, fetching}] = usePostsQuery({
    variables,
  });

  const [{ data: meData }] = useMeQuery();
  const [, deletePost] = useDeletePostMutation();

  if (!fetching && !data) {
    return <div>you got query failed for some reason</div>
  };

  return (
      <Layout>
        <br />
        {!data && fetching ? ( 
          <div>loading...</div> 
        ) : (
          <Stack spacing={8}>
            {data?.posts.posts.map((p) => 
            !p ? null : (
              <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                <UpdootSection post={p}/>
                <Box flex={1}>
                  <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                    <Link>
                      <Heading fontSize="xl">{p.title}</Heading>
                    </Link>
                  </NextLink>
                  <Text>posted by {p.creator.username}</Text>
                  <Flex>
                    <Text flex={1} mt={4}>
                      {p.textSnippet}
                    </Text>
                    {meData?.me?.id !== p.creator.id ? null : (
                      <Box ml="auto">
                        <NextLink href="/post/edit/[id]" as={`/post/edit/${p.id}`}>
                          <IconButton
                            mr={4}
                            as={Link}
                            aria-label={"Edit post"} 
                            icon={<EditIcon />}
                            onClick={() => {}}
                            />
                        </NextLink>
                        <IconButton 
                          mr={'auto'} 
                          aria-label={"Delete post"} 
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          onClick={() => deletePost({ id: p.id })}
                          />
                      </Box>)
                    }
                  </Flex>
                </Box>
              </Flex>
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
