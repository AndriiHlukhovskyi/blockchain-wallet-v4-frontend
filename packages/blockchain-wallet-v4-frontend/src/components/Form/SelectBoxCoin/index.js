import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { pathOr } from 'ramda'

import { selectors } from 'data'
import SelectBox from '../SelectBox'
import { Icon, Text } from 'blockchain-info-components'
import { getCoins } from './selectors'

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  text-overflow: ellipsis;

  & > * {
    margin-left: 5px;
  }
  & > :first-child {
    margin-right: 5px;
  }
`

class SelectBoxCoin extends React.PureComponent {
  renderItem = props => {
    const { supportedCoins } = this.props
    const { value, text, ...rest } = props
    return (
      <HeaderWrapper {...rest}>
        <Icon
          name={pathOr('', [value, 'icons', 'circle'], supportedCoins)}
          size='22px'
          weight={300}
        />
        <Text size='14px' weight={300} cursor='pointer' data-e2e=''>
          {text}
        </Text>
      </HeaderWrapper>
    )
  }
  renderDisplay = (props, children) => {
    const { supportedCoins } = this.props
    const { value, ...rest } = props
    const e2eTag = value
      ? value.toLowerCase() + 'CurrencyOption'
      : 'currencyOption'
    return (
      <HeaderWrapper {...rest}>
        <Icon
          name={pathOr('', [value, 'icons', 'circle'], supportedCoins)}
          size='22px'
          weight={300}
        />
        <Text size='14px' weight={300} cursor='pointer' data-e2e={e2eTag}>
          {children}
        </Text>
      </HeaderWrapper>
    )
  }
  render () {
    const { coins, supportedCoins, ...rest } = this.props
    const elements = [{ group: '', items: coins }]
    return (
      <SelectBox
        supportedCoins={supportedCoins}
        elements={elements}
        templateDisplay={this.renderDisplay}
        templateItem={this.renderItem}
        {...rest}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  coins: getCoins(state, ownProps),
  supportedCoins: selectors.core.walletOptions
    .getSupportedCoins(state)
    .getOrFail()
})

export default connect(mapStateToProps)(SelectBoxCoin)
