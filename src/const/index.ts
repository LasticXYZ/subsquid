const IDX_CHAIN: string="kusama"

export function getChainConfig() {
    switch (IDX_CHAIN) {
        case 'rococo':
            return {
                url: 'wss://rococo-coretime-rpc.polkadot.io',
                rateLimit: 300,
                prefix: 42
            }
        case 'kusama':
            return {
                url: 'wss://kusama-coretime-rpc.polkadot.io',
                rateLimit: 300,
                prefix: 2
            }
        case 'polkadot':
            return {
                url: 'wss://polkadot-coretime-rpc.polkadot.io',
                rateLimit: 300,
                prefix: 0
            }
        default:
            throw new Error('IDX_CHAIN not set')
    }
}