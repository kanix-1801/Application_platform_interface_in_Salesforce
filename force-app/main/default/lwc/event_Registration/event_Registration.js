import { LightningElement } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Event__c.Name__c';
import EVENT_OBJECT from '@salesforce/schema/Event__c';
import MAX_SEATS from '@salesforce/schema/Event__c.Max_Seats__c';
import STATUS_FIELD from '@salesforce/schema/Event__c.Status__c';
import START_DATE from '@salesforce/schema/Event__c.Start_Date_Time__c';
import END_DATE from '@salesforce/schema/Event__c.End_Date_Time__c';
import ORGANIZER_ from '@salesforce/schema/Event__c.Organizer__c';


export default class Event_Registration extends LightningElement {
    objectApiName = EVENT_OBJECT;
    fields = [NAME_FIELD, MAX_SEATS, STATUS_FIELD, START_DATE, END_DATE, ORGANIZER_];

    isModalOpen = true;
    closeModal() {
        this.isModalOpen = false;
    }
}