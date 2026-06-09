import { useState, useEffect } from 'react'
import { getFeatures } from '../api/featureApi'

export default function Home() {
  const [features, setFeatures] = useState([])

  useEffect(() => {
    loadFeatures()
  }, [])

  const loadFeatures = async () => {
    try {
      const res = await getFeatures()
      setFeatures(res.data || [])
    } catch (error) {
      console.error('Failed to load features:', error)
    }
  }

  const getImageUrl = (feature) => {
    return (
      feature.image_url ||
      feature.image ||
      feature.featured_image ||
      feature.imageUrl ||
      ''
    )
  }

  return (
    <div className="font-manrope">
   

      <section className="relative h-[110vh] flex items-center justify-center text-center text-white overflow-hidden">
        <img 
          src="/assets/Banner.jpg" 
          alt="Banner Background"
          className="absolute w-full h-full object-cover" 
        />
        
        <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block z-10">
          <img src="/assets/banner1.png" alt="Banner Left" className="w-48 md:w-96" />
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block z-10">
          <img src="/assets/banner2.png" alt="Banner Right" className="w-48 md:w-96" />
        </div>

        <div className="relative max-w-4xl pt-24 animate-fade px-6 z-10">
          <p className="tracking-widest text-sm font-bold">TECHNOLOGY RELATED CONSULTANCY</p>
          <h1 className="text-5xl md:text-6xl font-semibold mt-4 pb-5 leading-tight">
            Fast, reliable & affordable <br />IT service for you
          </h1>
          
          <button className="group relative p-2">
            <a 
              href="#" 
              className="relative inline-block px-[50px] py-[14px] bg-blue-700 text-white font-semibold rounded-md overflow-hidden transition-colors duration-400"
            >
              <span className="relative z-10 transition-colors duration-400 group-hover:text-[#1e73ff]">
                Read More
              </span>
              <span className="absolute top-0 left-1/2 h-full w-0 bg-white skew-x-[25deg] transition-all duration-500 ease-out group-hover:w-[180%] group-hover:-left-[40%] z-0"></span>
            </a>
          </button>
        </div>
      </section>

      <div className="relative pt-20 pb-40 bg-gradient-to-br from-indigo-950 via-[#070A29] to-slate-950">
        <img 
          src="/assets/ser-2-bg.png" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="Background"
        />

        <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-36">
          <div className="grid md:grid-cols-2 gap-16 items-start p-0 text-white">
            <div>
              <p className="tracking-widest text-sm mb-4 opacity-80">WHO WE ARE</p>
              <h2 className="text-4xl md:text-4xl font-semibold leading-tight">
                We specialise in helping <br />
                our customers digitise <br />
                their business
              </h2>
            </div>

            <div>
              <p className="text-lg opacity-80 leading-relaxed max-w-md">
                Accelerate innovation with world-class tech teams. We'll match you to an entire
                remote team of incredible freelance talent for all your software development needs.
              </p>

              <div className="flex items-center gap-6 mt-10 pb-20">
                <img src="/assets/mitawalker.png" alt="Signature" className="w-28" />
                <div>
                  <p className="font-semibold">Mita Walker</p>
                  <p className="text-sm opacity-70">CEO, Techmax</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-8 relative z-10 w-full mt-10">
           <h1 className="text-3xl font-bold text-white mb-8">Our Features</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
           
            {features.length > 0 ? (
              features.map((feature) => {
                const imageUrl = getImageUrl(feature)
                return (
                  <div key={feature.id} className="relative text-center transition-all duration-300 hover:-translate-y-2">
                    <a href="#" className="block relative">
                      {imageUrl ? (
                        <img 
                          src={imageUrl}
                          alt={feature.title} 
                          className="w-full h-80 object-cover rounded-lg shadow-lg" 
                        />
                      ) : (
                        <div className="w-full h-80 bg-gray-200 rounded-lg shadow-lg flex items-center justify-center">
                          <span className="text-gray-500">No Image</span>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 w-full pb-3 px-4">
                        <h3 className="text-2xl font-semibold text-white mb-2">
                          <span className="hover:text-blue-400 transition-colors">{feature.title}</span>
                        </h3>
                        {feature.description && (
                          <p className="text-white text-sm opacity-90 line-clamp-2">
                            {feature.description}
                          </p>
                        )}
                      </div>
                    </a>
                  </div>
                )
              })
            ) : (
              <>
                <div className="relative text-center transition-all duration-300 hover:-translate-y-2">
                  <a href="#" className="block relative">
                    <img 
                      src="/assets/datasec.jpg" 
                      alt="Data Security" 
                      className="w-full h-80 object-cover rounded-lg shadow-lg" 
                    />
                    <div className="absolute bottom-0 left-0 w-full pb-10">
                      <h3 className="text-2xl font-semibold text-white">
                        <span className="hover:text-blue-400 transition-colors">Data Security</span>
                      </h3>
                    </div>
                  </a>
                </div>

                <div className="relative text-center transition-all duration-300 hover:-translate-y-2">
                  <a href="#" className="block relative">
                    <img 
                      src="/assets/itmanage.jpg" 
                      alt="IT Management" 
                      className="w-full h-80 object-cover rounded-lg shadow-lg" 
                    />
                    <div className="absolute bottom-0 left-0 w-full pb-10">
                      <h3 className="text-2xl font-semibold text-white">
                        <span className="hover:text-blue-400 transition-colors">IT Management</span>
                      </h3>
                    </div>
                  </a>
                </div>

                <div className="relative text-center transition-all duration-300 hover:-translate-y-2">
                  <a href="#" className="block relative">
                    <img 
                      src="/assets/digitalM.jpg" 
                      alt="Digital Marketing" 
                      className="w-full h-80 object-cover rounded-lg shadow-lg" 
                    />
                    <div className="absolute bottom-0 left-0 w-full pb-10">
                      <h3 className="text-2xl font-semibold text-white">
                        <span className="hover:text-blue-400 transition-colors">Digital Marketing</span>
                      </h3>
                    </div>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ================= YEARS OF EXPERIENCE ================= */}
      <div className="relative w-full py-28">
        <img 
          src="/assets/counter-bg-3.jpg" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="Background"
        />

        <div className="relative max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
            <div className="">
              <h2 className="text-[140px] font-bold text-blue-600 leading-none">25+</h2>
              <p className="text-gray-700 mt-2">Years of experience</p>
            </div>

            <div className="-mr-10">
              <p className="text-4xl font-bold text-gray-900 leading-tight">
                We specialise in <br />
                helping <span className="text-blue-600">customers <br />digitise</span><br />
                business <br />Including IT
              </p>
            </div>

            <div className="space-y-8 ml-20 -mr-72">
              <div className="border-b border-blue-500 pb-4 flex justify-between items-center">
                <span className="text-2xl text-black-700 hover:text-blue-600 transition">
                  <a href="#" className="font-semibold">IT Management <span className="pl-2">→</span></a>
                </span>
              </div>
              
              <div className="border-b border-blue-500 pb-4 flex justify-between items-center">
                <span className="text-2xl text-black-700 hover:text-blue-600 transition">
                  <a href="#" className="font-semibold">Networking & Resource Management <span className="pl-2">→</span></a>
                </span>
              </div>
              
              <div className="border-b border-blue-500 pb-4 flex justify-between items-center">
                <span className="text-2xl text-black-700 hover:text-blue-600 transition">
                  <a href="#" className="font-semibold">Data Security <span className="pl-2">→</span></a>
                </span>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-24">
        <div className="bg-white rounded-lg px-8 py-8 flex items-center gap-4 shadow-sm">
          <img src="/assets/bulb.png" className="w-10 h-10" alt="Icon" />
          <div>
            <span className="text-5xl font-bold counter" data-target="354">0 </span>
            <span className="text-5xl">+</span>
            <p className="text-sm text-gray-600">Completed Projects</p>
          </div>
        </div>

        <div className="bg-white rounded-lg px-8 py-8 flex items-center gap-4 shadow-sm">
          <img src="/assets/bulb.png" className="w-10 h-10" alt="Icon" />
          <div>
            <span className="text-5xl font-bold counter" data-target="119">0 </span>
            <span className="text-5xl">+</span>
            <p className="text-sm text-gray-600">Satisfied Clients</p>
          </div>
        </div>

        <div className="bg-white rounded-lg px-8 py-8 flex items-center gap-4 shadow-sm">
          <img src="/assets/bulb.png" className="w-10 h-10" alt="Icon" />
          <div>
            <span className="text-5xl font-bold counter" data-target="99">0 </span>
            <span className="text-5xl">%</span>
            <p className="text-sm text-gray-600">Web Site Analyse</p>
          </div>
        </div>

        <div className="bg-white rounded-lg px-8 py-8 flex items-center gap-4 shadow-sm">
          <img src="/assets/bulb.png" className="w-10 h-10" alt="Icon" />
          <div>
            <span className="text-5xl font-bold counter" data-target="321">0 </span>
            <span className="text-5xl">+</span>
            <p className="text-sm text-gray-600">Clients Support Done</p>
          </div>
        </div>
      </div>

      {/* ================= CAROUSEL ================= */}
      <div className="py-24 relative bg-white">
        <img 
          src="/assets/counter-bg-3.jpg" 
          className="absolute inset-0 w-full h-full object-cover opacity-60" 
          alt="Background" 
        />

        <div id="carouselWrapper" className="relative max-w-6xl mx-auto overflow-hidden cursor-pointer py-5 pt-0">
          <p className="text-5xl font-bold text-center mb-12">
            <span className="text-blue-700">20k+ clients</span> love our service <br />
            & IT related solutions
          </p>
          
          <div id="carousel" className="flex transition-transform duration-500">
            <div className="flex-shrink-0 px-4 slide">
              <div className="testimonial-card relative bg-white mx-auto p-10 rounded-xl shadow-lg w-[280px] sm:w-[320px] md:w-[350px] h-[360px]">
                <div className="absolute top-6 left-8 flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 text-blue-600 text-[8rem] leading-none pointer-events-none pt-14">"</div>
                <p className="testimonial-text text-gray-700 pt-16 text-base leading-relaxed">
                  Accelerate innovation with world-class tech teams. Beyond more stoic this along goodness hey this this wow manatee.
                </p>
                <div className="flex items-center gap-4 mt-8">
                  <img src="/assets/MH1.jpg" className="w-10 h-10 rounded-full object-cover" alt="Michel Holder" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 text-sm">Michel Holder</p>
                    <p className="text-xs text-blue-500">CEO, Harlond Inc</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 px-4 slide">
              <div className="testimonial-card relative bg-gradient-to-br from-cyan-400 to-blue-600 text-white mx-auto p-10 rounded-xl shadow-lg w-[280px] sm:w-[320px] md:w-[350px] h-[360px]">
                <div className="absolute top-6 left-8 flex items-center justify-center w-14 h-14 rounded-full bg-blue-200 text-white text-[8rem] leading-none pointer-events-none pt-14">"</div>
                <p className="testimonial-text pt-16 text-base leading-relaxed">
                  Accelerate innovation with world-class tech teams. Beyond more stoic this along goodness hey this this wow manatee.
                </p>
                <div className="flex items-center gap-4 mt-8">
                  <img src="/assets/MH2.jpg" className="w-10 h-10 rounded-full object-cover" alt="Michel Holder" />
                  <div className="text-left">
                    <p className="font-semibold text-white text-sm">Michel Holder</p>
                    <p className="text-xs text-blue-100">CEO, Harlond Inc</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 px-4 slide">
              <div className="testimonial-card relative bg-white mx-auto p-10 rounded-xl shadow-lg w-[280px] sm:w-[320px] md:w-[350px] h-[360px]">
                <div className="absolute top-6 left-8 flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 text-blue-600 text-[8rem] leading-none pointer-events-none pt-14">"</div>
                <p className="testimonial-text text-gray-700 pt-16 text-base leading-relaxed">
                  Accelerate innovation with world-class tech teams. Beyond more stoic this along goodness hey this this wow manatee.
                </p>
                <div className="flex items-center gap-4 mt-8">
                  <img src="/assets/MH3.jpg" className="w-10 h-10 rounded-full object-cover" alt="Michel Holder" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 text-sm">Michel Holder</p>
                    <p className="text-xs text-blue-500">CEO, Harlond Inc</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-4 gap-2" id="dotsContainer">
            <span className="dot w-3 h-3 rounded-full bg-blue-500 cursor-pointer"></span>
            <span className="dot w-3 h-3 rounded-full bg-gray-400 cursor-pointer"></span>
            <span className="dot w-3 h-3 rounded-full bg-gray-400 cursor-pointer"></span>
          </div>
        </div>
      </div>

      {/* ================= CALL TO ACTION ================= */}
      <div className="bg-slate-950 text-white py-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 px-6">
          <div className="flex-shrink-0">
            <img src="/assets/me.png" alt="Message" className="md:w-32 md:h-32 object-contain" />
          </div>
          <div className="pr-36">
            <h2 className="text-3xl md:text-4xl font-semibold">
              Let's make something <br /> beautiful together with us
            </h2>
          </div>

          <div className="text-center md:text-left space-y-4">
            <h3 className="text-lg md:text-xl">Call us for fast support</h3>
            <button className="group relative">
              <a 
                href="#" 
                className="relative inline-block px-[40px] py-[10px] bg-[#1e73ff] text-white font-semibold rounded-md overflow-hidden transition-colors duration-400 group"
              >
                <span className="relative z-10 transition-colors duration-400 group-hover:text-[#1e73ff]">
                  +44 920 090 505
                </span>
                <span className="absolute top-0 left-1/2 h-full w-0 bg-white skew-x-[25deg] transition-all duration-500 ease-out group-hover:w-[180%] group-hover:-left-[40%] z-0"></span>
              </a>
            </button>
          </div>
        </div>
      </div>

      {/* ================= FAQ SECTION ================= */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="flex items-start gap-6">
            <img src="/assets/questionmark.png" className="w-70 h-70 object-contain mt-2" alt="FAQ" />
            <h2 className="text-5xl font-semibold leading-tight">
              Frequently <br /> asked <br /> questions
            </h2>
          </div>

          <div>
            <details className="border-b py-6 group">
              <summary className="cursor-pointer flex items-center font-semibold text-lg list-none">
                <span className="bg-gray-200 rounded-full text-sm px-4 py-3 flex-shrink-0">01</span>
                <h2 className="text-left text-2xl ml-3 pl-5 group-open:text-blue-600 transition-colors duration-300 hover:text-blue-500">
                  How long it take to finish a project?
                </h2>
                <span className="ml-auto text-blue-600 group-open:rotate-180 transition-transform duration-300">⌄</span>
              </summary>
              <p className="mt-4 text-slate-600 text-sm">
                Accelerate innovation with world-class tech teams. We'll match you to an entire remote team of incredible freelance talent for all your software.
              </p>
            </details>

            <details className="border-b py-6 group">
              <summary className="cursor-pointer flex items-center font-semibold text-lg list-none">
                <span className="bg-gray-200 rounded-full text-sm px-4 py-3 flex-shrink-0">02</span>
                <h2 className="text-left text-2xl ml-3 pl-5 group-open:text-blue-600 transition-colors duration-300 hover:text-blue-500">
                  Support & Policy
                </h2>
                <span className="ml-auto text-blue-600 group-open:rotate-180 transition-transform duration-300">⌄</span>
              </summary>
              <p className="mt-4 text-slate-600 text-sm">
                Accelerate innovation with world-class tech teams. We'll match you to an entire remote team of incredible freelance talent for all your software.
              </p>
            </details>

            <details className="border-b py-6 group">
              <summary className="cursor-pointer flex items-center font-semibold text-lg list-none">
                <span className="bg-gray-200 rounded-full text-sm px-4 py-3 flex-shrink-0">03</span>
                <h2 className="text-left text-2xl ml-3 pl-5 group-open:text-blue-600 transition-colors duration-300 hover:text-blue-500">
                  Refund Solution
                </h2>
                <span className="ml-auto text-blue-600 group-open:rotate-180 transition-transform duration-300">⌄</span>
              </summary>
              <p className="mt-4 text-slate-600 text-sm">
                Accelerate innovation with world-class tech teams. We'll match you to an entire remote team of incredible freelance talent for all your software.
              </p>
            </details>
          </div>
        </div>
      </div>

      {/* ================= NEWSLETTER ================= */}
      <div className="relative">
        <div className="h-40"></div>

        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-11/12 md:w-3/4 lg:w-2/3 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-xl shadow-xl px-20 py-28 text-center text-white">
          <h3 className="text-4xl font-semibold mb-3">Subscribe Newsletters</h3>
          <p className="text-md opacity-90 mb-8">
            Enter your email address to register to our newsletter
          </p>

          <div className="flex flex-col sm:flex-row max-w-2xl mx-auto bg-white rounded-md overflow-hidden">
            <input
              type="email"
              placeholder="Your Email"
              className="flex-1 px-4 py-3 text-black outline-none"
            />
            <button className="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold">
              Subscribe
            </button>
          </div>
        </div>

        <div className="h-64 bg-[#070A29]"></div>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#070A29] text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
          <div>
            <img src="/assets/techmax2.png" className="mb-6" alt="Logo" />
            <ul className="space-y-3 text-sm">
              <li>+91 458 654 528</li>
              <li>info@example.com</li>
              <li>60 East 65th Street, NY</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white mt-4">Useful Links</h3>
            <ul className="space-y-3 text-sm">
              <li>Terms & Conditions</li>
              <li>About Company</li>
              <li>Payment Gateway</li>
              <li>Policy</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white mt-4">Our Services</h3>
            <ul className="space-y-3 text-sm">
              <li>Data Security</li>
              <li>IT Management</li>
              <li>Outsourcing</li>
              <li>Networking</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white mt-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>Documentation</li>
              <li>Support</li>
              <li>FAQs</li>
              <li>Download</li>
            </ul>
          </div>
        </div>
      </footer>

      <div className="bg-[#070A29] border-t border-gray-400 text-gray-400 py-0 px-[20vh] flex items-center justify-between text-sm">
        <div>© Copyright 2026 Techmax. All rights reserved.</div>

        <div className="flex items-center gap-6 py-10">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-transparent border border-white text-white">
            <i className="fa-brands fa-facebook-f"></i>
          </div>

          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-xl text-white hover:text-blue-400">
            <i className="fa-brands fa-x-twitter"></i>
          </a>

          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-xl text-white hover:text-blue-600">
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </div>
  )
}