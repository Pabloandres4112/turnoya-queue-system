import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {ConfigModule, ConfigService} from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET') || 'change_me',
        signOptions: {expiresIn: config.get<string>('JWT_EXPIRES_IN') || '1d'},
      }),
    }),
  ],
  providers: [],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
