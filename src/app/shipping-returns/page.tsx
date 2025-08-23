
export default function ShippingReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="prose prose-lg max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-8">
          Shipping & Returns
        </h1>

        <h2 className="text-2xl font-headline font-bold mt-8 mb-4">Shipping Policy</h2>
        <p>
          We offer both domestic and international shipping. Orders are typically processed within 2-3 business days. Shipping rates and delivery times are calculated at checkout based on your location.
        </p>
        <p>
          Please note that for international orders, customers are responsible for any customs and import taxes that may apply. We are not responsible for delays due to customs.
        </p>
        
        <h2 className="text-2xl font-headline font-bold mt-8 mb-4">Return Policy</h2>
        <p>
          Your satisfaction is our priority. We accept returns for unused items in their original condition within 30 days of delivery.
        </p>
        <p>
          To initiate a return, please contact us at contact@impela.co.za with your order number and the reason for the return. Return shipping costs are the responsibility of the customer unless the item was received damaged or incorrect.
        </p>
        <p>
            Once we receive and inspect your return, we will process a refund to your original method of payment.
        </p>
      </div>
    </div>
  );
}
