import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';

import {User} from '../interface/User';

interface LeaderboardProps {
  data: User[];
  highlightedIndex?: number;
}

const UserList = ({data, highlightedIndex = -1}: LeaderboardProps) => {
  const headerComponent = useMemo(
    () => (
      <View style={styles.headerContainer}>
        <Text style={[styles.nameCol, styles.headerText]}>Name</Text>
        <Text style={[styles.rankCol, styles.headerText]}>Rank</Text>
        <Text style={[styles.bananasCol, styles.headerText]}>
          No. of bananas
        </Text>
      </View>
    ),
    [],
  );

  const emptyComponent = useMemo(
    () => (
      <Text style={styles.emptyText}>
        Enter a username{'\nor\n'}select from the 3 show options.
      </Text>
    ),
    [],
  );

  const renderItem = useCallback(
    ({item, index}: {item: User; index: number}) => {
      const getBackgroundColor = (i: number) => {
        if (
          i === highlightedIndex ||
          (highlightedIndex > data.length - 1 && i === data.length - 1)
        ) {
          return '#F3C9AE';
        }

        return (i + 1) % 2 === 0 ? '#FDF2EC' : 'white';
      };

      return (
        <View
          style={[
            styles.rowContainer,
            {
              backgroundColor: getBackgroundColor(index),
            },
          ]}>
          <Text style={styles.nameCol}>{item.name}</Text>
          <Text style={styles.rankCol}>{item.rank}</Text>
          <Text style={styles.bananasCol}>{item.bananas}</Text>
        </View>
      );
    },
    [data.length, highlightedIndex],
  );

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={data}
      keyExtractor={item => item.uid}
      ListHeaderComponent={headerComponent}
      ListEmptyComponent={emptyComponent}
      stickyHeaderIndices={[0]}
      renderItem={renderItem}
    />
  );
};

export default UserList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    borderRadius: 8,
  },
  contentContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F3C9AE',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 7,
    backgroundColor: '#DE8344',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  nameCol: {
    flex: 2.5,
  },
  rankCol: {
    flex: 1,
  },
  bananasCol: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 7,
  },
  emptyText: {
    marginVertical: '30%',
    fontSize: 20,
    lineHeight: 35,
    textAlign: 'center',
    color: '#F3C9AE',
  },
});
