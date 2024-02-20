import type { OptimalRate, OptionalRate } from '@paraswap/core';
import { Primitive, assert } from 'ts-essentials';
import { SwapSide } from '@paraswap/core';
import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
const axios = require('axios');
// const ethers = require("ethers")

interface FetcherInputBase<URL extends string = string> { url: URL;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

export interface FetcherPostInput<URL extends string = string>
  extends FetcherInputBase<URL> {
  method: 'POST';
  data: Record<string, any>;
}

export interface TransactionParams {
  to: string;
  from: string;
  value: string;
  data: string;
  gasPrice: string;
  gas?: string;
  chainId: number;
}

export type WithGasPrice = {
  gasPrice: string;
};
export type WithMaxFee = {
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
};

export type BuildOptionsBase = {
  /** @description Allows the API to skip performing onchain checks such as balances, allowances, as well as transaction simulations. The response does not contain `gas` parameter when set to `true` */
  ignoreChecks?: boolean;
  /** @description Allows the API to skip gas checks. The response does not contain `gas` parameter when set to `true` */
  ignoreGasEstimate?: boolean;
  /** @description Allows the API to skip performing onchain allowance checks. */
  ignoreAllowance?: boolean;
  /** @description Allows the API to return the contract parameters only. */
  onlyParams?: boolean;
};

export type BuildOptionsWithGasPrice = BuildOptionsBase & Partial<WithGasPrice>;
export type BuildOptionsWitWithMaxFee = BuildOptionsBase & Partial<WithMaxFee>;

export type BuildOptions = BuildOptionsWithGasPrice | BuildOptionsWitWithMaxFee;

/**
 * @type hex token or account address
 */
export type Address = string;
/**
 * @type number in string form
 */
export type PriceString = string;

export type BuildTxInputBase = {
  srcToken: Address;
  destToken: Address;
  userAddress: Address;
  /** @description used with referral link */
  referrer?: string;
  partner?: string;
  partnerAddress?: string;
  partnerFeeBps?: number;
  /** @deprecated Use "takeSurplus" instead. Positive slippage goes to user, true by default */
  positiveSlippageToUser?: boolean;
  /** @description Set to true to take positive slippage. Default: false */
  takeSurplus?: boolean;
  receiver?: Address;
  srcDecimals?: number;
  destDecimals?: number;
  permit?: string;
  deadline?: string;
};

// when priceRoute with side=SELL, slippage can replace destAmount
export type TxInputAmountsPartSell = {
  slippage: number;
  srcAmount: PriceString;
  destAmount?: never; // disallowed
};

// when priceRoute with side=BUY, slippage can replace srcAmount
export type TxInputAmountsPartBuy = {
  slippage: number;
  srcAmount?: never; // disallowed
  destAmount: PriceString;
};
// both srcAmount and destAmount can be present in absence of slippage
export type TxInputAmountsPartBuyOrSell = {
  slippage?: never; // disallowed
  srcAmount: PriceString;
  destAmount: PriceString;
};

// for Swap transaction
export type BuildSwapTxInput = BuildTxInputBase & {
  priceRoute: OptimalRate;
} & (
    | TxInputAmountsPartSell
    | TxInputAmountsPartBuy
    | TxInputAmountsPartBuyOrSell
  ); // this union doesn't allow to mix srcAmount & destAmount & slippage together

export type BuildTxInput =
  | BuildSwapTxInput


type BuildTx = (
  params: BuildTxInput,
  options?: BuildOptions,
  signal?: AbortSignal
) => Promise<TransactionParams>;


export type BuildTxFunctions = {
  buildTx: BuildTx;
};

type SearchStringParams = BuildOptions;

interface AreAmountsCorrectInput {
  queryParams: { srcAmount?: string; destAmount?: string; slippage?: number };
  side: SwapSide;
  priceRoute: OptimalRate;
}

function areAmountsCorrect({
  queryParams,
  side,
  priceRoute,
}: AreAmountsCorrectInput): boolean {
  // return early after a simpler check if the user was swapping before filling
  if (queryParams.slippage) {
    return (
      (side === SwapSide.BUY &&
        queryParams.destAmount === priceRoute.destAmount) ||
      (side === SwapSide.SELL && queryParams.srcAmount === priceRoute.srcAmount)
    );
  }

  // provided amounts match the previously queried price route
  const [inputAmount, priceRouteAmount] =
    side === SwapSide.SELL
      ? [queryParams.srcAmount, priceRoute.srcAmount]
      : [queryParams.destAmount, priceRoute.destAmount];

  return inputAmount === priceRouteAmount;
}

export const constructSearchString = <U extends Record<string, Primitive>>(
  queryOptions: U
): `?${string}` | '' => {
  const queryEntries = objectToFilledEntries(queryOptions);

  const queryString = new URLSearchParams(queryEntries).toString();

  // returns empty string or `?${string}`
  return queryString && `?${queryString}`;
};

export const objectToFilledEntries = <T extends Record<string, unknown>>(
  object: T
): [string, string][] => {
  return (
    Object.entries(object)
      // removes keys with undefined values
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, String(value)])
  );
};

