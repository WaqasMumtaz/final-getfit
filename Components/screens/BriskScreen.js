import React from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, Picker } from 'react-native';
import styles from '../Styling/BriskStyle';
import { Dropdown } from 'react-native-material-dropdown';


class BriskScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            brisk: false
        }
    }

    changeScreen = () => {
        this.setState({ brisk: true })
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                {
                    this.props.title == 'Add Custom Exercise' ?
                    <View>
                        <View style={styles.cardStyle}>
                            <View style={styles.cardChildOne}>
                                {/* <Text style={styles.heading}>{this.props.title}</Text> */}
                                <TextInput placeholder="Add Exercise Name" placeholderTextColor="black"
                                    onChangeText={(text) => this.props.setCustomExeName(text)}
                                    value={this.props.value2}
                                    key={this.props.indexNumber}
                                    style={styles.customInput} />
                                <TouchableOpacity onPress={this.props.backFunc}>
                                    <Image source={require('../icons/cancel.png')} style={styles.iconSize} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.labelTextContainer}>
                            <Text style={styles.labelTextAmountStyle}>Amount</Text>
                            <Text style={styles.labelUnitStyle}>Unit</Text>
                        </View>
                        <View style={styles.cardChildTwo}>
                            <View style={styles.cardChildTwoSiblingContainer}>
                                <TextInput placeholder="0" placeholderTextColor="black"
                                    onChangeText={(text) => this.props.setAmount(text)}
                                    value={this.props.value}
                                    key={this.props.indexNumber}
                                    maxLength={3} keyboardType="numeric" style={styles.inputFieldStyle} />
                            </View>
                            <View style={styles.pickerContainer}>
                                <View style={styles.pickerStyle}>
                                    <Dropdown
                                        // label='Select an option..'
                                        value={this.props.unit}
                                        data={[{
                                            value: 'hours',
                                        }, {
                                            value: 'minutes',
                                        }, {
                                            value: 'seconds',
                                        }]}
                                        dropdownOffset={{ top: 8, left: 0 }}
                                        onChangeText={(text) => this.props.updateUnit(text)}

                                    />

                                </View>

                                {/* <Picker selectedValue={this.props.unit} onValueChange={(text) => this.props.updateUnit(text)} style={styles.pickerStyle} mode="dropdown">
                            <Picker.Item label='Select an option...' value='0' />
                            <Picker.Item label="Hours" value="hours" />
                            <Picker.Item label="Minutes" value="minutes" />
                            <Picker.Item label="Seconds" value="seconds" />
                        </Picker> */}
                            </View>
                        </View>
                </View>        
                :
                       <View>
                        <View style={styles.cardStyle}>
                            <View style={styles.cardChildOne}>

                                <Text style={styles.heading}>{this.props.title}</Text>
                                <TouchableOpacity onPress={this.props.backFunc}>
                                    <Image source={require('../icons/cancel.png')} style={styles.iconSize} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.labelTextContainer}>
                            <Text style={styles.labelTextAmountStyle}>Amount</Text>
                            <Text style={styles.labelUnitStyle}>Unit</Text>
                        </View>
                        <View style={styles.cardChildTwo}>
                            <View style={styles.cardChildTwoSiblingContainer}>
                                <TextInput placeholder="0" placeholderTextColor="black"
                                    onChangeText={(text) => this.props.setAmount(text)}
                                    value={this.props.value}
                                    key={this.props.indexNumber}
                                    maxLength={3} keyboardType="numeric" style={styles.inputFieldStyle} />
                            </View>
                            <View style={styles.pickerContainer}>
                                <View style={styles.pickerStyle}>
                                    <Dropdown
                                        // label='Select an option..'
                                        value={this.props.unit}
                                        data={[{
                                            value: 'hours',
                                        }, {
                                            value: 'minutes',
                                        }, {
                                            value: 'seconds',
                                        }]}
                                        dropdownOffset={{ top: 8, left: 0 }}
                                        onChangeText={(text) => this.props.updateUnit(text)}

                                    />

                                </View>

                                {/* <Picker selectedValue={this.props.unit} onValueChange={(text) => this.props.updateUnit(text)} style={styles.pickerStyle} mode="dropdown">
                            <Picker.Item label='Select an option...' value='0' />
                            <Picker.Item label="Hours" value="hours" />
                            <Picker.Item label="Minutes" value="minutes" />
                            <Picker.Item label="Seconds" value="seconds" />
                        </Picker> */}
                            </View>
                        </View>
                     </View>   
                            
        }

            </View>
        )
    }
}

export default BriskScreen;

