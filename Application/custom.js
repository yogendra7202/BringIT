import { ToastAndroid } from "react-native";

export function toastAlert(msg) {
    // To make Toast with duration
    ToastAndroid.show(
        msg,
        ToastAndroid.SHORT, //can be SHORT, LONG
        ToastAndroid.BOTTOM, //can be TOP, BOTTON, CENTER
        -250, //xOffset
        -500, //yOffset
    );
}