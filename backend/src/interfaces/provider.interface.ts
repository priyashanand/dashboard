export interface ILocation {
  street: string;
  state?: string;
  zipCode?: string;
}

export interface IProvider {
  name: string;
  email: string;
  phone: string;
  speciality?: string;
  address?: ILocation[];
}
