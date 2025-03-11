import { LightningElement, api, wire } from 'lwc';
// import { getRecord } from 'lightning/uiRecordApi';
// import STAGE_FIELD from '@salesforce/schema/Car_Model__c.Stage__c';
// import ZONE_FIELD from '@salesforce/schema/Car_Model__c.Zone__c';

export default class MainLwcComponent extends LightningElement {
    @api recordId;
    // currentStage;
    // pathSteps = [];

    // @wire(getRecord, { recordId: '$recordId', fields: [STAGE_FIELD, ZONE_FIELD] })
    // wiredRecord({ data }) {
    //     if (data) {
    //         this.currentStage = data.fields.Stage__c.value;
    //         const zone = data.fields.Zone__c.value;
    //         // Define path steps based on Zone
    //         this.pathSteps = zone === 'Union Territory'
    //             ? ['Manufacturing', 'Manufactured', 'Tax Exemptions Approved', 'Ready For Launch']
    //             : ['Manufacturing', 'Manufactured', 'Ready For Launch'];
    //     }
    // }
}