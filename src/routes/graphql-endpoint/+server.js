import { getCookie } from '$lib/utils/cookie.js';
import { api } from '$providers/_api.js'
import { json } from '@sveltejs/kit';

export const POST = async ({ request, cookies }) => {
  const params = await request.json()
  const res = await api({
    query: params?.query,
    mutation: params?.mutation,
    variables: params?.variables || {}
  }, params.URLs, request, params?.accessToken || cookies.get('access_token'));

  // Set access token to svelte cookie
  const cookie = res?.headers?.['set-cookie'];
  const token = getCookie(cookie, 'access_token');
  if (cookie && token) {
    cookies.set("access_token", token, { secure: false, path: '/' })
  }

  if (cookie && params?.accessToken) {
    cookies.set("access_token", params?.accessToken, { secure: false, path: '/' });
  }

  return json(res)
};