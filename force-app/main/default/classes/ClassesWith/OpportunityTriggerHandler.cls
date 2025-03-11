/**
 * @description       : 
 * @author            : Kanishk Singhal
 * @group             : 
 * @last modified on  : 02-15-2025
 * @last modified by  : Kanishk Singhal
**/
public with sharing class OpportunityTriggerHandler {
   public static void createCarModelRecordOnCloseWon(List<Opportunity> newOpportunities){
        List<Car_Model__c> carModelList = new List<Car_Model__c>();
        for(Opportunity opp : newOpportunities){
            if(opp.StageName == 'Closed Won'){
                Car_Model__c carModel = new Car_Model__c();
                // carModel.Name = opp.Name;
                // carModel.Model__c = opp.Model__c;
                carModel.Account__c = opp.AccountId;
                
                carModelList.add(carModel);
            }
        }
        insert carModelList;
   }
}