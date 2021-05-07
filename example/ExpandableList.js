import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity, LayoutAnimation } from 'react-native'

import Pdf from 'react-native-pdf'

const DATA = Array.from({ length: 4 })

let source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true }

export default class ExpandableList extends Component {
    onPress = (index) => {
        const { expandedIndex } = this.state
        if (expandedIndex != index) {
            this.setState({
                expandedIndex: index,
            })
        } else {
            this.setState({
                expandedIndex: -1,
            })
        }

        LayoutAnimation.easeInEaseOut()
    }

    _renderItem = ({ item, index }) => (
        <>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.onPress(index)}
                style={{ height: 50, backgroundColor: 'red', marginTop: 10 }}
            >
                <Text>{index}</Text>
            </TouchableOpacity>
            {this.state.expandedIndex === index && this._renderPdfPreview(source)}
        </>
    )

    _renderPdfPreview = (source) => {
        return (
            <View style={{ height: 150, backgroundColor: 'blue', padding: 10 }}>
                <Pdf fitPolicy={0} source={source} style={{ flex: 1 }} />
            </View>
        )
    }

    constructor(props) {
        super(props)

        this.state = {
            expandedIndex: -1,
        }
    }

    render() {
        return (
            <FlatList
                data={DATA}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => index + ''}
            />
        )
    }
}
