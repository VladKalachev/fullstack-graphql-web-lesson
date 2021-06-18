import { NavBar } from '../components/NavBar';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePostsQuery } from '../generated/graphql';
import { Link } from '@chakra-ui/react';
import { Layout } from '../components/Layout';

const Index = () => {
  const [{data}] = usePostsQuery()
  return (
      <Layout>
        <NextLink href="/create-post">
          <Link>create post</Link>
        </NextLink>
        <br />
        {!data ? ( 
          <div>loading...</div> 
        ) : (
          data?.posts.map((p) => <div key={p.id}>{p.title}</div>)
        )}
      </Layout>
  )
}
  

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
