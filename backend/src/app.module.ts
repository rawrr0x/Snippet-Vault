import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { SnippetsModule } from './modules/snippets/snippets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(String(process.env.MONGO_CONNECT)),
    UsersModule,
    SnippetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
