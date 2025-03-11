/**
 * @description       : 
 * @author            : Kanishk Singhal
 * @group             : 
 * @last modified on  : 02-24-2025
 * @last modified by  : Kanishk Singhal
**/
public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
        return([SELECT id , FirstName, LastName, Email FROM Contact]);
    }
}