import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, useNavigate } from 'react-router-dom'

import { CoinfigType, CoinType } from '@core/types'
import { actions, selectors } from 'data'

import Loading from '../Auth/template.loading'
import DexTemplate from './DexTemplate'

export type Props = {
  coin?: CoinType
  coinfig?: CoinfigType
  component: React.ComponentType<any>
  computedMatch?: any
  exact?: boolean
  pageTitle?: string
  path: string
}

const DexLayout = (props) => {
  const { component: Component, pageTitle, path, ...rest } = props
  if (pageTitle) document.title = pageTitle

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isAuthenticated = useSelector(selectors.auth.isAuthenticated)
  const isCoinDataLoaded = useSelector(selectors.core.data.coins.getIsCoinDataLoaded)

  const isValidRoute = ['/dex'].includes(path)

  useEffect(() => {
    if (isCoinDataLoaded) {
      dispatch(actions.core.data.coins.fetchCoinsRates())
    }
  }, [isCoinDataLoaded])

  useEffect(() => {
    if (!isAuthenticated || !isValidRoute) {
      navigate('/login')
    }
  })

  // IMPORTANT: do not allow routes to load until window.coins is loaded
  if (!isCoinDataLoaded) return <Loading />

  return (
    <DexTemplate {...props}>
      <Component {...rest} />
    </DexTemplate>
  )
}

export default DexLayout
