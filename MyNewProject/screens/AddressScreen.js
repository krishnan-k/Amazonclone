import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    Pressable,
    Alert,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { UserType } from "../UserContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const AddressScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [houseNo, setHouseNo] = useState("");
    const [street, setStreet] = useState("");
    const [landmark, setLandmark] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const { userId, setUserId } = useContext(UserType);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");
                if (token) {
                    const decodedToken = jwt_decode(token);
                    setUserId(decodedToken.userId);
                }
            } catch (error) {
                console.log("Failed to fetch user ID:", error);
            }
        };

        fetchUser();
    }, []);

    const handleAddAddress = () => {
        const address = {
            name,
            mobileNo,
            houseNo,
            street,
            landmark,
            postalCode,
        };

        if (!name || !mobileNo || !houseNo || !street || !landmark || !postalCode) {
            Alert.alert("Error", "Please fill out all fields.");
            return;
        }

        axios
            .post("http://192.168.5.115:8000/addresses", { userId, address })
            .then((response) => {
                Alert.alert("Success", "Address added successfully");
                setName("");
                setMobileNo("");
                setHouseNo("");
                setStreet("");
                setLandmark("");
                setPostalCode("");

                setTimeout(() => {
                    navigation.goBack();
                }, 500);
            })
            .catch((error) => {
                Alert.alert("Error", "Failed to add address");
                console.log("error", error);
            });
    };

    return (
        <ScrollView style={{ marginTop: 50 }}>
            <View style={{ height: 50, backgroundColor: "#00CED1" }} />

            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                    Add a new Address
                </Text>

                <TextInput
                    placeholderTextColor={"black"}
                    placeholder="India"
                    style={styles.input}
                />

                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        Full name (First and last name)
                    </Text>

                    <TextInput
                        value={name}
                        onChangeText={(text) => setName(text)}
                        placeholderTextColor={"black"}
                        style={styles.input}
                        placeholder="Enter your name"
                    />
                </View>

                <View>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        Mobile number
                    </Text>

                    <TextInput
                        value={mobileNo}
                        onChangeText={(text) => setMobileNo(text)}
                        placeholderTextColor={"black"}
                        style={styles.input}
                        placeholder="Mobile No"
                    />
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        Flat, House No, Building, Company
                    </Text>

                    <TextInput
                        value={houseNo}
                        onChangeText={(text) => setHouseNo(text)}
                        placeholderTextColor={"black"}
                        style={styles.input}
                        placeholder=""
                    />
                </View>

                <View>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        Area, Street, Sector, Village
                    </Text>
                    <TextInput
                        value={street}
                        onChangeText={(text) => setStreet(text)}
                        placeholderTextColor={"black"}
                        style={styles.input}
                        placeholder=""
                    />
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Landmark</Text>
                    <TextInput
                        value={landmark}
                        onChangeText={(text) => setLandmark(text)}
                        placeholderTextColor={"black"}
                        style={styles.input}
                        placeholder="Eg near Apollo hospital"
                    />
                </View>

                <View>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Pincode</Text>

                    <TextInput
                        value={postalCode}
                        onChangeText={(text) => setPostalCode(text)}
                        placeholderTextColor={"black"}
                        style={styles.input}
                        placeholder="Enter Pincode"
                    />
                </View>

                <Pressable
                    onPress={handleAddAddress}
                    style={styles.button}
                >
                    <Text style={{ fontWeight: "bold" }}>Add Address</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

export default AddressScreen;

const styles = StyleSheet.create({
    input: {
        padding: 10,
        borderColor: "#D0D0D0",
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: "#FFC72C",
        padding: 19,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
});
