
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What materials do you use?",
    answer: "We primarily use high-quality, full-grain leather sourced ethically and sustainably within South Africa. Our hardware is solid brass to ensure durability."
  },
  {
    question: "How does my purchase support local artisans?",
    answer: "A significant portion of our revenue goes directly to the artisans who craft the products. We also reinvest profits into our training programs, providing skills and tools to more individuals in the community."
  },
  {
    question: "What is your return policy?",
    answer: "We accept returns within 30 days of purchase for items that are unused and in their original condition. Please visit our Shipping & Returns page for more details."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we proudly ship our products worldwide to share South African craftsmanship with a global audience. Shipping costs and times vary by destination."
  },
  {
    question: "How can I partner with Impela Trading CC?",
    answer: "We are always looking for partners who share our vision. If you are an NGO, a potential distributor, or an organization interested in our training programs, please contact us through our Partnerships page."
  },
  {
    question: "How should I care for my leather product?",
    answer: "Each product comes with specific care instructions. Generally, we recommend wiping with a soft, damp cloth and applying a quality leather conditioner every 6 months to keep the leather supple and protected."
  }
];

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Have a question? We're here to help. If you don't see your question answered below, please don't hesitate to contact us.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
