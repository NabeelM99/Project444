import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCb323BI8X8CTVSUXlo0IiGmjUGYgim9d0",
  authDomain: "itcs444-projectfinalhallresrev.firebaseapp.com",
  projectId: "itcs444-projectfinalhallresrev",
  storageBucket: "itcs444-projectfinalhallresrev.appspot.com",
  messagingSenderId: "128091415984",
  appId: "1:128091415984:web:93c4e0c9cb00c45dfe6275",
  measurementId: "G-7S21G3KCZY"
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
