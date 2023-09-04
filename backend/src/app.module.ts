import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from './environments/environment';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(environment.mongoBaseUrl),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
