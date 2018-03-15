export class ProvinceModel {
    id?: number;
    name?: string;
}

export class DistrictModel {
    id?: number;
    name?: string;
}

export class AddressModel {
    id?: number;
    name?: string;
    address?: string;
    postcode?: string;
    province?: ProvinceModel;
    district?: DistrictModel;
    telephone?: string;
    default?: boolean;
}