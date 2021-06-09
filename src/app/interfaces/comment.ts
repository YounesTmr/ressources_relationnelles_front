export interface Comment {
    id: number,
    commentBodyText: string,
    dateOfComment: string,
    member: {
      username: string,
      email: string,
      password: string,
      cpassword: null,
      birthDate: string,
      county: string,
      country: string,
      dateInscription: string,
      activatedAccount: true,
      status: string,
      friendships: [],
      interactions: []
    }
}
