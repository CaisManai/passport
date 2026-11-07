// Re-export of the compiled contract modules. Keeping the generated-module
// imports in one place means every test shares a single import path.

import type { ContractState } from '@midnight-ntwrk/compact-runtime';
import type { ContractStateRead } from '@midnight-ntwrk/midnight-js-types';
import { deserializeLedger9CompactContractState } from '@midnight-ntwrk/midnight-js-utils';

import * as AccountModule from '../../contracts/managed/account/contract/index.js';
import type { Ledger } from '../../contracts/managed/account/contract/index.js';

export const { Contract, ledger, pureCircuits } = AccountModule;
export type { Ledger };

/**
 * The compact-runtime `ContractState` behind a public-data read. midnight-js 5.0.0's `queryContractState`
 * answers a record whose `contractState` is the serialized state tagged by ledger era (a
 * `SerializedContractState`), not the runtime class the generated `ledger()` reader takes; this is the
 * one conversion every ledger read in this package goes through.
 */
export function compactStateOf(read: ContractStateRead | null | undefined, address: string): ContractState {
  if (!read) throw new Error(`no contract state found at ${address}`);
  return deserializeLedger9CompactContractState(read.contractState.serialize(), {
    caller: 'midnight-account-custody:compactStateOf',
    details: { address },
  });
}
export type { Witnesses, PureCircuits } from '../../contracts/managed/account/contract/index.js';

/** JubJub point as the generated code represents it: affine coordinates. */
export type { JubjubPoint } from '@midnight-ntwrk/compact-runtime';

/** secp256k1 point as the generated code represents it: affine coordinates
 *  plus an identity flag, which is false for every real device key. */
export type { Secp256k1Point } from '@midnight-ntwrk/compact-runtime';
export type { Secp256r1Point } from '@midnight-ntwrk/compact-runtime';

/** The generated shape of a shielded coin (circuit argument / return). */
export interface ShieldedCoin {
  nonce: Uint8Array;
  color: Uint8Array;
  value: bigint;
}

/** The generated shape of a qualified coin (witness return). */
export interface QualifiedCoin extends ShieldedCoin {
  mt_index: bigint;
}

/** The generated shapes of a grant record and its immutable scope
 *  (scoped-grants MIP section 4.1), as `ledger(...).grants.lookup` returns them. */
export type { GrantRecord, GrantScope } from '../../contracts/managed/account/contract/index.js';
