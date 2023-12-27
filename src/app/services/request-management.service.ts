import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection, doc, query, updateDoc, where } from 'firebase/firestore';
import { Observable } from 'rxjs';
export interface request {
  id: string;
  clientID: string;
  end_date: Date;
  start_date: Date;
  hallName: string;
  hallID: string;
  status: string;
  user_type: string;
  clientName: string;
  time: string;
}
@Injectable({
  providedIn: 'root',
})
export class RequestManagementService {
  clientPending$!: Observable<request[]>;

  constructor(public firestore: Firestore) {
    this.getClientsRequestsPending();
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
}
