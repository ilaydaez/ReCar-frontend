export interface Payment{
    paymentID?:number;
    cardNameSurname:string;
    cardNumber:string;
    cardExpiryDate:string;
    cardCvv:string;
    amountPaye:number;
}