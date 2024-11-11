import { useState, useEffect, useCallback } from 'react';
import { VeChainService } from '../lib/vechain';
import type { SupplyItem, Transaction } from '../types';

const vechain = new VeChainService();

export function useVeChain() {
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const address = vechain.getUserAddress();
    if (address) setUserAddress(address);
  }, []);

  const connectWallet = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const address = await vechain.connectWallet();
      setUserAddress(address);
      return address;
    } catch (err) {
      setError('Failed to connect wallet');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addEntity = useCallback(async (address: string, name: string, role: number) => {
    if (!userAddress) throw new Error('Wallet not connected');
    setLoading(true);
    try {
      return await vechain.addEntity(address, name, role);
    } catch (err) {
      setError('Failed to add entity');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [userAddress]);

  const authorizeEntity = useCallback(async (address: string, authorized: boolean) => {
    if (!userAddress) throw new Error('Wallet not connected');
    setLoading(true);
    try {
      return await vechain.authorizeEntity(address, authorized);
    } catch (err) {
      setError('Failed to authorize entity');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [userAddress]);

  const createProduct = useCallback(async (name: string) => {
    if (!userAddress) throw new Error('Wallet not connected');
    setLoading(true);
    try {
      return await vechain.createProduct(name);
    } catch (err) {
      setError('Failed to create product');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [userAddress]);

  const updateStatus = useCallback(async (productId: number, status: number) => {
    if (!userAddress) throw new Error('Wallet not connected');
    setLoading(true);
    try {
      return await vechain.updateProductStatus(productId, status);
    } catch (err) {
      setError('Failed to update status');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [userAddress]);

  const transferProduct = useCallback(async (productId: number, newHolder: string) => {
    if (!userAddress) throw new Error('Wallet not connected');
    setLoading(true);
    try {
      return await vechain.transferProduct(productId, newHolder);
    } catch (err) {
      setError('Failed to transfer product');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [userAddress]);

  const verifyProduct = useCallback(async (productId: number): Promise<SupplyItem> => {
    setLoading(true);
    try {
      const product = await vechain.verifyProduct(productId);
      return {
        id: product.id.toString(),
        name: product.name,
        batchNumber: `BATCH-${product.id}`,
        manufacturer: product.currentHolder,
        manufacturingDate: new Date(Number(product.timestamp) * 1000).toISOString(),
        expiryDate: new Date(Number(product.timestamp) * 1000 + 31536000000).toISOString(),
        currentLocation: product.currentHolder,
        status: ['manufactured', 'in-transit', 'delivered', 'verified'][Number(product.status)],
        temperature: 0,
        humidity: 0,
        transactions: []
      };
    } catch (err) {
      setError('Failed to verify product');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    userAddress,
    loading,
    error,
    connectWallet,
    addEntity,
    authorizeEntity,
    createProduct,
    updateStatus,
    transferProduct,
    verifyProduct
  };
}