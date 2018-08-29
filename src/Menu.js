import React from 'react'
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'
import ViewPropTypes from './ViewPropTypes'

export default class Menu extends React.PureComponent {

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      onPress: PropTypes.func
    })).isRequired,
    top: PropTypes.number,
    right: PropTypes.number,
    left: PropTypes.number,
    visible: PropTypes.bool,
    arrowPosition: PropTypes.oneOf(['topRight', 'topLeft', 'topCenter']),
    onVisible: PropTypes.func.isRequired,
    contentStyle: ViewPropTypes.style,
  }

  static defaultProps = {
    top: 74,
    arrowPosition: 'topRight',
    contentStyle: {
      backgroundColor: '#4A4A4A',
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: props.visible
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible
    })
  }

  dismiss = () => {
    this.setState({
      visible: false
    })
    this.props.onVisible(false)
  }

  renderItem = (item, index) => {
    return (
      <View key={index} style={styles.item}>
        <TouchableOpacity
          style={{ flexDirection: 'row' }}
          onPress={() => {
            item.onPress && item.onPress()
            this.dismiss()
          }}>
          <View style={{ flex: 1 }} />
          <Text style={styles.text}>
            {item.title}
          </Text>
          <View style={{ flex: 1 }} />
        </TouchableOpacity>
        {
          (index == (this.props.data.length - 1)) ? null :
            <View style={styles.separator} />
        }
      </View>
    )
  }

  renderContent = () => {
    const { data, arrowPosition, left, contentStyle } = this.props
    let { top, right } = this.props
    if (!right && !left) {
      right = 12
    }

    const arrowSize = 10
    let arrowLeft = undefined
    if (this.state.itemLayout) {
      switch (arrowPosition) {
        case 'topRight':
          arrowLeft = this.state.itemLayout.x + this.state.itemLayout.width - arrowSize - 8
          break
        case 'topLeft':
          arrowLeft = this.state.itemLayout.x + 8
          break
        case 'topCenter':
          arrowLeft = this.state.itemLayout.x + this.state.itemLayout.width / 2.0 - arrowSize / 2.0
          break
      }
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.arrow, {
          position: 'absolute',
          top: top - arrowSize,
          left: arrowLeft,
          borderBottomColor: contentStyle.backgroundColor,
        }]} />
        <View style={[styles.content, contentStyle, { top, right, left }]}
              onLayout={({ nativeEvent: { layout } }) => {
                this.setState({ itemLayout: layout })
              }}>
          {
            data.map((v, index, array) => (
              this.renderItem(v, index)
            ))
          }
        </View>
      </View>
    )
  }

  render() {
    return (
      <Modal
        animationType='fade'
        transparent={true}
        visible={this.state.visible}
        onRequestClose={this.dismiss}>
        <TouchableWithoutFeedback
          onPress={this.dismiss}>
          {this.renderContent()}
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    borderRadius: 2,
    alignItems: 'center',
    overflow: 'hidden'
  },
  item: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  separator: {
    position: 'absolute',
    height: 0.5,
    left: 6,
    right: 6,
    bottom: 0,
    backgroundColor: '#666666'
  },
  text: {
    fontSize: 13,
    color: '#FFFFFF',
    paddingHorizontal: 19,
    paddingVertical: 11,
  },
  arrow: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderBottomWidth: 7,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 3,
    borderTopColor: '#f000',//下箭头颜色
    borderLeftColor: '#0f00',//右箭头颜色
    borderRightColor: '#00f0'//左箭头颜色
  }
})