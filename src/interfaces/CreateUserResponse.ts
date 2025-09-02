export type FirebaseErrorDetail = {
  message: string;
  domain: string;
  reason: string;
};

export type FirebaseError = {
  code: number;
  message: string;
  errors: FirebaseErrorDetail[];
};

export default interface CreateUserResponse {
  [props: string]: string | FirebaseError | undefined | boolean,
  email: string;
  expiresIn: string;
  idToken: string;
  kind: string;
  localId: string;
  refreshToken: string;
  error?: FirebaseError;
  displayName?: string;
  registered?:boolean
}