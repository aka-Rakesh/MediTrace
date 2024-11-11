import { Connex } from '@vechain/connex';
import { ABI } from '../contracts/abi';

const CONTRACT_ADDRESS = '0xaA243b7Bd8E703c91fAC7ed65C4B8468a0bE8872';

export const connex = new Connex({
  node: 'https://vethor-node-test.vechaindev.com',
  network: 'test'
});

export class VeChainService {
  private contract: any;
  private userAddress: string | null = null;

  constructor() {
    this.contract = connex.thor.account(CONTRACT_ADDRESS);
  }

  async connectWallet(): Promise<string> {
    const message = {
      purpose: 'identification',
      payload: {
        type: 'text',
        content: 'Sign this certificate to prove your identity'
      }
    };

    const certResponse = await connex.vendor.sign('cert', message).request();
    this.userAddress = certResponse.annex.signer;
    return this.userAddress;
  }

  async addEntity(address: string, name: string, role: number) {
    if (!this.userAddress) throw new Error('Wallet not connected');
    
    const abiMethod = ABI.find(({ name }) => name === 'addEntity');
    if (!abiMethod) throw new Error('Method not found');

    const clause = this.contract.method(abiMethod).asClause(address, name, role);
    return await connex.vendor
      .sign('tx', [clause])
      .comment('Adding new entity')
      .request();
  }

  async authorizeEntity(address: string, authorized: boolean) {
    if (!this.userAddress) throw new Error('Wallet not connected');
    
    const abiMethod = ABI.find(({ name }) => name === 'authorizeEntity');
    if (!abiMethod) throw new Error('Method not found');

    const clause = this.contract.method(abiMethod).asClause(address, authorized);
    return await connex.vendor
      .sign('tx', [clause])
      .comment('Authorizing entity')
      .request();
  }

  async createProduct(name: string) {
    if (!this.userAddress) throw new Error('Wallet not connected');
    
    const abiMethod = ABI.find(({ name }) => name === 'createProduct');
    if (!abiMethod) throw new Error('Method not found');

    const clause = this.contract.method(abiMethod).asClause(name);
    return await connex.vendor
      .sign('tx', [clause])
      .comment('Creating new product')
      .request();
  }

  async updateProductStatus(productId: number, status: number) {
    if (!this.userAddress) throw new Error('Wallet not connected');
    
    const abiMethod = ABI.find(({ name }) => name === 'updateProductStatus');
    if (!abiMethod) throw new Error('Method not found');

    const clause = this.contract.method(abiMethod).asClause(productId, status);
    return await connex.vendor
      .sign('tx', [clause])
      .comment('Updating product status')
      .request();
  }

  async transferProduct(productId: number, newHolder: string) {
    if (!this.userAddress) throw new Error('Wallet not connected');
    
    const abiMethod = ABI.find(({ name }) => name === 'transferProduct');
    if (!abiMethod) throw new Error('Method not found');

    const clause = this.contract.method(abiMethod).asClause(productId, newHolder);
    return await connex.vendor
      .sign('tx', [clause])
      .comment('Transferring product ownership')
      .request();
  }

  async verifyProduct(productId: number) {
    const abiMethod = ABI.find(({ name }) => name === 'verifyProduct');
    if (!abiMethod) throw new Error('Method not found');

    const result = await this.contract.method(abiMethod).call(productId);
    return result.decoded[0];
  }

  getUserAddress(): string | null {
    return this.userAddress;
  }
}