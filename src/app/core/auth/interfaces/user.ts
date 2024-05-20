export interface User {
  id: string;
  email: string;
  user_metadata: {
    name: string;
  };
  is_anonymous: Boolean;
}
