export const inputType = key => {
  switch (key) {
    case 'username':
      return 'text';
    case 'userSurname':
      return 'text';
    case 'password':
      return 'password';
    case 'email':
      return 'email';
    case 'phone':
      return 'tel';
    default:
      return 'text';
  }
};
