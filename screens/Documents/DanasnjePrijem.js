import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { SearchBar, Icon, ListItem } from "react-native-elements";
import { Wrapper, WrapperHeader } from "../../styled-components/Wrapper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Activity from "../../components/ActivityIndicator";
import ListItems from "../../components/InputNoteItem";
import { getData, filterData, newFilterData } from "../../helpers/index";
import DatePicker from "react-native-datepicker";
import { format } from "date-fns";

//let date0 = `${format(Date.now(), "YYYYMMDD")}000000`;
let date = format(Date.now(), "YYYYMMDDHHmmss");

let date0 = `20180317000000`;

const dateFrom = `&dateFrom=${date0}`;
const dateTo = `&dateTo=${date0}`;
const BP = `&businessPartnerId=0`;
const animalSubTypeId = `&animalSubTypeId=0`;
const URLmini = `http://212.200.54.246:5001/api/InputNote/GetInputNotesForGroupedReportMobile?companyId=1`;
const URL = `${URLmini}${dateFrom}${dateTo}${BP}${animalSubTypeId}`;
export default class PrePrijemScreen extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      search: "",
      page: 1,
      refreshing: false,
      date: "2018-01-01"
    };

    this.search = this.search.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }
  componentDidMount() {
    getData(URL)
      .then(data => this.setState({ data }))
      .catch(err => console.log(err));
  }

  handleRefresh() {
    this.setState(
      {
        refreshing: true
      },
      () =>
        getData(URL).then(data =>
          this.setState({
            data,
            refreshing: false,
            page: 1
          })
        )
    );
  }

  async search(e) {
    await this.setState({ search: e.nativeEvent.text });
    getData(URLmini)
      .then(data => newFilterData(data, this.state.search))
      .then(data => this.setState({ data }));
  }

  async handleLoadMore() {
    let { page } = this.state;
    page = page + 1;
    let Data = await getData(`${URLmini}&CurrentPage=${page}`);
    if (Data.length > 0) {
      let data = [...this.state.data, ...Data];
      await this.setState({ data, page });
    }
  }

  render() {
    const rdy = <Activity />;
    const { navigate, goBack } = this.props.navigation;
    const { search, icon } = styles;
    return (
      <Wrapper>
        <WrapperHeader>
          <Icon
            containerStyle={icon}
            name="chevron-left"
            type="font-awesome"
            color="#fff"
            size={32}
            onPress={() => goBack()}
          />
          <SearchBar
            containerStyle={search}
            round
            lightTheme
            onSubmitEditing={e => this.search(e)}
            placeholder="Type Here..."
          />
        </WrapperHeader>
        {this.state.data.length < 1 && rdy}
        <FlatList
          style={{ width: "100%" }}
          data={this.state.data}
          renderItem={({ item }) => {
            let img;
            switch (item.Image.split(".")[0]) {
              case "cow":
                img = require("../../assets/Icons/cow2.png");
                break;
              case "pig":
                img = require("../../assets/Icons/pig2.png");
                break;
              case "lamb":
                img = require("../../assets/Icons/lamb2.png");
                break;
              case "all":
                img = require("../../assets/Icons/004-all.png");
            }
            return (
              <ListItem
                roundAvatar
                avatar={img}
                title={item.Item}
                subtitle={item.Description}
                onPressRightIcon={() =>
                  navigate("subGroup", {
                    url: `http://212.200.54.246:5001/api/InputNote/GetInputNotesForSubGroupedReportMobile?companyId=1&dateFrom=20180317000000&dateTo=20180317000000&businessPartnerId=0&animalSubTypeId=${
                      item.AnimalSubTypeId
                    }`
                  })
                }
              />
            );
          }}
          keyExtractor={(item, i) => i}
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
    alignSelf: "flex-start",
    margin: 0,
    padding: 0,
    backgroundColor: "#009688",
    height: 56
  },
  search: {
    flex: 3,
    alignSelf: "flex-end",
    margin: 0,
    padding: 0,
    backgroundColor: "#009688",
    borderBottomWidth: 0,
    borderTopWidth: 0
  }
});

/*
 <DatePicker
          style={{ width: 200, paddingTop: 15 }}
          date={this.state.date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="2018-01-01"
          maxDate="2025-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateInput: {
              backgroundColor: "white"
            }
          }}
          onDateChange={date => {
            this.setState({ date });
          }}
        />
*/