#import <React/RCTBridgeModule.h>
#import <Foundation/Foundation.h>

@import HealthKit;

NS_ASSUME_NONNULL_BEGIN

@interface BHealthKit : NSObject <RCTBridgeModule>

@property (nonatomic) HKHealthStore* healthKitStore;

@end

NS_ASSUME_NONNULL_END
