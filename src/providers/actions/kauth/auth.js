/**
 * Create HTTP requests
 */
import { APIs } from '$lib/statics/apis';
import { ME_QUERY, SIGN_IN_MUTATION, SIGN_OUT_MUTATION } from '$providers/queries/kauth';
import { userStore } from '$providers/stores/kauth'
import { endpointFetch } from '../utils';

export const me = {
  load: async () => {
    const res = await endpointFetch({
      query: ME_QUERY,
    }, APIs.KAUTH);

    if (res?.success == true) {
      res['data'] = res['data']['me'];
      userStore.reset(res['data'])
      return res;
    }

    throw res;
  }
}

export const signIn = {
  load: async ({ email, password }) => {
    const res = await endpointFetch({
      mutation: SIGN_IN_MUTATION,
      variables: { email, password }
    }, APIs.KAUTH);

    if (res?.success == true) {
      res['data'] = res['data']['signIn']
      userStore.reset(res['data'])
      return res;
    }

    throw res;
  }
}

export const signOut = {
  load: async () => {
    const res = await endpointFetch({
      mutation: SIGN_OUT_MUTATION,
    }, APIs.KAUTH);

    if (res?.success == true) {
      res['data'] = res['data']['signOut']
      userStore.reset({})
      return res;
    }

    throw res;
  }
}


export const signUp = {
  load: async (fetch, { username, email, firstName, lastName }) => {
    // console.log("load...", username);
    // let email_1 = new String(username)

    // email = email_1 + "@kradass.com"
    // console.log(email)
    // console.log("email_1",email);
    // console.log("username_1",username);

    const res = await fetch('/dashboard/admin/register', {
      method: 'POST',
      headers: {
        accept: 'application/json'
      },

      body: JSON.stringify({ username, email, firstName, lastName })

    });
    let body = await res.json()

    // console.log("fdsff",body)


    // if (body && body.success) {
    //   body['data'] = body.data['user'];
    //   await userStore.reset(body['data'])
    // }

    // return body;

    // console.log("Body",res);
    // let body = await res.json()

    // if (body && body.success) {
    //   body['data'] = body.data['adminSignUp'];
    //   await adminsStore.reset(body['data'])
    // }

    return res;
  }
}
