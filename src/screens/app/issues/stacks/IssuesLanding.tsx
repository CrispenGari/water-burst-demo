import { ScrollView, Text, View, Dimensions } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { COLORS, FONTS } from "../../../../constants";
import { IssuesStackNavProps } from "../../../../params";
import { useSelector } from "react-redux";
import { StateType } from "../../../../types";
import {
  onSnapshot,
  doc,
  collection,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import { BoxIndicator, Issue } from "../../../../components";

const Landing: React.FC<IssuesStackNavProps<"IssuesLanding">> = ({
  navigation,
}) => {
  const { user } = useSelector(({ user }: StateType) => user);
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Your Issues",
    });
  }, []);

  useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!user) {
      setLoading(true);
      const _query = query(
        collection(db, "issues"),
        orderBy("timestamp", "desc")
      );
      const unsubscribe = onSnapshot(_query, async (querySnapshot) => {
        const issues = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((doc: any) => doc?.user?.uid === user?.uid);
        setIssues(issues as any);
        setLoading(false);
        return () => {
          mounted = false;
          unsubscribe();
        };
      });
    }
    return () => {
      mounted = false;
    };
  }, [user]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          backgroundColor: COLORS.dark,
        }}
      >
        <BoxIndicator size={20} color={COLORS.main} />
      </View>
    );
  }

  if (issues.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.dark,
        }}
      >
        <Text style={{ fontFamily: FONTS.regularBold, color: "white" }}>
          No Notifications
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.dark }}>
      {issues?.map((issue) => {
        return <Issue issue={issue} key={issue.id} navigation={navigation} />;
      })}
    </ScrollView>
  );
};

export default Landing;
