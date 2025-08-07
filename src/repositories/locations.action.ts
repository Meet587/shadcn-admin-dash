import { axiosBase } from '../helpers/fetchApi';

export interface ILocation {
  id: number;
  name: string;
  pincode: string;
  state: string;
  country: string;
  created_at: string;
  updated_at: string;
}

export interface IAddLocationReq {
  name: string;
  pincode: string;
  state: string;
  country: string;
}

export class LocationRepository {
  static fetchLocations = async (): Promise<ILocation[]> => {
    const response = await axiosBase.get('/city');
    return response.data;
  };

  static addNewLocation = async (data: IAddLocationReq): Promise<ILocation> => {
    const response = await axiosBase.post('/city', data);
    return response.data;
  };
}
