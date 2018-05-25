export class BankModel {
    id?: number;
    name?: string;
    logo?: string;
}

export class BankAccountModel {
    id?: number;
    name?: string;
    account_no?: string;
    bank?: BankModel;
}