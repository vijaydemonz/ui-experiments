/** @format */

import React, { Component } from "react";
import { PanResponder, View } from "react-native";
import Svg, {
  Path,
  Circle,
  G,
  Text,
  // feOffset,
  // feBlend,
} from "react-native-svg";

class CircularSlider extends Component {
  constructor(props) {
    super(props);
    this.handlePanResponderMove = this.handlePanResponderMove.bind(this);
    this.cartesianToPolar = this.cartesianToPolar.bind(this);
    this.polarToCartesian = this.polarToCartesian.bind(this);
    const { width, height } = props;
    const smallestSide = Math.min(width, height);
    this.state = {
      cx: width / 2,
      cy: height / 2,
      r: (smallestSide / 2) * 0.85,
    };
  }
  componentWillMount = () => {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: this.handlePanResponderMove,
    });
  };
  polarToCartesian(angle) {
    const { cx, cy, r } = this.state,
      a = ((angle - 270) * Math.PI) / 180.0,
      x = cx + r * Math.cos(a),
      y = cy + r * Math.sin(a);
    return { x, y };
  }
  cartesianToPolar(x, y) {
    const { cx, cy } = this.state;
    return Math.round(
      Math.atan((y - cy) / (x - cx)) / (Math.PI / 180) + (x > cx ? 270 : 90)
    );
  }
  handlePanResponderMove({ nativeEvent: { locationX, locationY } }) {
    this.props.onValueChange(this.cartesianToPolar(locationX, locationY));
  }
  render() {
    const {
        width,
        height,
        value,
        meterColor,
        textColor,
        onValueChange,
      } = this.props,
      { cx, cy, r } = this.state,
      startCoord = this.polarToCartesian(0),
      endCoord = this.polarToCartesian(value);
    return (
      <Svg
        onLayout={this.onLayout}
        viewBox={"0 0 " + width + " " + height}
        width={width}
        height={height}>
        {/* <defs>
          <filter id='f1' x='0' y='0' width='100%' height='100%'>
            <feOffset result='offOut' in='SourceGraphic' dx='20' dy='20' />
            <feBlend in='SourceGraphic' in2='offOut' mode='normal' />
          </filter>
        </defs> */}
        <Circle
          cx={cx}
          cy={cy}
          r={r}
          stroke='#eee'
          strokeWidth={0.5}
          fill='transparent'
          opacity={0.3}
        />
        <Path
          stroke={meterColor}
          strokeWidth={5}
          fill='none'
          d={`M${startCoord.x} ${startCoord.y} A ${r} ${r} 0 ${
            value > 180 ? 1 : 0
          } 1 ${endCoord.x} ${endCoord.y}`}
        />

        <G x={endCoord.x - 7.5} y={endCoord.y - 7.5}>
          <Circle
            cx={7.5}
            cy={7.5}
            r={20}
            // strokeWidth={20}
            fill={"#E8E8EF"}
            // id={"url(#f1)"}
            {...this._panResponder.panHandlers}
          />
          {/* <View
            style={{ width: 200, height: 200, backgroundColor: "gold" }}
            {...this._panResponder.panHandlers}
          /> */}
          <Text
            key={value + ""}
            x={10}
            y={10}
            fontSize={10}
            fill={textColor}
            textAnchor='middle'>
            {value + ""}
          </Text>
        </G>
      </Svg>
    );
  }
}

export default CircularSlider;
// export default function CircleSlider({
//   width,
//   height,
//   value,
//   meterColor,
//   textColor,
//   onValueChange,
// }) {
//   const smallestSide = Math.min(width, height);

//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onMoveShouldSetPanResponder: () => true,
//       onPanResponderMove: handlePanResponderMove,
//     })
//   ).current;

//   const [cx, setcx] = useState(width / 2);
//   const [cy, setcy] = useState(height / 2);
//   const [r, setr] = useState((smallestSide / 2) * 0.85);
//   const onLayout = useRef(0).current;
//   let a = 0;
//   let x = 0;
//   let y = 0;
//   const polarToCartesian = (angle: any) => {
//     (a = ((angle - 270) * Math.PI) / 180.0),
//       (x = cx + r * Math.cos(a)),
//       (y = cy + r * Math.sin(a));
//     return { x, y };
//   };

//   const cartesianToPolar = (x, y): number => {
//     return Math.round(
//       Math.atan((y - cy) / (x - cx)) / (Math.PI / 180) + (x > cx ? 270 : 90)
//     );
//   };
//   const handlePanResponderMove = ({
//     nativeEvent: { locationX, locationY },
//   }) => {
//     props.onValueChange(cartesianToPolar(locationX, locationY));
//   };

//   const startCoord = polarToCartesian(0);
//   const endCoord = polarToCartesian(value);

//   return (
//     <Svg width={width} height={height}>
//       <Circle
//         cx={cx}
//         cy={cy}
//         r={r}
//         stroke='#eee'
//         strokeWidth={0.5}
//         fill='none'
//       />
//       <Path
//         stroke={meterColor}
//         strokeWidth={5}
//         fill='none'
//         d={`M${startCoord.x} ${startCoord.y} A ${r} ${r} 0 ${
//           value > 180 ? 1 : 0
//         } 1 ${endCoord.x} ${endCoord.y}`}
//       />
//       <G x={endCoord.x - 7.5} y={endCoord.y - 7.5}>
//         <Circle
//           cx={7.5}
//           cy={7.5}
//           r={10}
//           fill={meterColor}
//           {...panResponder.panHandlers}
//         />
//         <Text
//           key={value + ""}
//           x={7.5}
//           y={1}
//           fontSize={10}
//           fill={textColor}
//           textAnchor='middle'>
//           {value + ""}
//         </Text>
//       </G>
//     </Svg>
//   );
// }
