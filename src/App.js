import React, { Component } from 'react';
import { Motion, StaggeredMotion, spring } from 'react-motion';
import styled from 'styled-components';
import Color from 'color';
import { connect } from 'react-redux';
// import store from './store';


const Box = styled.div`
  width: 200px;
  height: 200px;
  background-color: red;
`;

const params = {stiffness: 60, damping: 31}

const AnimationMotion = () => (
  <Motion defaultStyle={{x:500, y: 400, s: 2, o: 0}} style={{x: spring(100, {}), s: spring(1, params), y: spring(100, params), o: spring(1, params)}}>
    {obj => {
      let style = {
        transform: `translate(${obj.y}px, ${obj.x}px) scale(${obj.s})`,
        opacity: obj.o,
      }
      return <Box style={style}></Box>
    }}
  </Motion>
);


const aqua = Color('#00FFFF');
const aquaShadow = aqua.darken(0.4).alpha(0.75);

const deepSkyBlue = Color('#00BFFF');
const deepSkyBlueShadow = deepSkyBlue.darken(0.45).alpha(0.7);

const aquamarine = Color('#7FFFD4');
const aquamarineShadow = aquamarine.darken(0.45).alpha(0.8);

const midnightBlue = Color('#191970');
const midnightBlueShadow = midnightBlue.darken(0.45).alpha(0.7);

const dodgerBlue = Color('#1E90FF');
const dodgerBlueShadow = dodgerBlue.darken(0.5).alpha(0.7);

const blues = {
  '0': ['Aquamarine', aquamarine, aquamarineShadow],
  '1': ['Aqua', aqua, aquaShadow],
  '2': ['Deep Sky Blue', deepSkyBlue, deepSkyBlueShadow],
  '3': ['Dodger Blue', dodgerBlue, dodgerBlueShadow],
  '4': ['Midnight Blue', midnightBlue, midnightBlueShadow],
}

const Bar = styled.div.attrs({
  backgroundColor: props => props.bg,
  boxShadow: props => props.bs
})`
  margin-bottom: 10px;
  overflow: hidden;
  background-color: ${props => props.backgroundColor};
  box-shadow: 1px 1px 2px ${props => props.boxShadow};
  font-family: sans-serif;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  color: White;
  font-weight: bold;
`;

const BarTitle = styled.h2`
  font-size: 1.75em;
  padding: 0.25em 0;
  white-space: pre;
  font-family: 'Cabin', sans-serif;
  @media(max-width: 450px) {
    font-size: 1em;
  }
`;

const AnimationStaggered3 = () => (
  <StaggeredMotion
    defaultStyles={[{w: 0 }, {w: 0}, {w: 0}, {w: 0}, {w: 0}]}
    styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => (
      i === 0
        ? {w: spring(100, params)}
        : {w: spring(prevInterpolatedStyles[i - 1].w)}
    ))}>
    {interpolatingStyles =>
      <div>
        {interpolatingStyles.map((style, i) =>
          <Bar bg={(blues[i][1]).string()}
            bs={(blues[i][2]).string()} key={i.toString()} style={{width:`${style.w}%`}}><BarTitle>{blues[i][0]} Bar</BarTitle></Bar>)
        }
      </div>
    }
  </StaggeredMotion>
);


const Wrapper = styled.div`
  padding: 50px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  border: none;
  letter-spacing: 0.1em;
  border-radius: 5px;
  box-shadow: 1px 1px 2px ${aquaShadow.string()};
  font-size: 1.25em;
  padding: 0.25em 0.5em;
  color: white;
  font-family: 'Cabin', sans-serif;
  font-weight: bold;
  background-color: ${aqua.string()};
  transition: box-shadow 0.22s;
  &:hover {
    box-shadow: none;
  }
`;

const ClippedText = styled.h1`
  margin: 0;
  font-family: 'Cabin', sans-serif;
  letter-spacing: 0.05em;
  font-weight: bold;
  font-size: 6em;
  line-height: 1.5;
  background-image: linear-gradient(
    ${blues['0'][1].string()} 30%, ${blues['1'][1].string()}, ${blues['2'][1].string()}, ${blues['3'][1].string()}, ${blues['4'][1].string()} 82%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: black;
`;

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       show: true
//     };
//   }
//
//   handleShow = () => {
//     this.setState(prevState => ({
//       show: !prevState.show,
//     }));
//     setTimeout(this.callbackShow, 500)
//   };
//
//   callbackShow = () => (
//     this.setState(prevState => ({show: !prevState.show}))
//   );
//
//   render() {
//     return (
//       <Wrapper>
//         <Header>
//           <ClippedText>Blue Bars</ClippedText>
//           <Button type="button" onClick={this.handleShow}>repeat</Button>
//         </Header>
//         {this.state.show && <AnimationStaggered3 />}
//       </Wrapper>
//     )
//   }
// }
class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  handleShow = () => {
    this.props.dispatch({
      type: 'TOGGLE',
    });
    setTimeout(() =>  this.props.dispatch({
        type: 'TOGGLE',
      }), 500)
  };


  render() {
    return (
      <Wrapper>
        <Header>
          <ClippedText>Blue Bars</ClippedText>
          <Button type="button" onClick={this.handleShow}>repeat</Button>
        </Header>
        {this.props.show && <AnimationStaggered3 />}
      </Wrapper>
    )
  }
}

const mapStateToProps = store => ({show: store.show})

export default connect(mapStateToProps)(App);
