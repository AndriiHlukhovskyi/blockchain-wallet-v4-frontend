import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { DexChain, DexSwapQuote, DexToken } from '@core/network/api/dex'
import Remote from '@core/remote'

import { DexStateType } from './types'

const initialState: DexStateType = {
  chains: Remote.NotAsked,
  currentChain: Remote.NotAsked, // TODO: might not need Remote type
  currentChainTokens: Remote.NotAsked,
  isUserEligible: Remote.NotAsked,
  swapQuote: Remote.NotAsked
}

const dexSlice = createSlice({
  initialState,
  name: 'dex',
  reducers: {
    clearCurrentSwapQuote: (state) => {
      state.swapQuote = Remote.NotAsked
    },
    fetchChainAllTokens: (state, action: PayloadAction<{ search: string }>) => {},
    fetchChainAllTokensFailure: (state, action: PayloadAction<string>) => {
      state.currentChainTokens = Remote.Failure(action.payload)
    },
    fetchChainAllTokensLoading: (state) => {
      state.currentChainTokens = Remote.Loading
    },
    fetchChainAllTokensSuccess: (state, action: PayloadAction<DexToken[]>) => {
      state.currentChainTokens = Remote.Success(action.payload)
    },
    fetchChains: () => {},
    fetchChainsFailure: (state, action: PayloadAction<string>) => {
      state.chains = Remote.Failure(action.payload)
    },
    fetchChainsLoading: (state) => {
      state.chains = Remote.Loading
    },
    fetchChainsSuccess: (state, action: PayloadAction<DexChain[]>) => {
      state.chains = Remote.Success(action.payload)
    },
    fetchSwapQuoteFailure: (state, action: PayloadAction<string>) => {
      state.swapQuote = Remote.Failure(action.payload)
    },
    fetchSwapQuoteLoading: (state) => {
      state.swapQuote = Remote.Loading
    },
    fetchSwapQuoteSuccess: (state, action: PayloadAction<DexSwapQuote>) => {
      state.swapQuote = Remote.Success(action.payload)
    },
    fetchUserEligibility: () => {},
    fetchUserEligibilityFailure: (state, action: PayloadAction<string>) => {
      state.isUserEligible = Remote.Failure(action.payload)
    },
    fetchUserEligibilityLoading: (state) => {
      state.isUserEligible = Remote.Loading
    },
    fetchUserEligibilitySuccess: (state, action: PayloadAction<boolean>) => {
      state.isUserEligible = Remote.Success(action.payload)
    },
    setCurrentChain: (state, action: PayloadAction<DexChain>) => {
      state.currentChain = Remote.Success(action.payload)
    }
  }
})

export const { actions } = dexSlice
export const dexReducer = dexSlice.reducer
