import React, { Fragment, FunctionComponent } from "react";
import { ScrollView, Text, View } from "react-native";

import { CustomSpacer, IconButton, SafeAreaPage } from "../components";
import { Language } from "../constants";
import {
  circle,
  colorBlue,
  colorGray,
  colorWhite,
  flexChild,
  fs16SemiBoldBlue0,
  fs20SemiBoldBlue0,
  px,
  py,
  rowCenterVertical,
  sh12,
  sh16,
  sh24,
  sh32,
  sh40,
  sh8,
  shadow12Black112,
  spaceBetweenHorizontal,
  sw24,
} from "../styles";
import { ActivityItem } from "../templates/Home";

const MOCK_ACTIVITY = [
  {
    destination: "Golden Gate Bridge, San Francisco, CA",
    pickupTime: "Oct 10, 12:30pm",
    origin: "1640 Dijulu Pass, San Francisco, CA",
    droppedOffTime: "Oct 10, 1:30pm",
    rate: "$40",
    distance: "20 mi",
  },
  {
    destination: "Times Square, New York, NY",
    pickupTime: "Oct 11, 10:00am",
    origin: "350 5th Ave, New York, NY",
    droppedOffTime: "Oct 11, 10:30pm",
    rate: "$25",
    distance: "5 mi",
  },
  {
    destination: "Hollywood Sign, Los Angeles, CA",
    pickupTime: "Oct 12, 09:00am",
    origin: "Los Angeles, CA",
    droppedOffTime: "Oct 12, 9:45pm",
    rate: "$35",
    distance: "15 mi",
  },
  {
    destination: "Walt Disney World, Orlando, FL",
    pickupTime: "Oct 13, 12:20pm",
    origin: "1313 Disneyland Dr, Anaheim, CA",
    droppedOffTime: "Oct 13, 5:45pm",
    rate: "$70",
    distance: "25 mi",
  },
];

const { ACTIVITY } = Language.PAGE;

export const ActivityPage: FunctionComponent<ActivityPageProps> = ({ navigation }: ActivityPageProps) => {
  return (
    <SafeAreaPage topBackgroundColor={colorGray._7}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: colorGray._7 }}>
        <View style={flexChild}>
          <View style={{ ...px(sw24), ...py(sh8) }}>
            <View style={{ ...rowCenterVertical, ...spaceBetweenHorizontal }}>
              <IconButton
                color={colorBlue._0}
                name="chevron-left"
                onPress={() => navigation.goBack()}
                size={sh32}
                style={{ ...circle(sh40, colorWhite._1), ...shadow12Black112 }}
              />
              <Text style={fs20SemiBoldBlue0}>{ACTIVITY.LABEL_ACTIVITY}</Text>
            </View>
            <CustomSpacer space={sh24} />
            <Text style={fs16SemiBoldBlue0}>{ACTIVITY.LABEL_ONGOING}</Text>
            <CustomSpacer space={sh16} />
            <ActivityItem
              data={{
                destination: "835 Paquita St, Sampaloc, Manila, 1008 Metro Manila, Philippines",
                distance: "1.6 mi",
                droppedOffTime: "-",
                origin: "H322+667, Taguig, Metro Manila, Philippines",
                pickupTime: "Oct 16, 1:30pm",
                rate: "$55",
              }}
            />
            <CustomSpacer space={sh16} />
            <Text style={fs16SemiBoldBlue0}>{ACTIVITY.LABEL_RECENT}</Text>
            <CustomSpacer space={sh16} />
            {MOCK_ACTIVITY.map((item, index) => {
              return (
                <Fragment key={index}>
                  <ActivityItem data={item} />
                  {index <= MOCK_ACTIVITY.length - 1 && <CustomSpacer space={sh12} />}
                </Fragment>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaPage>
  );
};
