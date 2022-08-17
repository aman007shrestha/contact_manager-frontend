export interface IContact {
  contact_id?: number;
  name: string;
  email: string;
  contacts: {
    main?: string;
    home?: string;
    office?: string;
  };
  image?: string;
  user_account_id?: number;
  isFavourite?: boolean;
}

export interface IFavourite {
  contact_id: number;
}