const main = async () => {
  // const provider = new ethers.providers.JsonRpcProvider("https://rpc-mainnet.matic.quiknode.pro");

  const srcToken = "0xc2132d05d31c914a87c6611c10748aeb04b58e8f";
  const destToken = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  const side = "SELL"; // "BUY"
  const chainId = "137";
  const API_URL = 'https://apiv5.paraswap.io';

  const res = await axios.get(`https://apiv5.paraswap.io/prices/?srcToken=${srcToken}&destToken=${destToken}&amount=1000000&srcDecimals=18&destDecimals=18&side=${side}&network=${chainId}&otherExchangePrices=true&partner=partner=paraswap.io`);

  const priceRoute = res.data.priceRoute;
  const { bestRoute, others, destAmount, srcAmount } = priceRoute;

  // NOTE ====
  // destAmount => Amount output of the best route
  // bestRoute -> first route that will be displayed in paraswap screen

  const swapExchanges = bestRoute[0].swaps[0].swapExchanges;
  console.log("swapExchanges: ", destAmount, srcAmount); // I

  const transactionsURL = `${API_URL}/transactions/${chainId}`;

  //@ts-ignore
  const buildTx: BuildTx = async (params, options = {}, signal) => {
    if (
      'priceRoute' in params &&
      'destAmount' in params && // isn't provided together with `orders`
      !('orders' in params) // when present, destAmount becomes sum(orders[].makerAmount)
    ) {
      const {
        priceRoute,
        priceRoute: { side },
      } = params;
      const AmountMismatchError =
        side === SwapSide.SELL
          ? 'Source Amount Mismatch'
          : 'Destination Amount Mismatch';

      // user provides srcAmount or slippage but not both. so we only validate accordingly.
      assert(
        areAmountsCorrect({
          queryParams: params,
          side,
          priceRoute,
        }),
        AmountMismatchError
      );
    }

    // always pass explicit type to make sure UrlSearchParams are correct
    const search = constructSearchString<SearchStringParams>(options);

    const fetchURL = `${transactionsURL}/${search}`;

    const sanitizedParams = params;

    const takeSurplus =
      params.takeSurplus ??
      (params.positiveSlippageToUser !== undefined
        ? !params.positiveSlippageToUser
        : undefined);

    if ('positiveSlippageToUser' in sanitizedParams) {
      // positiveSlippageToUser & takeSurplus together will Error in API
      delete sanitizedParams.positiveSlippageToUser;
    }
    if (takeSurplus !== undefined) {
      sanitizedParams.takeSurplus = takeSurplus;
    }

    const fetchParams: FetcherPostInput = {
      url: fetchURL,
      method: 'POST',
      data: sanitizedParams,
      signal,
    };

    const builtTx = (
      await axios({
        method: 'post',
        url: fetchParams.url,
        data: fetchParams.data
      })
    );

    return { ...builtTx.data };
  }

  const provider = new ethers.providers.JsonRpcProvider("https://polygon.blockpi.network/v1/rpc/public")
  const signer = new ethers.Wallet('', provider);

  const txParams = await buildTx(
    {
      srcToken,
      destToken,
      srcAmount,
      destAmount,
      priceRoute,
      userAddress: "0xdd58C634D8b4D17564Eac40d356f475Ee100820E",
      partner: "paraswap.io",
    }
  );

  console.log("txParams: ", txParams);

  // delete txParams["gas"];

  // const transaction = {
  //   ...txParams,
  //   gasPrice: '0x' + new BigNumber(txParams.gasPrice).toString(16),
  //   gasLimit: '0x' + new BigNumber(5000000).toString(16),
  //   value: '0x' + new BigNumber(txParams.value).toString(16),
  // };

  // tx approve: https://polygonscan.com/tx/0xe1a97f3c092c85e9992a9791252fc7f6136abf6e702b80db34c41948d2e47992

  // const txr = await signer.sendTransaction(transaction);
  // console.log("txr: ", txr);
}
/* 2 cases
- If user input amount in the output field -> side will by BUY, amount will be `srcAmount`
- If user input amount in the input field -> side will by SELL, amount will be `destAmount`
*/

main();

