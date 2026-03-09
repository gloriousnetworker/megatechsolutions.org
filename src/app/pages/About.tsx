import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Target, Eye, Award, Users, TrendingUp, Heart } from 'lucide-react';
import ceoImage from '../../assets/3dacabed15e19364a81094f974943ed0b55c95db.png';
import managerImage from '../../assets/20e03f663b76693d871ac90b0eddfb514696d609.png';
import legalAdvisorImage from '../../assets/4589a0cf374a7f51aad39b9046c09defb8ccc362.png';

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About MEGA-TECH Solutions</h1>
          <p className="text-xl text-blue-50 max-w-3xl">
            We are dedicated to empowering the next generation of tech professionals through quality education, hands-on training, and industry connections.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2023, MEGA-TECH Solutions Ltd has quickly become a leading force in technology education in Nigeria. What started as a vision to bridge the digital divide has grown into a comprehensive tech training institution serving students across Kogi State and beyond.
              </p>
              <p className="text-gray-600 mb-4">
                Located in the heart of Lokoja at Rianzo Plaza, we are strategically positioned to serve the growing demand for quality tech education. Our commitment to excellence and practical learning has made us the preferred choice for aspiring tech professionals in the region.
              </p>
              <p className="text-gray-600">
                Today, we offer a comprehensive range of courses in web development, data science, mobile development, UI/UX design, cybersecurity, and digital marketing, all taught by industry experts with real-world experience.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Team collaboration"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center size-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                  <Eye className="size-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-gray-600">
                  To be Africa's leading technology education institution, recognized globally for producing world-class tech professionals who drive innovation and digital transformation across industries.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center size-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                  <Target className="size-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-gray-600">
                  To provide accessible, high-quality technology education that equips students with practical skills, industry knowledge, and the confidence to succeed in the global tech ecosystem.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Achievements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center size-20 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Users className="size-10" />
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-2">5,000+</div>
              <div className="text-gray-600">Graduates</div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center size-20 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Award className="size-10" />
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-gray-600">Industry Awards</div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center size-20 rounded-full bg-blue-100 text-blue-600 mb-4">
                <TrendingUp className="size-10" />
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600">Employment Rate</div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center size-20 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Heart className="size-10" />
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-gray-600">Partner Companies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Our Partners</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            We work with leading companies to provide our students with real-world experience and job opportunities
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {[
              'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop',
              'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=200&h=100&fit=crop',
              'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=100&fit=crop',
              'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=200&h=100&fit=crop'
            ].map((img, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center">
                <img src={img} alt={`Partner ${index + 1}`} className="max-w-full h-12 object-contain grayscale hover:grayscale-0 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Excellence',
                description: 'We strive for excellence in everything we do, from curriculum design to student support.'
              },
              {
                title: 'Innovation',
                description: 'We embrace innovation and continuously update our courses to reflect industry trends.'
              },
              {
                title: 'Integrity',
                description: 'We maintain the highest standards of integrity and transparency in all our operations.'
              },
              {
                title: 'Student-Centric',
                description: 'Our students are at the heart of everything we do. Their success is our success.'
              },
              {
                title: 'Practical Learning',
                description: 'We believe in learning by doing. Our hands-on approach ensures real-world readiness.'
              },
              {
                title: 'Community',
                description: 'We foster a supportive community where students and instructors grow together.'
              }
            ].map((value, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Our Leadership Team</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Meet the experienced professionals guiding MEGA-TECH Solutions towards excellence
          </p>

          {/* CEO - Featured Section */}
          <div className="max-w-5xl mx-auto mb-12">
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8 items-start">
                  {/* CEO Image */}
                  <div className="text-center">
                    <img
                      src={ceoImage}
                      alt="Engr. Audu Hamza Adabara"
                      className="w-full max-w-xs rounded-lg object-cover mx-auto mb-4 shadow-lg"
                    />
                  </div>
                  
                  {/* CEO Details */}
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">Engr. Audu Hamza Adabara</h3>
                      <p className="text-blue-600 font-semibold text-lg mb-2">
                        Chief Executive Officer (CEO) / Managing Director
                      </p>
                      <p className="text-gray-600 font-medium">
                        B.Eng Electrical Engineering
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Member, Nigerian Society of Engineers (NSE) • Registered Engineer, COREN
                      </p>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">About</h4>
                      <p className="text-gray-600 mb-3">
                        Engr. Audu Hamza Adabara is the Founder and Chief Executive Officer of Mega-Tech Solutions LTD. 
                        He is an Electrical Engineer, Technocrat, Business Developer, and Facility Manager.
                      </p>
                      <p className="text-gray-600 mb-3">
                        He graduated from the Federal University of Technology Minna, Niger State, and currently serves as 
                        Personal Assistant to the Director General, Kogi State Government House Administration.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Business Portfolio</h4>
                      <p className="text-gray-600 mb-2">
                        A successful entrepreneur managing multiple companies including:
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span className="text-gray-600">Mega Autos</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span className="text-gray-600">Mega Logistics and Courier Services</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span className="text-gray-600">Salam Homes and Properties</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span className="text-gray-600">Megabite Grills and Fries</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span className="text-gray-600">360 Media</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span className="text-gray-600">Pluto Records</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-gray-600 italic">
                        A philanthropist and technology leader committed to developing Kogi State through innovation.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Other Leadership Members */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Manager */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <img
                    src={managerImage}
                    alt="Idris Muhammed Hafeez"
                    className="size-32 rounded-full object-cover mx-auto mb-4 border-4 border-blue-100"
                  />
                  <h3 className="text-xl font-bold mb-1">Idris Muhammed Hafeez</h3>
                  <p className="text-blue-600 font-medium mb-2">Manager</p>
                  <p className="text-sm text-gray-600 mb-3">Computer Scientist</p>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="font-semibold text-gray-900">Specializations:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Product Design</li>
                    <li>Data Analytics</li>
                    <li>Technology Strategy</li>
                    <li>Ethics and Governance</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Legal Advisor */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <img
                    src={legalAdvisorImage}
                    alt="Barrister Shaibu Yetunde Olubunmi"
                    className="size-32 rounded-full object-cover mx-auto mb-4 border-4 border-blue-100"
                  />
                  <h3 className="text-xl font-bold mb-1">Barrister Shaibu Yetunde Olubunmi</h3>
                  <p className="text-blue-600 font-medium mb-2">Legal Advisor</p>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="font-semibold text-gray-900">Qualifications:</p>
                  <p>LL.B, B.L, ACIArb</p>
                  <p className="font-semibold text-gray-900 mt-3">Role:</p>
                  <p>Legal Advisor / Contract Review and Negotiator</p>
                </div>
              </CardContent>
            </Card>

            {/* Technical Adviser */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="size-32 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <Users className="size-16 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">Engr. Ohie Abdulazeez Bilikisu</h3>
                  <p className="text-blue-600 font-medium mb-2">Technical Adviser</p>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="font-semibold text-gray-900">Qualifications:</p>
                  <p>M.Eng, B.Eng, COREN, NSE, NEMSA</p>
                  <p className="font-semibold text-gray-900 mt-3">Role:</p>
                  <p>Technical Adviser and Business Development</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}