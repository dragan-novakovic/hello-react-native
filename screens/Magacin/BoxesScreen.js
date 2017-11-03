import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';
import { Card, List, ListItem } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppHeader from '../../components/AppHeader';
import AppSearch from '../../components/AppSearch';
import BoxItem from '../../components/BoxItem';
import { getData } from '../../helpers/index';
import { data } from '../../helpers/Data';


class BoxesScreen extends Component {
  constructor() {
    super();

    this.state = {
      data:[]
    };
  }

  componentDidMount() {
    getData(data.magacin.box).then(data => this.setState({ data }));
  }

        render() {
          const { width, height } = Dimensions.get('window');
          const { navigate } = this.props.navigation;
          const { text, searchBar } = styles;
            return (
              <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
              <FlatList
                data={this.state.data}
                renderItem={({ item }) => (
                  <BoxItem data={item} />
                )}
                keyExtractor={item => item.Id}
              />
            </List>

          );
        }
}

const styles = StyleSheet.create({
    icon: {
      width: 24,
      height: 24,
    },
    searchBar: {
      alignSelf: 'flex-start',
      height: 100
    },
    text: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 65
    }
  });

export default BoxesScreen;
