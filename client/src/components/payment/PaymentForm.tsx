import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface PaymentFormProps {
  amount: number;
  onSuccess: (transactionId: string) => void;
  onError: (error: Error) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency: 'XOF',
          customer: {
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname
          }
        })
      });

      const data = await response.json();
      
      if (data.token) {
        // Initialiser le widget FedaPay
        FedaPay.init({
          public_key: process.env.REACT_APP_FEDAPAY_PUBLIC_KEY
        });
        
        FedaPay.open({
          transaction_id: data.transaction_id,
          container: '#payment-container',
          onSuccess: (transaction: any) => {
            onSuccess(transaction.id);
          },
          onError: (error: Error) => {
            onError(error);
          },
          onClose: () => {
            setLoading(false);
          }
        });
      }
    } catch (error) {
      onError(error as Error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Paiement</h2>
      <div className="mb-4">
        <p className="text-gray-600">Montant à payer:</p>
        <p className="text-2xl font-bold">{amount.toLocaleString('fr-FR')} FCFA</p>
      </div>
      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? 'Traitement en cours...' : 'Payer maintenant'}
      </button>
      <div id="payment-container" className="mt-4"></div>
    </div>
  );
};

export default PaymentForm;