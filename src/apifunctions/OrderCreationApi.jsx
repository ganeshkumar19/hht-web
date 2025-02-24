import axios from "axios";
import { toast } from "react-toastify";

export const updateCart = async (cartId, paymentDetails, accessToken) => {
    try {
      const cartResponse = await axios.put(
        `${import.meta.env.VITE_BASE_API_URL}/merchant/cart/${cartId}`,
        paymentDetails,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Send access token in the header
          },
        }
      );
      return cartResponse;
    } catch (error) {
      throw new Error('Failed to update cart. Please try again.');
    }
};

export const placeOrder = async (orderDetails, accessToken) => {
    try {
      const orderResponse = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/merchant/order/placeorder`,
        orderDetails,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return orderResponse;
    } catch (error) {
      throw new Error('Failed to place order. Please try again.');
    }
};

const handlePaymentSuccess = async (response, orderData, accessToken, userDetails, emailContact, phoneContact, cart, totalAmount, setShowPaymentRejection, setPaymentAttempted, setShowConfirmation, setPaymentDetails, setPaymentLoading) => {
  try {
    // Prepare the body for the payment success API
    const paymentSuccessBody = {
      order_id: orderData.ID, // The order ID from the backend response
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
    };

    // Call the payment success API
    const paymentSuccessResponse = await axios.post(
      `${import.meta.env.VITE_BASE_API_URL}/merchant/payment/paymentsuccess`,
      paymentSuccessBody,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Check the payment success response
    if (paymentSuccessResponse.data.status === 'success') {
      toast.success('Payment successful!');
      setPaymentDetails({
        userName: userDetails?.display_name,
        userEmail: emailContact,
        userPhone: phoneContact,
        cartItems: cart,
        grandTotal: totalAmount,
        referenceNumber: response.razorpay_payment_id,
      });

      setShowPaymentRejection(false);
      setShowConfirmation(true);
      setPaymentAttempted(false);
      window.scrollTo(0, 0);
    } else {
      throw new Error('Payment success API failed.');
    }
  } catch (error) {
    console.error('Error in calling payment success API:', error);
    toast.error('Failed to confirm payment. Please try again.');
  } finally {
    setPaymentLoading(false); // Stop the loader after handling success or failure
  }
};

const handlePaymentFailure = async (orderData, accessToken, setShowPaymentRejection, setPaymentAttempted, setPaymentLoading) => {
  try {
    const paymentFailureBody = {
      order_id: orderData.ID,
    };

    // Call the payment failure API
    await axios.post(
      `${import.meta.env.VITE_BASE_API_URL}/merchant/payment/paymentfailed`,
      paymentFailureBody,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    toast.error('Payment failed. Please try again.');
    setShowPaymentRejection(true);
    setPaymentAttempted(true);
    window.scrollTo(0, 0);
  } catch (error) {
    console.error('Error in calling payment failure API:', error);
    toast.error('Failed to handle payment failure.');
  } finally {
    setPaymentLoading(false); // Stop the loader after handling success or failure
  }
};

export const handleRazorpayPayment = async (
  loadRazorpayScript,
  orderData,
  razor_key,
  totalAmount,
  addresses,
  selectedAddressId,
  accessToken,
  cart,
  userDetails,
  emailContact,
  phoneContact,
  setShowPaymentRejection,
  setPaymentAttempted,
  setShowConfirmation,
  setPaymentDetails,
  setCart,
  setPaymentLoading
) => {
  const razorpayOrderId = String(orderData.razorpay_order_id);
  const currency = String(orderData.currency || 'INR');
  const selectedAddressDetails = addresses.find((address) => address.ID === selectedAddressId);

  // Load the Razorpay script only after successful order placement
  const isScriptLoaded = await loadRazorpayScript();

  if (!isScriptLoaded) {
    toast.error('Failed to load Razorpay SDK. Please try again later.');
    setPaymentLoading(false);
    return;
  }

  const options = {
    key: razor_key, // Replace with your Razorpay test key ID
    amount: totalAmount, // Amount in paisa
    currency: currency,
    name: 'HHT Entertainment', // Replace with your business name
    description: 'Purchase Description',
    image: 'https://hiphoptamizha.com/assets/hhtlogo-C5v3yLtg.png', // Replace with your logo URL
    order_id: razorpayOrderId,

    handler: async (response) => {
      await handlePaymentSuccess(
        response,
        orderData,
        accessToken,
        userDetails,
        emailContact,
        phoneContact,
        cart,
        totalAmount,
        setShowPaymentRejection,
        setPaymentAttempted,
        setShowConfirmation,
        setPaymentDetails,
        setPaymentLoading
      );
    },

    prefill: {
      name: userDetails?.display_name || 'NA',
      email: emailContact || 'NA',
      contact: phoneContact || 'NA',
    },
    notes: {
      address: `${selectedAddressDetails?.line1 || 'NA'}, ${selectedAddressDetails?.line2 || 'NA'}, ${selectedAddressDetails.city || 'NA'}, ${selectedAddressDetails.state || 'NA'}, ${selectedAddressDetails.country || 'NA'}`,
      phone: phoneContact || 'NA',
      cart_items: cart
        .map(
          (item) =>
            `${item?.product?.name}, Size: ${item?.product_variant?.variant_size}, Qty: ${item?.quantity}`
        )
        .join(', '),
    },
    theme: {
      color: '#3399cc',
    },
    modal: {
      ondismiss: async () => {
        setPaymentLoading(false);
        await handlePaymentFailure(orderData, accessToken, setShowPaymentRejection, setPaymentAttempted, setPaymentLoading);
      },
    },
  };

  const rzp1 = new window.Razorpay(options);

  rzp1.on('payment.failed', async (response) => {
  });

  rzp1.open();
};
  