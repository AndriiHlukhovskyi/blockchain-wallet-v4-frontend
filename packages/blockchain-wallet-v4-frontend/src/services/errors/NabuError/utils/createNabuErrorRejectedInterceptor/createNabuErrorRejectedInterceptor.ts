import NabuError from '../../NabuError'
import { isNabuErrorInNetworkResponse } from '../isNabuErrorInNetworkResponse'
import { CreateNabuErrorRejectedInterceptorUtility } from './createNabuErrorRejectedInterceptor.types'

const createNabuErrorRejectedInterceptor: CreateNabuErrorRejectedInterceptorUtility =
  () => (error) => {
    try {
      const { data } = error.response

      if (isNabuErrorInNetworkResponse(data)) {
        const nabuError = new NabuError(data.ux)

        return Promise.reject(nabuError)
      }

      return Promise.reject(error)
    } catch (parsingError) {
      console.error(parsingError)

      return Promise.reject(error)
    }
  }

export default createNabuErrorRejectedInterceptor
