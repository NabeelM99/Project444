import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
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

export interface request {
  id: string;
  clientID: string;
  end_date: string;
  start_date: string;
  hallName: string;
  hallID: string;
  status: string;
  user_type: string;
  clientName: string;
  time: string;
  start_time: string;
  end_time: string;
}

export interface guestRequest {
  id: string;
  eventID: string;
  guestID: string;
  username: string;
  status: string;
  user_type: string;
  message: string;
  eventName: string;
}

export interface Hall {
  id?: string;
  name: string;
  capacity: string;
  price: number;
  description: string;
  location: string;
  image: string;
  available: boolean;
  email: string;
  noOfBoth: string;
  phone: string;
  resrvation_history: string[];
  size: string;
  hall_number: string;
}

export interface reservation {
  id?: string;
  clientID: string;
  start_date: string;
  end_date: string;
  eventID: string;
  hallID: string;
  start_time: string;
  end_time: string;
  total: number;
  clientName: string;
  eventName: string;
}

export interface event {
  id?: string;
  name: string;
  agenda: string;
  attendance: string[];
  description: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  speakers: string[];
  reservationID: string;
  floor_plan: string;
  eventOrder: string[];
  requests: string[];
  hallName: string;
}
export interface ClietnMessage {
  id: string;
  clientID: string;
  clientName: string;
  message: string;
  headline: string;
  reply: boolean;
}

