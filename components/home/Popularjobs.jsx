import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

import PopularJobCard from "../common/cards/PopularJobCard";
import { FONT, SIZES, COLORS } from "../../constants";
import useFetch from "../../hook/useFetch";

const Popularjobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch("search", {
    query: "React Developer",
    num_pages: 1,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popularjobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text style={{ color: COLORS.tertiary }}>
            Something went wrong, please try again later.
          </Text>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item?.job_id}
            horizontal
            contentContainerStyle={{ columnGap: SIZES.medium }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                // onPress={() => router.push(`/job/${item.id}`)}
              >
                <PopularJobCard item={item} selectedJob={item} />
                {/* <View style={styles.cardHeader}>
                  <Text style={styles.cardHeaderTitle}>{item.title}</Text>
                  <Text style={styles.cardHeaderSubTitle}>{item.company}</Text>
                </View>

                <View style={styles.cardBody}>
                  <Text style={styles.cardBodyTitle}>{item.location}</Text>
                  <Text style={styles.cardBodySubTitle}>{item.type}</Text>
                </View> */}
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xLarge,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
  },
});
