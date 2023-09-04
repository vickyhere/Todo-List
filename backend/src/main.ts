import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import * as session from "express-session"
import * as passport from "passport"
import { environment } from "./environments/environment"
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(
    session({
      secret: environment.secret,
      resave: false,
      saveUninitialized: false,
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())
  app.enableCors();

  await app.listen(3000)
}
bootstrap()