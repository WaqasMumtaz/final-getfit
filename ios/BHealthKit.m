//
//  BHealthKit.m
//  getFitNavigate
//
//  Created by MAC on 07/05/2020.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "BHealthKit.h"
#import <React/RCTConvert.h>

@implementation BHealthKit

RCT_EXPORT_MODULE();
- (NSDictionary *)constantsToExport
{
  NSMutableDictionary *hkConstants = [NSMutableDictionary new];
  NSMutableDictionary *hkQuantityTypes = [NSMutableDictionary new];
  [hkQuantityTypes setValue:HKQuantityTypeIdentifierStepCount forKey:@"StepCount"];
  [hkConstants setObject:hkQuantityTypes forKey:@"Type"];
  return hkConstants;
}
/* method to ask for permission to get access to data from HealthKit */
RCT_EXPORT_METHOD(askForPermissionToReadTypes:(NSArray *)types callback:(RCTResponseSenderBlock)callback){
  if(!self.healthKitStore){
    self.healthKitStore = [[HKHealthStore alloc] init];
  }
  NSMutableSet* typesToRequest = [NSMutableSet new];
  for (NSString* type in types) {
    [typesToRequest addObject:[HKQuantityType quantityTypeForIdentifier:type]];
  }
  [self.healthKitStore requestAuthorizationToShareTypes:nil readTypes:typesToRequest completion:^(BOOL success, NSError *error) {
    /* if everything is fine, we call up a  callback with argument null that triggers the error */
    if(success){
      callback(@[[NSNull null]]);
      return;
    }
/* otherwise, send the error message to callback */
    callback(@[[error localizedDescription]]);
  }];
}
/* method to receive the step count for a given time period. We send the initial time as the first argument, final time as the second one and callback as the third.
*/
RCT_EXPORT_METHOD(getStepsData:(NSDate *)startDate endDate:(NSDate *)endDate cb:(RCTResponseSenderBlock)callback){
  NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
  NSLocale *enUSPOSIXLocale = [NSLocale localeWithLocaleIdentifier:@"en_US_POSIX"];
  NSPredicate *predicate = [HKQuery predicateForSamplesWithStartDate:startDate endDate:endDate options:HKQueryOptionStrictStartDate];
  [dateFormatter setLocale:enUSPOSIXLocale];
  [dateFormatter setDateFormat:@"yyyy-MM-dd'T'HH:mm:ssZZZZZ"];
  HKSampleQuery *stepsQuery = [[HKSampleQuery alloc]
                               initWithSampleType:[HKQuantityType quantityTypeForIdentifier:HKQuantityTypeIdentifierStepCount]
                               predicate:predicate
                               limit:2000 sortDescriptors:nil resultsHandler:^(HKSampleQuery *query, NSArray *results, NSError *error) {
    if(error){
      /* if there is an error, send its description to callback */
      callback(@[[error localizedDescription]]);
      return;
    }
    NSMutableArray *data = [NSMutableArray new];
    for (HKQuantitySample* sample in results) {
      double count = [sample.quantity doubleValueForUnit:[HKUnit countUnit]];
      NSNumber *val = [NSNumber numberWithDouble:count];
      NSMutableDictionary* s = [NSMutableDictionary new];
      [s setValue:val forKey:@"value"];
      [s setValue:sample.sampleType.description forKey:@"data_type"];
      [s setValue:[dateFormatter stringFromDate:sample.startDate] forKey:@"start_date"];
      [s setValue:[dateFormatter stringFromDate:sample.endDate] forKey:@"end_date"];
      [data addObject:s];
    }
   /* if everything is OK, call up a callback; null will be the first argument as there are ni mistakes, the array of data will come after it. */
    callback(@[[NSNull null], data ]);
  }];
  [self.healthKitStore executeQuery:stepsQuery];
};

@end
