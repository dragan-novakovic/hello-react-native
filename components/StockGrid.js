import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { GridWrapper,GridText, GridMiniView } from '../styled-components/Grid'
import { TitleText, WrapperHeader, Wrapper } from '../styled-components/Wrapper'
import { getData } from '../helpers/index'
import Header from '../reusable-components/Header'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';



export default class Grid extends Component {
    constructor(){
        super()

        this.state = {
            data: []
        }
    }

    componentDidMount(){
        const url =`http://212.200.54.246:5001/api/StockTotal/GetStockTotalsByPagesForMobile?companyId=1`
        getData(url).then(data => {
            this.setState({ data })

        })
            .catch(err => console.log(err))
    }
    render() {
        const num = this.state.data.length;


        const tableHead = ['Sifra', 'Artikal', 'Na Stanju', 'Tezina','Detalji'];
        const tableData = [
          this.state.data.map(item => item.Product.ProductCode),
          this.state.data.map(item => item.Product.ProductName.split(' ')[0]),
          this.state.data.map(item => item.Quantity),
          this.state.data.map(item => item.Weight.toFixed(3)),
          [Array(num).map((item,i)=> <Text onPress={()=>navigate('Detalji',{url: `www${this.state.data[i].id}`})}>Detalji</Text>)]
        ]
        const { navigate, goBack } = this.props.navigation
        return (
            <View>
                <Header navigate={navigate} title={'Detalji-'} goBack={goBack}/>
            <View>
                <Table style={styles.table} borderStyle={{borderWidth: 0.5, borderColor: '#c8e1ff'}}>
                <Row data={tableHead} style={styles.head} textStyle={styles.text} flexArr={[1, 1, 1, 1, 1]}/>
            <ScrollView style={{margin:0, padding:0}}>
                <Cols data={tableData} textStyle={styles.text} flexArr={[1, 1, 1, 1, 1]}/>
            </ScrollView>
                </Table>
            </View>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    table: { width: '100%' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { textAlign: 'center' }
  })