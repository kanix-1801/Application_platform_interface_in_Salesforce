/**
 * @description       : 
 * @author            : Kanishk Singhal
 * @group             : 
 * @last modified on  : 02-15-2025
 * @last modified by  : Kanishk Singhal
**/
trigger AccountTrigger on Account (before insert, before update , after insert, after update) {

  if(Trigger.isBefore){
    if(Trigger.isInsert){
      AccountTriggerHandler.onBeforePopulateTheZone(Trigger.new);
    }
    // if(Trigger.isUpdate){
    //   AccountTriggerHandler.onBeforePopulateTheZone(Trigger.new);
    // } 
  }
}