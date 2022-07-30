import { FC, useRef } from "react"
import LottieView from "lottie-react-native"

const ActivityIndicator: FC<{ visible: boolean }> = ({ visible }) => {
    const animation = useRef(null);
    if (!visible) {
        return null
    } else {
        return (
            <LottieView
                autoPlay
                loop
                source={require("../../animations/paperplane.json")}
                ref={animation}
                style={{
                    width: 400,
                    height: 400,
                }}
            ></LottieView>
        )
    }
}

export default ActivityIndicator


