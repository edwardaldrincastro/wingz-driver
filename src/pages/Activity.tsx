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
  fs16SemiBoldGreen1,
  fs20SemiBoldGreen3,
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
    pickupTime: "Oct 10, 14:30 PST",
    origin: "1640 Dijulu Pass, San Francisco, CA",
    droppedOffTime: "Oct 10, 15:30 PST",
    rate: "$40",
    distance: "20 mi",
  },
  {
    destination: "Times Square, New York, NY",
    pickupTime: "Oct 11, 10:00 EST",
    origin: "350 5th Ave, New York, NY",
    droppedOffTime: "Oct 11, 10:30 EST",
    rate: "$25",
    distance: "5 mi",
  },
  {
    destination: "Hollywood Sign, Los Angeles, CA",
    pickupTime: "Oct 12, 09:00 PST",
    origin: "Los Angeles, CA",
    droppedOffTime: "Oct 12, 09:30 PST",
    rate: "$35",
    distance: "15 mi",
  },
  {
    destination: "Walt Disney World, Orlando, FL",
    pickupTime: "Oct 13, 15:00 EST",
    origin: "1313 Disneyland Dr, Anaheim, CA",
    droppedOffTime: "Oct 13, 15:45 EST",
    rate: "$70",
    distance: "25 mi",
  },
  {
    destination: "National Mall, Washington, D.C.",
    pickupTime: "Oct 14, 11:00 EST",
    origin: "1600 Pennsylvania Ave NW, Washington, D.C.",
    droppedOffTime: "Oct 14, 11:30 EST",
    rate: "$20",
    distance: "3 mi",
  },
  {
    destination: "Las Vegas Strip, Las Vegas, NV",
    pickupTime: "Oct 15, 16:00 PST",
    origin: "3799 S Las Vegas Blvd, Las Vegas, NV",
    droppedOffTime: "Oct 15, 16:30 PST",
    rate: "$60",
    distance: "10 mi",
  },
  {
    destination: "Statue of Liberty, New York, NY",
    pickupTime: "Oct 16, 13:00 EST",
    origin: "Liberty Island, New York, NY",
    droppedOffTime: "Oct 16, 13:45 EST",
    rate: "$50",
    distance: "7 mi",
  },
  {
    destination: "The Alamo, San Antonio, TX",
    pickupTime: "Oct 17, 08:00 CST",
    origin: "300 Alamo Plaza, San Antonio, TX",
    droppedOffTime: "Oct 17, 08:30 CST",
    rate: "$45",
    distance: "12 mi",
  },
  {
    destination: "Niagara Falls, NY",
    pickupTime: "Oct 18, 07:00 EST",
    origin: "332 Prospect St, Niagara Falls, NY",
    droppedOffTime: "Oct 18, 08:30 EST",
    rate: "$80",
    distance: "15 mi",
  },
];

const { ACTIVITY } = Language.PAGE;

export const ActivityPage: FunctionComponent<ActivityPageProps> = ({ navigation }: ActivityPageProps) => {
  return (
    <SafeAreaPage topBackgroundColor={colorGray._2}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: colorGray._2 }}>
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
              <Text style={fs20SemiBoldGreen3}>{ACTIVITY.LABEL_ACTIVITY}</Text>
            </View>
            <CustomSpacer space={sh24} />
            <Text style={fs16SemiBoldGreen1}>{ACTIVITY.LABEL_ONGOING}</Text>
            <CustomSpacer space={sh16} />
            <ActivityItem
              data={{
                destination: "Mount Rushmore, SD",
                distance: "20 mi",
                droppedOffTime: "-",
                origin: "13000 SD-244, Keystone, SD",
                pickupTime: "Oct 19, 14:00 CST",
                rate: "$55",
              }}
            />
            <CustomSpacer space={sh16} />
            <Text style={fs16SemiBoldGreen1}>{ACTIVITY.LABEL_RECENT}</Text>
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
