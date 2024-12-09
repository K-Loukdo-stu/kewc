import { me } from "$providers/actions/kauth/auth";

export const ensureSigned = async () => {
  try {
    await me.load();
    return true;
  } catch (err) {
    if (err?.code == 'UNAUTHENTICATED') {
      throw err;
    }
  }
}