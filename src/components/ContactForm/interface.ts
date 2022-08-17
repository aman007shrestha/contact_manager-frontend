export interface IFormData {
  contact_id?: number;
  name: string;
  email: string;
  contacts: {
    main: string;
    home?: string;
    office?: string;
  };
  image: string;
}
export interface ISerializedFormData {
  contact_id?: number;
  name: string;
  email: string;
  main: string;
  home?: string;
  office?: string;
  image: string;
}
