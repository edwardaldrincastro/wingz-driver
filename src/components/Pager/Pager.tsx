import React, { FunctionComponent, RefObject, useRef, useState } from "react";
import { Text, View } from "react-native";
import { FastImageProps } from "react-native-fast-image";
import PagerView from "react-native-pager-view";

import {
  centerHV,
  colorBlue,
  colorGray,
  flexChild,
  flexRow,
  fs16RegGreen3,
  fs24SemiBoldGreen3,
  fsAlignCenter,
  fullHW,
  px,
  sh4,
  sh48,
  sh8,
  sw24,
  sw8,
} from "../../styles";
import { CustomImage } from "../Images";
import { CustomSpacer } from "../Views";

interface PagerData {
  image: FastImageProps["source"];
  subtitle: string;
  title: string;
}

interface PagerProps {
  data: PagerData[];
}

export const Pager: FunctionComponent<PagerProps> = ({ data }: PagerProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageViewRef: RefObject<PagerView> | null = useRef(null);

  return (
    <>
      <PagerView
        onPageSelected={(e) => {
          setCurrentPage(e.nativeEvent.position);
        }}
        ref={pageViewRef}
        initialPage={0}
        style={flexChild}>
        {data.map((eachData, index) => (
          <View key={index} style={flexChild}>
            <View style={{ ...flexChild, ...centerHV }}>
              <CustomImage source={eachData.image} style={fullHW} />
            </View>
            <View style={{ ...px(sw24), ...centerHV }}>
              <Text style={{ ...fs24SemiBoldGreen3, ...fsAlignCenter }}>{eachData.title}</Text>
              <CustomSpacer space={sh8} />
              <Text style={{ ...fs16RegGreen3, ...fsAlignCenter }}>{eachData.subtitle}</Text>
            </View>
          </View>
        ))}
      </PagerView>
      <CustomSpacer space={sh48} />
      <View style={{ ...centerHV, ...flexRow, gap: sw8 }}>
        {Array.from({ length: data.length }, (_, i) => (
          <View
            key={i}
            style={{ height: sh4, width: sw24, backgroundColor: currentPage === i ? colorBlue._0 : colorGray._2, borderRadius: sw8 }}
          />
        ))}
      </View>
    </>
  );
};
