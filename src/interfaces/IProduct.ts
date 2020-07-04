import { IDescriptionDto } from "./IDescription";
import { IColorDto } from "./IColor";
import { IImageDto } from "./IImage";


export interface IProductDto {
  id: number
  name: String
  price: number
  language: string
  category: string
  infoParagragh: string
  description: IDescriptionDto
  images: IImageDto[]
  colors: IColorDto[]
}