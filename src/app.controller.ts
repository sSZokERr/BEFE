import {Body,Controller,Delete,Get,Param,Post,Redirect,Render,Session} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import TarhelyDataDto from './tarhelydata.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }

  @Get('/api/tarhely')
  async allTarhely() {
    const [tarhelycsomagok] = await db.execute(
      'SELECT * FROM tarhelycsomagok'
    );
    return { tarhelycsomagok: tarhelycsomagok};
  }

  @Post('/api/tarhely')
  async insertTarhely(@Body() tarhelydata: TarhelyDataDto) {
    await db.execute('INSERT INTO tarhelycsomagok (nev, meret, ar) VALUES (?, ?, ?)',[
      tarhelydata.nev, tarhelydata.meret, tarhelydata.ar,
    ]);
  }
  @Delete('/api/tarhely/:id')
  async deleteTarhelyApi(@Param('id') id: number) {
    await db.execute(
      'DELETE FROM tarhelycsomagok WHERE id = ?',
      [id],
    );
  }
}