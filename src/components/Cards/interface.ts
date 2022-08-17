export interface IData {
  contact_id?: number;
  user_info_id?: number;
  name: string;
  email: string;
  contacts: {
    main?: string;
    home?: string;
    office?: string;
  };
  image?: string;
  share?: number;
  isFavourite?: boolean;
  user_account_id?: number;
}
export interface ShowProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}
