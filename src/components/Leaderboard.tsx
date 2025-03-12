import React, {useState, useCallback, useEffect, useMemo} from 'react';
import {SafeAreaView, StyleSheet, Alert, Button, View} from 'react-native';
import {useSelector} from 'react-redux';

import {User} from '../interface/User';
import UserList from './UserList';
import SearchBox from './SearchBox';
import leaderboardData from '../assets/leaderboard.json';
// const leaderboardData = require('./assets/leaderboard.json');

const Leaderboard = () => {
  const {searchQuery, isFuzzySearch} = useSelector(
    (state: any) => state.search,
  );

  const [sortedRankUsers, setSortedRankUsers] = useState<User[]>([]);
  const [searchedUserIndex, setSearchedUserIndex] = useState<
    number | undefined
  >();
  const [searchedUsers, setSearchedUsers] = useState<User[]>([]);

  const searchUsers = useCallback(
    (searchName: string) => {
      // Find the index of the searched
      const foundIndex = sortedRankUsers.findIndex(
        user => user.name.toLowerCase() === searchName.toLowerCase(),
      );
      setSearchedUserIndex(foundIndex);

      if (foundIndex === -1) {
        Alert.alert(
          'Error',
          'This user name does not exist! Please specify an existing user name!',
        );
        setSearchedUsers([]);
        return;
      }

      // Get the top 10 users
      const top10 = sortedRankUsers.slice(0, 10);

      // If searched user is already in the top 10, keep the list unchanged
      if (foundIndex < 10) {
        setSearchedUsers(top10);
        return;
      }

      // If the searched user is NOT in the top 10, replace the last user in the top 10
      const modifiedTop10 = [...top10];
      modifiedTop10[9] = sortedRankUsers[foundIndex]; // Replace last user with searched user
      setSearchedUsers(modifiedTop10);
    },
    [sortedRankUsers],
  );

  const fuzzySearchUsers = useCallback(
    (searchName: string) => {
      // Filter users whose name contains the query (case-insensitive)
      const lowerCaseQuery = searchName.toLowerCase();
      const matchingUsers = sortedRankUsers.filter(user =>
        user.name.toLowerCase().includes(lowerCaseQuery),
      );

      // Sort by name
      matchingUsers.sort((a, b) => a.name.localeCompare(b.name));

      setSearchedUsers(matchingUsers);
    },
    [sortedRankUsers],
  );

  const sortedNameUsers = useMemo(
    () => [...sortedRankUsers].sort((a, b) => a.name.localeCompare(b.name)),
    [sortedRankUsers],
  );

  const lowestRankedUsers = useMemo(() => {
    if (!sortedRankUsers.length) {
      return [];
    }

    // Find the lowest banana count
    const minBananas = sortedRankUsers[sortedRankUsers.length - 1].bananas;

    // Filter user who have the lowest banana count and sort alphabetically
    const result = [...sortedRankUsers]
      .filter(user => user.bananas === minBananas)
      .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name

    return result;
  }, [sortedRankUsers]);

  const sortUsersByRank = useCallback(() => {
    setSearchedUsers(sortedRankUsers);
  }, [sortedRankUsers]);

  const sortUsersByName = useCallback(() => {
    setSearchedUsers(sortedNameUsers);
  }, [sortedNameUsers]);

  const showLowestRankedUsers = useCallback(() => {
    setSearchedUsers(lowestRankedUsers);
  }, [lowestRankedUsers]);

  const onSearch = useCallback(() => {
    if (!searchQuery.trim()) {
      setSearchedUserIndex(undefined);
      setSearchedUsers([]);

      Alert.alert('Error', 'Please input an user name!');
    } else {
      isFuzzySearch ? fuzzySearchUsers(searchQuery) : searchUsers(searchQuery);
    }
  }, [searchQuery, isFuzzySearch, searchUsers, fuzzySearchUsers]);

  useEffect(() => {
    // Convert object to array and sort by bananas
    const users = (Object.values(leaderboardData) as User[]).sort(
      (a, b) => b.bananas - a.bananas,
    );

    // Assign ranks correctly
    let rank = 1;
    for (let i = 0; i < users.length; i++) {
      if (i > 0 && users[i].bananas < users[i - 1].bananas) {
        rank = i + 1; // Only update rank if bananas are lower than the previous user
      }
      users[i].rank = rank;
    }

    setSortedRankUsers(users);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBox onSearch={onSearch} />

      <View style={styles.optionsContainer}>
        <Button title="Show users sorted by rank" onPress={sortUsersByRank} />
        <Button title="Show users sorted by name" onPress={sortUsersByName} />
        <Button
          title="Show the lowest ranked users"
          onPress={showLowestRankedUsers}
        />
      </View>

      <UserList data={searchedUsers} highlightedIndex={searchedUserIndex} />
    </SafeAreaView>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  optionsContainer: {
    alignItems: 'flex-start',
    marginTop: 5,
  },
});
