import { IsString, IsNumber, IsDateString, IsNotEmpty} from 'class-validator'
import { string } from 'joi'

export interface PaymentDto {
  user_id : string,
	address : string,
	book_id : number,
	payment : string,
	price : number,
	amount : number,	
	date: string,
}

export class PaymentDto implements PaymentDto{
	@IsString()
	user_id: string

	@IsString()
	@IsNotEmpty()
	address: string

	@IsNumber()
	book_id: number

	@IsString()
	payment: string

	@IsNumber()
	price: number

	@IsNumber()
	amount: number

	@IsString()
	date: string
}

export class PaymentDtoIncludeId extends PaymentDto {
	@IsString()
	_id: string
}