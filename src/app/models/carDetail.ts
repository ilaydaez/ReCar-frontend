import { Brand } from "./brand";
import { Car } from "./car";
import { CarImage } from "./carImage";
import { Rental } from "./rental";

export interface CarDetail{
    carID: number;
    brandName: string;
    // modelName: string;
    colorName: string;
    modelYear: number;
    dailyPrice: number;
    description: string;
    // previewImagePath:string;
}