import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = 3001
  await app.listen(3001)
  console.log(`👾\nApp listening on port:  http://localhost:${port}`)
}
bootstrap()
