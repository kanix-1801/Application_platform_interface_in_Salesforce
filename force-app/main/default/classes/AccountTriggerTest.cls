@IsTest
private class AccountTriggerTest {
  @TestSetup
  static void setup() {
    State_to_Zone_Mapping__mdt testMapping = new State_to_Zone_Mapping__mdt(
      State__c = 'Rajasthan',
      Zone__c = 'North India'
    );
  }

  @IsTest
  static void testZoneAssignment() {
    Account acc = new Account(
      Name = 'Test Dealership',
      BillingState = 'Rajasthan'
    );
    insert acc;
    acc = [SELECT Zone__c FROM Account WHERE Id = :acc.Id];
    System.assertEquals('South India', acc.Zone__c, 'Zone not assigned correctly');
  }
}