/**
 * @description       : 
 * @author            : Kanishk Singhal
 * @group             : 
 * @last modified on  : 02-15-2025
 * @last modified by  : Kanishk Singhal
**/
trigger OpportunityTrigger on Opportunity (after insert, after update) {
  if(Trigger.isAfter){
    if(Trigger.isInsert){
      OpportunityTriggerHandler.onAfterPopulateTheZone(Trigger.new);
    }
    if(Trigger.isUpdate){
      OpportunityTriggerHandler.onAfterPopulateTheZone(Trigger.new);
    } 
  }

}