import { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us | Emory Market Gardens',
  description: 'Get in touch with Emory Market Gardens. We would love to hear from you about our mushrooms, farming practices, or any questions you may have.',
  openGraph: {
    title: 'Contact Us | Emory Market Gardens',
    description: 'Get in touch with Emory Market Gardens. We would love to hear from you about our mushrooms, farming practices, or any questions you may have.',
  },
}

export default function ContactPage() {
  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We'd love to hear from you! Whether you have questions about our mushrooms, 
              want to learn about our farming practices, or are interested in visiting our farm, 
              don't hesitate to reach out.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Send us a Message</h2>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Visit Our Farm</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Address</h3>
                  <div className="text-gray-600">
                    <p>Emory Market Gardens, LLC.</p>
                    <p>4020 FM 515</p>
                    <p>Emory, TX 75440</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Hours</h3>
                  <div className="text-gray-600">
                    <p>Mon - Fri: 9:00am - 5:00pm</p>
                    <p>Saturday: 10:00am - 6:00pm</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Find Us at Local Markets</h3>
                  <div className="text-gray-600 space-y-2">
                    <div>
                      <p className="font-medium">Winnsboro Farmers Market</p>
                      <p className="text-sm">Every Saturday 8am - noon (April-October)</p>
                      <p className="text-sm">Monthly (November-March)</p>
                    </div>
                    <div>
                      <p className="font-medium">Sorelle Farms Market Nights</p>
                      <p className="text-sm">Every Thursday 5pm - 8pm (April-October)</p>
                    </div>
                    <div>
                      <p className="font-medium">Historic Longview Farmers Market</p>
                      <p className="text-sm">Every Saturday 7am - 11am (April-November)</p>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary-light rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-primary mb-2">Why Contact Us?</h3>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• Questions about our mushroom varieties</li>
                    <li>• Bulk orders for restaurants or markets</li>
                    <li>• Educational farm tours</li>
                    <li>• Growing advice and consultation</li>
                    <li>• Partnership opportunities</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}