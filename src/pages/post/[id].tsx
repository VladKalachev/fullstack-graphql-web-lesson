
import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { Layout } from "../../components/Layout";
import { Heading, Box } from "@chakra-ui/react";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";
import { usePostQuery } from "../../generated/graphql";
import { useRouter } from "next/router";
import { useGetIntId } from "../../utils/useGetIntId";
// import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
// import { withApollo } from "../../utils/withApollo";

const Post = ({}) => {
  const router = useRouter();
  const intId = useGetIntId();
  // const { data, error, loading } = useGetPostFromUrl();
  const [{ data, fetching, error }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId
    }
  })

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading mb={4}>{data.post.title}</Heading>
      <Box mb={4}>{data.post.text}</Box>
      {/* <EditDeletePostButtons
        id={data.post.id}
        creatorId={data.post.creator.id}
      /> */}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
