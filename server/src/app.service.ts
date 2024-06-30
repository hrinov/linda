import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserDto } from './dto';
@Injectable()
export class AppService {
  constructor(@InjectModel('users') private UsersModel: Model<User>) {}

  findUser = async (email: string): Promise<User> => {
    const query = {
      email,
    };
    const response: User = await this.UsersModel.findOne(query).lean();

    return response;
  };

  login = async (user: UserDto): Promise<{ access_token: string } | null> => {
    const { email, password } = user;
    const mongoUser = await this.findUser(email);

    if (!mongoUser) return null;

    const passwordsMatch = await bcrypt.compare(password, mongoUser.password);

    if (!passwordsMatch) return null;

    return { access_token: mongoUser.access_token };
  };

  createUser = async (user: User): Promise<{ access_token: string }> => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const access_token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET,
    );

    const data = {
      access_token,
      email: user.email,
      password: hashedPassword,
    };
    const userData = await this.UsersModel.create(data);
    return { access_token: userData.access_token };
  };

  checkToken = async (access_token): Promise<{ user: User } | null> => {
    let decodedToken;
    try {
      decodedToken = jwt.verify(access_token, process.env.JWT_SECRET) as {
        email: string;
      };
    } catch (e) {
      return null;
    }

    if (!decodedToken?.email) return null;

    const mongoUser: User = await this.findUser(decodedToken?.email);
    if (!mongoUser) return null;

    return { user: mongoUser };
  };
}
