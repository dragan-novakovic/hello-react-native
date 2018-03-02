import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';
import { Card, List, ListItem, SearchBar, Icon } from 'react-native-elements';
import { WrapperHeader, Wrapper } from '../../styled-components/Wrapper'
import Activity from '../../components/ActivityIndicator';
import ListItems from '../../components/WarehouseItem';
import { getData, filterData } from '../../helpers/index';
import { data } from '../../helpers/Data';
import { Dropdown } from 'react-native-material-dropdown'

export default class WarehouseScreen extends Component {
  constructor() {
    super();

    this.state = {
      data:[],
      search: '',
      refreshing: false
    };
    this.search = this.search.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  search(e) {
    this.setState({search:e.nativeEvent.text})
  }

  componentDidMount() {
    getData(data.magacin.warehouse).then(data => this.setState({ data: data.Warehouses, refreshing: false }));
  }

  handleRefresh() {
    this.setState({ refreshing: true })
    getData(data.magacin.warehouse).then(data => {
      this.setState({ data: data.Warehouses, refreshing: false })
    })
  }


        render() {
          let data = this.state.data;
          if (this.state.data.length>1){
            const filteredData = filterData(this.state.data, this.state.search);
            data = filteredData;
          }
          let dataz = [{
            value: 'Banana',
          }, {
            value: 'Mango',
          }, {
            value: 'Pear',
          }, {
            value: 'Pear',
          }, {
            value: 'Pear',
          }, {
            value: 'Pear',
          }
        ];

          const rdy =  <Activity />
          const { navigate, goBack } = this.props.navigation;
          const { search, icon } = styles;
            return (

          <Wrapper>
          <WrapperHeader>
            <Icon
              containerStyle={icon}
              name='chevron-left'
              type='font-awesome'
              color='#fff'
              size={32}
              onPress={()=>goBack()}
            />
            <SearchBar
              containerStyle={search}
              round
              lightTheme
              onSubmitEditing={e=>this.search(e)}
              placeholder='Type Here...'
            />
              </WrapperHeader>
              {this.state.data.length < 1 && rdy}
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <Dropdown
                  containerStyle={{width:'35%',paddingRight:15}}
                  label='Skladiste'
                  data={dataz}
                />
                <Dropdown
                  containerStyle={{width:'35%',paddingLeft:15}}
                  label='Komora'
                  data={dataz}
                />
                </View>
              <FlatList
                style={{width:'100%'}}
                data={data}
                renderItem={({ item }) => (
                  <ListItems data={item} navigate={navigate} />
                )}
                keyExtractor={item => item.Id}
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
              />
            </Wrapper>

          );
        }
}

const styles = StyleSheet.create({
    icon: {
      flex: 1,
      alignSelf:'flex-start',
      margin:0,
      padding:0,
      backgroundColor:'#009688',
      height: 56
    },
    search: {
      flex: 3,
      alignSelf:'flex-end',
      margin:0,
      padding:0,
      backgroundColor:'#009688',
      borderBottomWidth:0,
      borderTopWidth:0
    }
  });
