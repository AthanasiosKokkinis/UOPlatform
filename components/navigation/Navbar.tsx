import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Burger } from '../../assets/svgs/general/Burger';
import { Search } from '../../assets/svgs/general/Search';
import { Gear } from '../../assets/svgs/general/Gear';
import { Bell } from '../../assets/svgs/general/Bell';

const NAVBAR_HEIGHT = 56;

export const Navbar = ({color}:{color?: string}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        navbarStyles.navbar,
        {
          paddingTop: insets.top,
          height: NAVBAR_HEIGHT + insets.top,
        },
      ]}
    >
      <TouchableOpacity hitSlop={8}>
        <Burger color="#fff" size={24} />
      </TouchableOpacity>

      <View style={navbarStyles.navbarUserCtas}>
        <TouchableOpacity hitSlop={8} style={navbarStyles.iconButton}>
          <Search color="#fff" size={24} />
        </TouchableOpacity>

        <TouchableOpacity hitSlop={8} style={navbarStyles.iconButton}>
          <Bell color="#fff" size={24} />
        </TouchableOpacity>

        <TouchableOpacity hitSlop={8} style={navbarStyles.iconButton}>
          <Gear color="#fff" size={24} />
        </TouchableOpacity>
      </View>
    </View>
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
  navbarUserCtas: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 8,
  },
});