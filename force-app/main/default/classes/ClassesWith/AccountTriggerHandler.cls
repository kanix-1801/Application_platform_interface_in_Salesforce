/**
 * @description       : 
 * @author            : Kanishk Singhal
 * @group             : 
 * @last modified on  : 02-15-2025
 * @last modified by  : Kanishk Singhal
**/
public with sharing class AccountTriggerHandler {

    // Trigger handler methods for populate the Zone field
    public static void onBeforePopulateTheZone(List<Account> newAccounts) {
        set <String> states = new Set<String>();
        for (Account acc : newAccounts) {
            states.add(acc.BillingState);
        }

        Map<String, String> stateToZoneMap = new Map<String, String>();
        list<State_to_Zone_Mapping__mdt> stateAndZones = [SELECT State__c, Zone__c FROM State_to_Zone_Mapping__mdt WHERE MasterLabel IN :states];

        for(State_to_Zone_Mapping__mdt zoneMapToState : stateAndZones){
            stateToZoneMap.put(zoneMapToState.State__c, zoneMapToState.Zone__c);
        }
        for (Account acc : newAccounts) {
            if(stateToZoneMap.containsKey(acc.BillingState)){
                acc.Zone__c = stateToZoneMap.get(acc.BillingState);
            }else{
                continue;
            }
        }
    }
}

