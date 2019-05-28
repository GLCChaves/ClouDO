import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { ClouDO } from './app.component';
import { HomePage } from '../pages/home/home';
import { Todos } from '../providers/todos/todos';

@NgModule({
  declarations: [
    ClouDO,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(ClouDO)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ClouDO,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Todos
  ]
})
export class AppModule {}
