
export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="prose prose-lg max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-8">
          Terms of Service
        </h1>
        
        <p><em>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p>

        <p>
          Please read these Terms of Service carefully before using our website operated by Impela Trading CC.
        </p>

        <h2 className="text-2xl font-headline font-bold mt-8 mb-4">Conditions of Use</h2>
        <p>
          By using this website, you certify that you have read and reviewed this Agreement and that you agree to comply with its terms. If you do not want to be bound by the terms of this Agreement, you are advised to leave the website accordingly.
        </p>

        <h2 className="text-2xl font-headline font-bold mt-8 mb-4">Intellectual Property</h2>
        <p>
          You agree that all materials, products, and services provided on this website are the property of Impela Trading CC, its affiliates, directors, officers, employees, agents, suppliers, or licensors including all copyrights, trade secrets, trademarks, patents, and other intellectual property.
        </p>

        <h2 className="text-2xl font-headline font-bold mt-8 mb-4">Limitation on Liability</h2>
        <p>
         Impela Trading CC is not liable for any damages that may occur to you as a result of your misuse of our website.
        </p>
        
        <h2 className="text-2xl font-headline font-bold mt-8 mb-4">Governing Law</h2>
        <p>
          This Agreement is governed in accordance with the laws of South Africa.
        </p>
      </div>
    </div>
  );
}
