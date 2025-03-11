/**
 * @description       : 
 * @author            : Kanishk Singhal
 * @group             : 
 * @last modified on  : 02-26-2025
 * @last modified by  : Kanishk Singhal
**/

public with sharing class MarkusMetroController {
    @AuraEnabled
    public static Train__c createTrain(Train__c newTrain) {
        List<Train__c> conflictingTrains = [
            SELECT Id 
            FROM Train__c 
            WHERE Track_Number__c = :newTrain.Track_Number__c 
            AND Arrival_Time__c < :newTrain.Departure_Time__c 
            AND Departure_Time__c > :newTrain.Arrival_Time__c
        ];
        
        if(!conflictingTrains.isEmpty()) {
            return null;
        }
        
        try {
            insert newTrain;
            return newTrain;
        } catch(Exception e) {
            throw new AuraHandledException('Error creating train: ' + e.getMessage());
        }
    }
    @AuraEnabled(cacheable=true)
    public static List<Train__c> getTrains(String str) {
        str = str.trim();
        List<String> strTime = str.split(':');

        Integer hours = Integer.valueOf(strTime[0].trim());
        Integer minutes = Integer.valueOf(strTime[1].trim());

        Time selectedTime = Time.newInstance(hours, minutes, 20, 0);
        List<Train__c> data =  [
            SELECT Id, Name, Platform_Number__c, Track_Number__c, 
                   Arrival_Time__c, Departure_Time__c
            FROM Train__c
            WHERE Arrival_Time__c <= :selectedTime
            AND Departure_Time__c >= :selectedTime
            ORDER BY Platform_Number__c , Track_Number__c
        ];
        system.debug('data: ' + data);
        return data;
    }
}