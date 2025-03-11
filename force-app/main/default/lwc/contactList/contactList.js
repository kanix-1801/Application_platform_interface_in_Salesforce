import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import FIRST_NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LAST_NAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';


const COLUMNS = [
    { label: 'First Name', fieldName: FIRST_NAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Last Name', fieldName: LAST_NAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Email', fieldName: EMAIL_FIELD.fieldApiName, type: 'text' }
];

export default class ContactList extends LightningElement {
    // columns = [
    //     { label: 'First Name', fieldName: 'FirstName', type: 'text' },
    //     { label: 'Last Name', fieldName: 'LastName', type: 'text' },
    //     { label: 'Email', fieldName: 'Email', type: 'text' }
    // ];
    columns = COLUMNS;

    @wire(getContacts)
    Contacts;
}