export interface adminReply {
  id?: string;
  clientID: string;
  message_headline: string;
  replay_message: string;
  messageID: string;
}
@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  usersReferance: CollectionReference = collection(this.firestore, 'users');
  halls$!: Observable<Hall[]>;
  clientPending$!: Observable<request[]>;
  users$!: Observable<[Guest, Client, Admin]>;
  clients$!: Observable<Client[]>;
  guests$!: Observable<Guest[]>;
  admins$!: Observable<Admin[]>;
  events$!: Observable<event[]>;
  clientMessages$!: Observable<ClietnMessage[]>;

  clientHallReservations$!: Observable<reservation[]>;

  userID: string = '';
  userType: string = '';

  constructor(public firestore: Firestore) {
    this.getAdmins();
    this.getGuests();
    this.getClients();
    this.getClientsRequestsPending();
    this.getHalls();
    this.getEvents();
    this.getClientMessages();
  }

  getReservationByDatesAndHallID(
    start_date: string,
    end_date: string,
    hallID: string,
    clientID: string
  ): Promise<QuerySnapshot<DocumentData, DocumentData>> {
    const q = query(
      collection(this.firestore, 'hall_reservation'),
      where('start_date', '==', start_date),
      where('end_date', '==', end_date),
      where('hallID', '==', hallID),
      where('clientID', '==', clientID)
    );

    return getDocs(q);
  }

  updateEventByID(id: string, event: any) {
    const docRef = doc(this.firestore, 'events', id);
    return updateDoc(docRef, event);
  }
  updateRequestStatusByID(id: string, status: string) {
    const docRef = doc(this.firestore, 'request', id);
    return updateDoc(docRef, { status: status });
  }

  getHallByID(id: string) {
    const docRef = doc(this.firestore, 'Hall', id);
    return getDoc(docRef);
  }
  getClientReservatoinByClientID(id: string) {
    const q = query(
      collection(this.firestore, 'hall_reservation'),
      where('clientID', '==', id)
    );
    this.clientHallReservations$ = collectionData(q, {
      idField: 'id',
    }) as Observable<reservation[]>;
  }

  async getUserIDAndType(id: any) {
    const docRef = await getDoc(doc(this.firestore, 'users', id));
    if (docRef.exists()) {
      this.userID = docRef.id;
      this.userType = docRef.data()['user_type'];
      console.log('User Type:', this.userType);
    }
  }

  getGuestByID(id: string) {
    const docRef = doc(this.firestore, 'users', id);
    return getDoc(docRef);
  }

  getClientMessageByID(id: string) {
    const docRef = doc(this.firestore, 'client_message', id);
    return getDoc(docRef);
  }

  addReplyMessage(replayMessage: adminReply): Promise<DocumentReference> {
    return addDoc(
      collection(this.firestore, 'reply_message_admin'),
      replayMessage
    );
  }

  getClientMessages() {
    const q = query(
      collection(this.firestore, 'client_message'),
      where('reply', '==', false)
    );
    this.clientMessages$ = collectionData(q, { idField: 'id' }) as Observable<
      ClietnMessage[]
    >;
  }

  getEventByID(id: string) {
    const docRef = doc(this.firestore, 'events', id);
    return getDoc(docRef);
  }
  getEvents() {
    const q = query(collection(this.firestore, 'events'));
    this.events$ = collectionData(q, { idField: 'id' }) as Observable<event[]>;
  }

  getReservationByID(id: string) {
    const docRef = doc(this.firestore, 'hall_reservation', id);
    return getDoc(docRef);
  }

  getHallHistory(id: string) {
    const docRef = doc(this.firestore, 'Hall', id);
    return getDoc(docRef);
  }
  updateHall(id: string, data: any) {
    const docRef = doc(this.firestore, 'Hall', id);
    return updateDoc(docRef, data);
  }

  deleteHall(id: string) {
    const docRef = doc(this.firestore, 'Hall', id);
    return deleteDoc(docRef);
  }
  getHalls() {
    const q = query(collection(this.firestore, 'Hall'));
    this.halls$ = collectionData(q, { idField: 'id' }) as Observable<Hall[]>;
  }

  getHall(id: string) {
    const docRef = doc(this.firestore, 'Hall', id);
    return getDoc(docRef);
  }

  createHall(hall: Hall): Promise<DocumentReference> {
    return addDoc(collection(this.firestore, 'Hall'), hall);
  }

  getClientsRequestsPending() {
    const q = query(
      collection(this.firestore, 'request'),
      where('status', '==', 'pending'),
      where('user_type', '==', 'client')
    );

    try {
      this.clientPending$ = collectionData(q, {
        idField: 'id',
      }) as Observable<request[]>;
    } catch (error) {
      console.error('Error fetching pending requests:', error);
      // Handle the error as appropriate for your application
    }
  }

  updateRequest(id: string, data: any) {
    const requestDoc = doc(this.firestore, 'request', id);
    return updateDoc(requestDoc, data);
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

  addResrvation(reservation: reservation): Promise<DocumentReference> {
    return addDoc(collection(this.firestore, 'hall_reservation'), reservation);
  }
  getRequestByID(id: string) {
    const docRef = doc(this.firestore, 'request', id);
    return getDoc(docRef);
  }
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

  async loginAdmin(
    username: string,
    password: string
  ): Promise<DocumentReference<DocumentData, DocumentData> | null> {
    const queryAdmin = query(
      this.usersReferance,
      where('user_type', '==', 'admin'),
      where('username', '==', username),
      where('password', '==', password)
    );
    const user = await getDocs(queryAdmin);
    if (user.empty) {
      return null;
    } else {
      return user.docs[0].ref;
    }
  }

  async loginClient(
    username: string,
    password: string
  ): Promise<DocumentReference<DocumentData, DocumentData> | null> {
    const queryClient = query(
      this.usersReferance,
      where('user_type', '==', 'client'),
      where('username', '==', username),
      where('password', '==', password)
    );
    const result = await getDocs(queryClient);

    if (result.empty) {
      return null;
    } else {
      return result.docs[0].ref;
    }
  }

  async loginGuest(
    username: string,
    password: string
  ): Promise<DocumentReference<DocumentData, DocumentData> | null> {
    const queryGuest = query(
      this.usersReferance,
      where('user_type', '==', 'guest'),
      where('username', '==', username),
      where('password', '==', password)
    );
    const result = await getDocs(queryGuest);

    if (result.empty) {
      return null;
    } else {
      return result.docs[0].ref;
    }
  }

  async getAdmin(id: string) {
    const admin = doc(this.firestore, 'users', id);
    const data = await getDoc(admin);
    return data.data() as Admin;
  }

  async getClient(id: string) {
    const client = doc(this.firestore, 'users', id);
    const data = await getDoc(client);
    return data.data() as Client;
  }

  async getGuest(id: string) {
    const guest = doc(this.firestore, 'users', id);
    return getDoc(guest);
  }
}
