import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  QuerySnapshot,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

import { Observable } from 'rxjs';

// this interface need to be update it after create request interface
export interface Guest {
  id: string;
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
  id: string;
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
  id: string;
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

  users$!: Observable<[Guest, Client, Admin]>;
  clients$!: Observable<Client[]>;
  guests$!: Observable<Guest[]>;
  admins$!: Observable<Admin[]>;

  constructor(public firestore: Firestore) {
    this.getAdmins();
    this.getGuests();
    this.getClients();
  }

  getAdmins() {
    const queryAdmin = query(
      this.usersReferance,
      where('user_type', '==', 'admin')
    );
    this.admins$ = collectionData(queryAdmin, { idField: 'id' }) as Observable<
      Admin[]
    >;
  }

  getClients() {
    const queyrClient = query(
      this.usersReferance,
      where('user_type', '==', 'client')
    );
    this.clients$ = collectionData(queyrClient, {
      idField: 'id',
    }) as Observable<Client[]>;
  }

  getGuests() {
    const queryGuest = query(
      this.usersReferance,
      where('user_type', '==', 'guest')
    );
    this.guests$ = collectionData(queryGuest, { idField: 'id' }) as Observable<
      Guest[]
    >;
  }

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
      id: '',
      username: username,
      password: password,
      approve_request: [],
      reject_request: [],
      pending_requests: [],
      profile_image: '../asserst/images/user.png',
      attendance: [],
      user_type: 'guest',
    };
    return addDoc(this.usersReferance, guest);
  }

  registerClient(
    username: string,
    password: string
  ): Promise<DocumentReference> {
    const client: Client = {
      id: '',
      username: username,
      password: password,
      approve_request: [],
      reject_request: [],
      pending_requests: [],
      profile_image: '../asserst/images/user.png',
      events: [],
      event_requests: [],
      message_replay: [],
      user_type: 'client',
    };
    return addDoc(this.usersReferance, client);
  }

  loginGuest(
    username: string,
    password: string
  ): Promise<QuerySnapshot<DocumentData, DocumentData>> {
    {
      const queryGuest = query(
        this.usersReferance,
        where('user_type', '==', 'guest'),
        where('username', '==', username),
        where('password', '==', password)
      );
      return getDocs(queryGuest);
    }
  }

  loginClient(
    username: string,
    password: string
  ): Promise<QuerySnapshot<DocumentData, DocumentData>> {
    {
      const queryClient = query(
        this.usersReferance,
        where('user_type', '==', 'client'),
        where('username', '==', username),
        where('password', '==', password)
      );
      return getDocs(queryClient);
    }
  }
}
