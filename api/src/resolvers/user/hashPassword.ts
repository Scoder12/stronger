import * as argon2 from "argon2";

// https://security.stackexchange.com/a/261935/281321
const opts: argon2.Options = {
  type: argon2.argon2id,
  memoryCost: 4096, // 4 MiB/thread
  parallelism: 1,
  timeCost: 5,
  saltLength: 16,
  hashLength: 32,
};

export async function hashPassword(plain: string): Promise<string> {
  return argon2.hash(plain, { ...opts, raw: false });
}

export async function verifyPassword(
  hash: string,
  plain: string
): Promise<boolean> {
  return argon2.verify(hash, plain, opts);
}
