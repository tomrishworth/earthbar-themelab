import axios from 'axios';

export async function request({ query, variables, preview }) {
  const endpoint = preview ? `https://graphql.datocms.com/preview` : `https://graphql.datocms.com/`;

  const { data } = await axios.post(
    endpoint,
    {
      query,
      variables,
    },
    {
      headers: {
        Authorization: `Bearer 9c79b1bb79367c103ad8d7883bfd4f`,
      },
    }
  );

  if (data.errors) {
    throw JSON.stringify(data.errors);
  }

  return data.data;
}
