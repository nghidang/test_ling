import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Switch,
  Animated,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {setSearchQuery, setIsFuzzySearch} from '../actions';
import {ICONS} from '../config/icons';

const SearchBox = ({onSearch}: {onSearch: () => void}) => {
  const dispatch = useDispatch();
  const {searchQuery, isFuzzySearch} = useSelector(
    (state: any) => state.search,
  );
  const fadeAnim = useRef(
    new Animated.Value(-styles.buttonContainer.width),
  ).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: searchQuery.trim() ? 0 : -styles.buttonContainer.width,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim, searchQuery]);

  return (
    <>
      <View style={styles.searchInputContainer}>
        <View style={styles.inputContainer}>
          <ICONS.Search width={22} />
          <TextInput
            style={styles.input}
            placeholder="User name"
            placeholderTextColor="#909090"
            value={searchQuery}
            onChangeText={value => {
              dispatch(setSearchQuery({searchQuery: value}));
            }}
            clearButtonMode="while-editing"
            autoCorrect={false}
          />
        </View>

        <Animated.View
          style={[styles.buttonContainer, {marginRight: fadeAnim}]}>
          {searchQuery.trim() && <Button title="Search" onPress={onSearch} />}
        </Animated.View>
      </View>

      <View style={styles.fuzzySearchContainer}>
        <Switch
          value={isFuzzySearch}
          onValueChange={value => {
            dispatch(setIsFuzzySearch({isFuzzySearch: value}));
          }}
        />
        <Text>Fuzzy Search</Text>
      </View>
    </>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'flex-end',
    width: 75,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  fuzzySearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 7,
    gap: 10,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderRadius: 10,
    paddingHorizontal: 7,
    backgroundColor: '#f0f0f0',
    gap: 7,
  },
  input: {
    flex: 1,
  },
});
