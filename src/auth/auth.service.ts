import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { phone: dto.phone },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const verified = await verify(user.password, dto.password);
    if (!verified) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.fullName };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }
}
