import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { Card, CardContent } from '../components/ui/card';

export default function FAQ() {
  const faqs = [
    {
      category: 'General',
      questions: [
        {
          q: 'What is MEGA-TECH Solutions?',
          a: 'MEGA-TECH Solutions is a leading technology education institution that provides high-quality training in web development, data science, mobile development, UI/UX design, cybersecurity, and digital marketing. We focus on practical, hands-on learning that prepares students for real-world careers in tech.'
        },
        {
          q: 'How long have you been operating?',
          a: 'We were founded in 2023 and have been providing quality tech education for over 3 years. We\'ve successfully trained over 5,000 students who have gone on to work at leading tech companies.'
        },
        {
          q: 'Are your certificates recognized?',
          a: 'Yes, our certificates are recognized by employers across Nigeria and internationally. We maintain high educational standards and our graduates have excellent employment rates.'
        }
      ]
    },
    {
      category: 'Courses & Registration',
      questions: [
        {
          q: 'How do I register for a course?',
          a: 'You can register by clicking the "Register" button on our website, filling out the registration form, selecting your desired course, and completing the payment process. You\'ll receive confirmation via email within 24 hours.'
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept bank transfers, card payments, and mobile money (Paystack/Flutterwave). Payment plans are also available for select courses.'
        },
        {
          q: 'Can I take multiple courses at once?',
          a: 'Yes, you can enroll in multiple courses. However, we recommend focusing on one course at a time for the best learning experience, especially if you\'re working or studying.'
        },
        {
          q: 'Do you offer refunds?',
          a: 'We offer a 7-day money-back guarantee if you\'re not satisfied with a course. Refund requests must be submitted within 7 days of enrollment with less than 20% course completion.'
        }
      ]
    },
    {
      category: 'Learning Experience',
      questions: [
        {
          q: 'Are classes online or in-person?',
          a: 'We offer both online and in-person classes. Online classes are conducted via live video sessions, while in-person classes are held at our Lagos facility. You can choose based on your preference and location.'
        },
        {
          q: 'What is the duration of courses?',
          a: 'Course duration varies from 6 to 16 weeks depending on the program. Each course page shows the specific duration and time commitment required.'
        },
        {
          q: 'Do I need prior experience to enroll?',
          a: 'It depends on the course. We offer beginner-friendly courses that require no prior experience, as well as intermediate and advanced courses that have specific prerequisites. Check each course\'s requirements section.'
        },
        {
          q: 'Will I get lifetime access to course materials?',
          a: 'Yes, once you enroll in a course, you get lifetime access to all course materials, including videos, documents, and resources. You can learn at your own pace and revisit content anytime.'
        }
      ]
    },
    {
      category: 'Career Support',
      questions: [
        {
          q: 'Do you provide job placement assistance?',
          a: 'Yes, we offer career support services including resume reviews, interview preparation, and job placement assistance. We have partnerships with tech companies that regularly hire our graduates.'
        },
        {
          q: 'What is your employment rate?',
          a: 'Approximately 95% of our graduates find employment or freelance opportunities within 6 months of completing their courses. Many students receive job offers even before graduation.'
        },
        {
          q: 'Can I build a portfolio during the course?',
          a: 'Absolutely! All our courses include hands-on projects that you can add to your portfolio. These real-world projects demonstrate your skills to potential employers.'
        }
      ]
    },
    {
      category: 'Technical Requirements',
      questions: [
        {
          q: 'What equipment do I need?',
          a: 'You\'ll need a computer (laptop or desktop) with a stable internet connection. Specific software requirements vary by course and are listed on each course page. We provide guidance on setting up your development environment.'
        },
        {
          q: 'What if I have technical issues during class?',
          a: 'We have a dedicated technical support team available during class hours. You can also reach out to instructors and fellow students through our community forums for assistance.'
        }
      ]
    }
  ];

  return (
    <div>
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-blue-50 max-w-3xl">
            Find answers to common questions about our courses, registration, and learning experience
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8">
            {faqs.map((category, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">{category.category}</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, qIdx) => (
                      <AccordionItem key={qIdx} value={`item-${idx}-${qIdx}`}>
                        <AccordionTrigger className="text-left">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardContent className="pt-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
              <p className="text-gray-600 mb-4">
                Can't find the answer you're looking for? Please contact our support team.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="/contact" className="text-blue-600 hover:underline font-medium">
                  Contact Support
                </a>
                <span className="text-gray-400">•</span>
                <a href="mailto:info@megatech.com" className="text-blue-600 hover:underline font-medium">
                  info@megatech.com
                </a>
                <span className="text-gray-400">•</span>
                <a href="tel:+2348001234567" className="text-blue-600 hover:underline font-medium">
                  +234 800 123 4567
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}