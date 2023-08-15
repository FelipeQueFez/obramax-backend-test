import { ApiProperty } from '@nestjs/swagger';

export class Cat {
  @ApiProperty({example: '123456'})
  id: string;

  /**
   * The name of the Cat
   * @example Kitty
   */
  name: string;

  @ApiProperty({ example: 1, description: 'The age of the Cat' })
  age: number;

  @ApiProperty({
    example: 'Maine Coon',
    description: 'The breed of the Cat',
  })
  breed: string;

  public static fromJson(value: any): Cat {
    return JSON.parse(JSON.stringify(value));
  }
}
