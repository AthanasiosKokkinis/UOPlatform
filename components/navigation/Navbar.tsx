import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../colors';
import { Search } from '../../assets/svgs/general/Search';
import { Gear } from '../../assets/svgs/general/Gear';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../stores/authStore';

const NAVBAR_HEIGHT = 56;

export const Navbar = ({ color }: { color?: string }) => {
  const insets = useSafeAreaInsets();
  const navigation: any = useNavigation();
  const me = useAuthStore((s) => s.user);
  const myProfile = useAuthStore((s) => s.profile);
  const [isSearching, setIsSearching] = useState(false);
  const [searchString, setSearchString] = useState('');
  const inputRef = useRef<TextInput>(null);


  


  const TEST_POST_TITLES: string[] = [
    "Test 1",
    "Test 2",
    "How to make lasagna",
    "Best coffee in Patras",
    "Manga coffee shops",
    "Εξεταστική"
  ]

  const TEST_TAGS:string[] = [
    "Ασκήσεις",
    "Μαθήματα",
    "Events"
  ]

  const returnSearchResults = (searchString: string): {postItems: {postTitle: string, score: number}[], tagItems: {tagTitle: string, score: number}[]} =>
  {
    return({postItems:[], tagItems:[]});
  }

  useEffect(() => {
    if (isSearching) {
      const t = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);

      return () => clearTimeout(t);
    }
  }, [isSearching]);

  return (
    <>
      {!isSearching ? (
        <View
          style={[
            navbarStyles.navbar,
            {
              paddingTop: insets.top,
              height: NAVBAR_HEIGHT + insets.top,
            },
          ]}
        >
          <TouchableOpacity
            hitSlop={8}
            onPress={() => {
              navigation.navigate('Profile', me ? { userId: me.id } : undefined);
            }}
          >
            <View style={navbarStyles.userRow}>
              <View style={navbarStyles.imageContainer}>
                <Image
                  source={{
                    uri:
                      myProfile?.avatar_url ??
                      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
                  }}
                  style={navbarStyles.image}
                  resizeMode="cover"
                />
              </View>
              <Text style={navbarStyles.username}>
                {myProfile?.display_name ?? myProfile?.username ?? me?.email ?? ''}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={navbarStyles.navbarUserCtas}>
            <TouchableOpacity
              hitSlop={8}
              style={navbarStyles.iconButton}
              onPress={() => setIsSearching(true)}
            >
              <Search color="#fff" size={24} />
            </TouchableOpacity>

            <TouchableOpacity
              hitSlop={8}
              style={navbarStyles.iconButton}
              onPress={() => {
                navigation.navigate('Profile');
              }}
            >
              <Gear color="#fff" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={[
            navbarStyles.searchOverlay,
            {
              paddingTop: insets.top,
            },
          ]}
        >
          <View style={navbarStyles.searchHeader}>
            <TouchableOpacity
              onPress={() => {
                setIsSearching(false);
                setSearchString('');
              }}
              style={navbarStyles.cancelButton}
            >
              <Text style={navbarStyles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <View style={navbarStyles.searchInputWrapper}>
              <Search color="#8E8E93" size={18} />
              <TextInput
                ref={inputRef}
                value={searchString}
                onChangeText={setSearchString}
                placeholder="Αναζήτηση"
                placeholderTextColor="#8E8E93"
                style={navbarStyles.searchInput}
                returnKeyType="search"
                selectionColor="#fff"
              />
            </View>
          </View>

          <View style={navbarStyles.searchBody}>
          
                <Text style={navbarStyles.sectionTitle}>Αποτελέσματα</Text>

                {[
                  `Search for "${searchString}"`,
                  `${searchString} posts`,
                  `${searchString} communities`,
                ].map(item => (
                  <TouchableOpacity key={item} style={navbarStyles.resultRow}>
                    <Text style={navbarStyles.resultText}>{item}</Text>
                  </TouchableOpacity>
                ))}
           
          
          </View>
        </View>
      )}
    </>
  );
};

const navbarStyles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  username: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  navbarUserCtas: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 8,
  },
  imageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: COLORS.secondary,
  },
  image: {
    width: '100%',
    height: '100%',
  },

  searchOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2000,
    backgroundColor: '#000000',
  },
  searchHeader: {
    height: NAVBAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  cancelButton: {
    paddingVertical: 8,
    paddingRight: 4,
  },
  cancelText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  searchInputWrapper: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
    paddingVertical: 0,
  },
  searchBody: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  sectionTitle: {
    color: '#8E8E93',
    fontSize: 13,
    marginBottom: 10,
    fontWeight: '600',
  },
  resultRow: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1f1f22',
  },
  resultText: {
    color: '#fff',
    fontSize: 15,
  },
});