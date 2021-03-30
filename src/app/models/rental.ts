export interface Rental{
    rentalID?:number;
    carID:number;
    customerID:number;
    paymentID?:number;
    rentDate:Date;
    returnDate:Date;
}