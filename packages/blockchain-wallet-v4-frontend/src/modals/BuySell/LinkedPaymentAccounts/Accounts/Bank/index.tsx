import React, { ReactElement, useMemo } from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { fiatToString } from '@core/exchange/utils'
import { BSPaymentMethodType } from '@core/types'
import { DisplayContainer, DisplayIcon, MultiRowContainer } from 'components/BuySell'
import { Flex } from 'components/Flex'
import { Title, Value } from 'components/Flyout'
import { convertBaseToStandard } from 'data/components/exchange/services'
import { Coin } from 'middleware/analyticsMiddleware/types'

const StyledTitle = styled(Title)`
  text-transform: capitalize;
  color: ${(p) => p.theme.grey600};
  font-weight: 500;
  font-size: 14px;
`

const StyledValue = styled(Value)`
  color: ${(p) => p.theme.grey900};
  font-weight: 600;
  font-size: 16px;
`

type Props = {
  icon: ReactElement
  onClick: () => void
  text: string | ReactElement
  value: BSPaymentMethodType
}

const Bank = ({ icon, onClick, text, value }: Props) => {
  const limitAmount = useMemo(() => {
    const { limits } = value

    if (!limits) return null

    return fiatToString({
      unit: value.currency,
      value: convertBaseToStandard(Coin.FIAT, limits.max)
    })
  }, [value])

  return (
    <DisplayContainer
      data-e2e={`sb${value.type.toLowerCase()}Banks`}
      role='button'
      onClick={onClick}
    >
      <DisplayIcon>{icon}</DisplayIcon>
      <MultiRowContainer>
        <Flex justifyContent='space-between'>
          <StyledValue asTitle>{text}</StyledValue>

          {!!value.details && <StyledValue asTitle>***{value.details.accountNumber}</StyledValue>}
        </Flex>

        <Flex justifyContent='space-between'>
          <StyledTitle asValue>
            {limitAmount && (
              <FormattedMessage
                id='modals.simplebuy.band_item_with_limits'
                defaultMessage='{limitAmount} Limit'
                values={{
                  limitAmount
                }}
              />
            )}
          </StyledTitle>
          {!!value.details?.bankAccountType && (
            <StyledTitle asValue>{value.details?.bankAccountType?.toLowerCase()}</StyledTitle>
          )}
        </Flex>
      </MultiRowContainer>
    </DisplayContainer>
  )
}

export default Bank
