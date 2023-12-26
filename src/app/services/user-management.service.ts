import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {
  CollectionReference,
  DocumentReference,
  addDoc,
  collection,
} from 'firebase/firestore';

import { Observable } from 'rxjs';

// this interface need to be update it after create request interface
export interface Guest {
  username: string;
  password: string;
  approve_request: string[];
  reject_request: string[];
  pending_requests: string[];
  profile_image: string;
  attendance: string[];
  user_type: string;
}

export interface Client {
  username: string;
  password: string;
  approve_request: string[];
  reject_request: string[];
  pending_requests: string[];
  profile_image: string;
  events: string[];
  event_requests: string[];
  message_replay: string[];
  user_type: string;
}

export interface Admin {
  username: string;
  password: string;
  profile_image: string;
  user_type: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  usersReferance: CollectionReference = collection(this.firestore, 'users');

  clients$!: Observable<Client[]>;
  guests$!: Observable<Guest[]>;
  admins$!: Observable<Admin[]>;

  constructor(public firestore: Firestore) {}

  // register geust
  // register client
  // login guest
  // login admin
  // login client
  // get guest
  // get client
  // update guest
  // update client
  // update admin
  // getAll guests
  // getAll clients

  registerGuest(
    username: string,
    password: string
  ): Promise<DocumentReference> {
    const guest: Guest = {
      username: username,
      password: password,
      approve_request: [],
      reject_request: [],
      pending_requests: [],
      profile_image: '../asserst/images/user.png',
      attendance: [],
      user_type: 'Guest',
    };
    return addDoc(this.usersReferance, guest);
  }

  registerClient(
    username: string,
    password: string
  ): Promise<DocumentReference> {
    const client: Client = {
      username: username,
      password: password,
      approve_request: [],
      reject_request: [],
      pending_requests: [],
      profile_image: '../asserst/images/user.png',
      events: [],
      event_requests: [],
      message_replay: [],
      user_type: 'Client',
    };
    return addDoc(this.usersReferance, client);
  }

  loginClient(username: string, password: string): Promise<DocumentReference> {}
}
