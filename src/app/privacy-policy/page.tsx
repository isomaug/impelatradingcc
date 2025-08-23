
export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="prose prose-lg max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-8">
          Privacy Policy
        </h1>
        
        <p><em>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p>

        <p>
          Impela Trading CC ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
        </p>

        <h2 className="text-2xl font-headline font-bold mt-8 mb-4">Information We Collect</h2>
        <p>
          We may collect personal information from you such as your name, email address, postal address, phone number, and payment information when you make a purchase, subscribe to our newsletter, or contact us.
        </p>

        <h2 className="text-2xl font-headline font-bold mt-8 mb-4">How We Use Your Information</h2>
        <p>
          We use the information we collect to:
        </p>
        <ul>
          <li>Process your transactions and fulfill your orders.</li>
          <li>Send you promotional materials and newsletters, if you have opted in.</li>
          <li>Improve our website and services.</li>
          <li>Respond to your comments, questions, and provide customer service.</li>
        </ul>

        <h2 className="text-2xl font-headline font-bold mt-8 mb-4">Security of Your Information</h2>
        <p>
          We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
        </p>
        
        <h2 className="text-2xl font-headline font-bold mt-8 mb-4">Contact Us</h2>
        <p>
          If you have questions or comments about this Privacy Policy, please contact us at contact@impela.co.za.
        </p>
      </div>
    </div>
  );
}
