import { LightningElement } from 'lwc';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_PHONE from '@salesforce/schema/Account.Phone';
import ACCOUNT_BILLING_ADDRESS from '@salesforce/schema/Account.BillingAddress';
import ACCOUNT_ZONE_C from '@salesforce/schema/Account.Zone__c';
// import ACCOUNT_TYPE from '@salesforce/schema/Account.Type';

export default class CreateAccountForm extends LightningElement {
    fields = [ACCOUNT_NAME, ACCOUNT_PHONE, ACCOUNT_BILLING_ADDRESS, ACCOUNT_ZONE_C];

    handleSuccess(event) {
        const accountId = event.detail.id;
        alert(`Account created successfully! Record ID: ${accountId}`);
    }
}
