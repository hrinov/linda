import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserDto } from './dto';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  async login(@Body() userDto: UserDto): Promise<{ access_token: string }> {
    const { email, password } = userDto;
    if (!email || !password)
      throw new BadRequestException('Invalid email or password');

    const response = await this.appService.login(userDto);

    if (!response?.access_token)
      throw new BadRequestException('Invalid email or password');

    return { access_token: response.access_token };
  }

  @Post('signup')
  async createUser(
    @Body() userDto: UserDto,
  ): Promise<{ access_token: string }> {
    const { email, password } = userDto;
    if (!email || !password) {
      throw new BadRequestException('Invalid email or password');
    }

    if (password.length < 6) {
      throw new BadRequestException('Invalid password');
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      throw new BadRequestException('Invalid email address');
    }

    const user = await this.appService.findUser(email);

    if (user) throw new BadRequestException('User already exists');

    const { access_token } = await this.appService.createUser(userDto);

    return { access_token };
  }

  @Get('me')
  async findUser(
    @Headers('authorization') authorizationHeader: string,
  ): Promise<{ user: User }> {
    if (!authorizationHeader)
      throw new BadRequestException('Token is required');

    const user = await this.appService.checkToken(
      authorizationHeader.replace('Bearer ', ''),
    );

    if (!user) {
      throw new BadRequestException('Wrong token');
    }

    return user;
  }
}
