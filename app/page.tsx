'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function Home() {
  const [counts, setCounts] = useState({ auto: 0, moto: 0, marine: 0 })
  const statsRef = useRef<HTMLDivElement>(null)
  const statsStarted = useRef(false)
  const [panelsInView, setPanelsInView] = useState(false)
  const panelsRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState<'passenger' | 'commercial'>('passenger')
  const revealRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const statsObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !statsStarted.current) {
        statsStarted.current = true
        animateCount('auto', 17, 2000)
        animateCount('moto', 29, 2000)
        animateCount('marine', 34, 2000)
      }
    }, { threshold: 0.4 })
    if (statsRef.current) statsObs.observe(statsRef.current)

    const panelsObs = new IntersectionObserver((entries) => {
      setPanelsInView(entries[0].isIntersecting)
    }, { threshold: 0.3 })
    if (panelsRef.current) panelsObs.observe(panelsRef.current)

    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    }, { threshold: 0.15 })
    revealRefs.current.forEach(el => { if (el) revealObs.observe(el) })

    return () => {
      statsObs.disconnect()
      panelsObs.disconnect()
      revealObs.disconnect()
    }
  }, [])

  const animateCount = (key: keyof typeof counts, target: number, duration: number) => {
    const steps = 60
    const increment = target / steps
    let current = 0
    let step = 0
    const timer = setInterval(() => {
      step++
      current = Math.min(Math.round(increment * step), target)
      setCounts(prev => ({ ...prev, [key]: current }))
      if (step >= steps) clearInterval(timer)
    }, duration / steps)
  }

  const addRevealRef = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el)
  }

  const passengerCars = [
    { name: 'e VITARA', price: '755,000,000', img: '/evitara.png' },
    { name: 'FRONX', price: '261,500,000', img: '/fronx.png' },
    { name: 'JIMNY', price: '456,800,000', img: '/jimny.png' },
    { name: 'S-PRESSO', price: '173,100,000', img: '/spresso.png' },
    { name: 'ALL NEW ERTIGA', price: '240,000,000', img: '/ertiga.png' },
    { name: 'GRAND VITARA', price: '416,000,000', img: '/grandvitara.png' },
    { name: 'APV', price: '185,500,000', img: '/apv.png' },
    { name: 'NEW XL7', price: '265,500,000', img: '/xlseven.png' },
  ]

  const commercialCars = [
    { name: 'NEW CARRY PICK UP', price: '185,000,000', img: '/carry.png' },
  ]

  const products = [
    { label: 'AUTOMOBILE', img: '/automobile.jpg', desc: 'Explore our full range of passenger and commercial vehicles' },
    { label: 'MOTORCYCLE', img: '/motorcycle.jpg', desc: 'Built for every rider, from city streets to open highways' },
    { label: 'MARINE', img: '/marine.png', desc: 'Reliable outboard engines engineered for the open water' },
  ]

  const whySuzuki = [
    { title: 'Built to Last', sub: 'Precision Engineering', desc: 'Suzuki vehicles are engineered with precision and durability, ensuring every ride stands the test of time.' },
    { title: 'Innovative Technology', sub: 'Smart Performance', desc: 'From fuel efficiency to smart engineering, Suzuki leads with cutting-edge automotive innovation.' },
    { title: 'Trusted Worldwide', sub: 'Global Presence', desc: 'With presence in over 190 countries, Suzuki is a brand millions trust every single day.' },
  ]

  const moreFromUs = [
    { img: '/insurance.jpg', title: 'SUZUKI INSURANCE', desc: 'Drive with peace of mind with comprehensive coverage and a wide service network.' },
    { img: '/finance.jpg', title: 'SUZUKI FINANCE', desc: 'Enjoy flexible, competitive financing options tailored to your needs.' },
    { img: '/servis.png', title: 'SERVICE AND PARTS', desc: 'Keep your Suzuki in peak condition with our certified service centers.' },
  ]

  const marqueeRows = [
    { dir: 'left', delay: '0s' },
    { dir: 'right', delay: '-4s' },
    { dir: 'left', delay: '-8s' },
    { dir: 'right', delay: '-2s' },
    { dir: 'left', delay: '-6s' },
    { dir: 'right', delay: '-3s' },
    { dir: 'left', delay: '-10s' },
  ]

  const displayedCars = activeCategory === 'passenger' ? passengerCars : commercialCars

  return (
    <main className="bg-white overflow-x-hidden">

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <Image src="/logo-suzuki.png" alt="Suzuki" width={110} height={36} className="object-contain" />
        <button className="group flex flex-col gap-[6px] p-2 cursor-default" aria-label="Menu">
          <span className="block w-8 h-[2px] bg-gray-800 group-hover:bg-[#e60012] transition-colors duration-200" />
          <span className="block w-5 h-[2px] bg-gray-800 group-hover:bg-[#e60012] transition-colors duration-200" />
          <span className="block w-7 h-[2px] bg-gray-800 group-hover:bg-[#e60012] transition-colors duration-200" />
        </button>
      </nav>

      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-white pt-16">
        <div className="absolute inset-0 flex flex-col justify-center gap-0 pointer-events-none select-none">
          {marqueeRows.map((row, i) => (
            <div key={i} className="overflow-hidden w-full">
              <div style={{
                display: 'inline-flex',
                whiteSpace: 'nowrap',
                animationName: row.dir === 'left' ? 'marqueeLeft' : 'marqueeRight',
                animationDuration: '20s',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animationDelay: row.delay,
              }}>
                {Array(6).fill(null).map((_, j) => (
                  <span key={j} style={{
                    fontFamily: "'Big Shoulders Display', sans-serif",
                    fontStyle: 'italic',
                    fontWeight: 900,
                    fontSize: 'clamp(4rem, 9vw, 8rem)',
                    color: '#F2F2F2',
                    paddingRight: '4rem',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.05,
                  }}>
                    YOUR GEAR YOUR GEAR
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-10 flex items-center justify-center select-none">
          <div className="hero-logo-s flex-shrink-0">
            <Image src="/logo-s.png" alt="S" width={150} height={150} className="object-contain" priority />
          </div>
          <div className="hero-uzuki relative" style={{ lineHeight: 0 }}>
            <svg viewBox="0 0 680 165" width="680" height="165" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <clipPath id="uzukiClip">
                  <text x="0" y="150" fontSize="172" fontFamily="SuzukiFont, 'Big Shoulders Display', sans-serif" fontWeight="900" letterSpacing="-2">UZUKI</text>
                </clipPath>
              </defs>
              <foreignObject x="0" y="0" width="680" height="165" style={{ clipPath: 'url(#uzukiClip)' }}>
                <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
                  <source src="/motor.mp4" type="video/mp4" />
                </video>
              </foreignObject>
              <text x="0" y="150" fontSize="172" fontFamily="SuzukiFont, 'Big Shoulders Display', sans-serif" fontWeight="900" letterSpacing="-2" fill="none" stroke="#666" strokeWidth="0.8">UZUKI</text>
            </svg>
          </div>
        </div>

        <div className="motor-passby absolute bottom-0 right-0 z-10 pointer-events-none">
          <Image src="/motor-hero.png" alt="Motor" width={580} height={360} className="object-contain" priority />
        </div>
      </section>

      <section ref={panelsRef} className="flex h-[72vh]">
        {products.map((p, i) => (
          <div key={p.label} className="relative flex-1 overflow-hidden bg-gray-950 flex items-end">
            <Image src={p.img} alt={p.label} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/40" />
            <div
              className="absolute inset-0 bg-gray-950 transition-all duration-700 ease-in-out"
              style={{
                transform: panelsInView ? 'translateY(-100%)' : 'translateY(0)',
                transitionDelay: `${i * 0.18}s`,
              }}
            />
            <div
              className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none transition-opacity duration-300"
              style={{ opacity: panelsInView ? 0 : 1 }}
            >
              <span className="text-2xl font-black tracking-widest text-white/25" style={{ fontFamily: 'SuzukiFont, sans-serif' }}>{p.label}</span>
            </div>
            <div className="relative z-10 p-8 text-white">
              <h3 className="text-3xl font-black tracking-widest mb-1" style={{ fontFamily: 'SuzukiFont, sans-serif' }}>{p.label}</h3>
              <p className="text-white/60 text-sm">{p.desc}</p>
            </div>
          </div>
        ))}
      </section>

      <section ref={statsRef} className="py-20 px-8" style={{ background: '#1a2f6b' }}>
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { count: counts.auto, label: 'Automobile Models' },
            { count: counts.moto, label: 'Motorcycle Models' },
            { count: counts.marine, label: 'Marine Models' },
          ].map((item, i) => (
            <div key={i} className="border-t border-white/20 pt-8">
              <div className="text-5xl font-black text-white mb-2 tabular-nums" style={{ fontFamily: 'SuzukiFont, sans-serif' }}>{item.count}</div>
              <div className="text-blue-300 text-sm tracking-widest uppercase">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-28 px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] text-[#e60012] uppercase mb-3">Our Promise</p>
            <h2 className="text-5xl font-black mb-4" style={{ fontFamily: 'SuzukiFont, sans-serif' }}>Way of Life!</h2>
            <p className="text-gray-400 text-lg max-w-lg mx-auto">Suzuki believes in providing value and quality in every product, for every person, every journey.</p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {whySuzuki.map((item, i) => (
              <div key={i} ref={addRevealRef as any} className="reveal border-2 border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300" style={{ animationDelay: `${i * 0.15}s` }}>
                <p className="text-xs text-[#e60012] tracking-widest uppercase mb-2">{item.sub}</p>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-sm tracking-[0.3em] text-[#e60012] uppercase mb-3">Explore</p>
            <h2 className="text-5xl font-black mb-2" style={{ fontFamily: 'SuzukiFont, sans-serif' }}>Find Your Perfect Suzuki</h2>
          </div>
          <div className="flex items-center gap-4 mb-10">
            <span className={`text-sm font-semibold tracking-widest transition-colors ${activeCategory === 'passenger' ? 'text-[#1a2f6b]' : 'text-gray-400'}`}>PASSENGER</span>
            <button
              onClick={() => setActiveCategory(activeCategory === 'passenger' ? 'commercial' : 'passenger')}
              className="relative w-14 h-7 rounded-full transition-colors duration-300 flex-shrink-0"
              style={{ background: activeCategory === 'commercial' ? '#e60012' : '#1a2f6b' }}
            >
              <span
                className="absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all duration-300"
                style={{ left: activeCategory === 'passenger' ? '4px' : 'calc(100% - 24px)' }}
              />
            </button>
            <span className={`text-sm font-semibold tracking-widest transition-colors ${activeCategory === 'commercial' ? 'text-[#e60012]' : 'text-gray-400'}`}>COMMERCIALS</span>
          </div>
          <div className="grid grid-cols-4 gap-8">
            {displayedCars.map((car, i) => (
              <div key={i} className="group">
                <div className="relative h-36 mb-4 overflow-hidden">
                  <Image src={car.img} alt={car.name} fill className="object-contain group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-base font-black mb-1" style={{ fontFamily: 'SuzukiFont, sans-serif' }}>{car.name}</h3>
                <p className="text-xs text-gray-400 mb-2 tracking-widest">MULAI {car.price} IDR</p>
                <div className="border-t border-gray-200 pt-2">
                  <button className="text-xs font-semibold text-[#1a2f6b] hover:text-[#e60012] transition-colors flex items-center gap-1">See Details <span>→</span></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-sm tracking-[0.3em] text-[#e60012] uppercase mb-3">Services</p>
            <h2 className="text-5xl font-black" style={{ fontFamily: 'SuzukiFont, sans-serif' }}>More From Us</h2>
          </div>
          <div className="grid grid-cols-3 gap-8">
            {moreFromUs.map((item, i) => (
              <div key={i} ref={addRevealRef as any} className="reveal group" style={{ animationDelay: `${i * 0.12}s` }}>
                <div className="relative h-52 rounded-xl overflow-hidden mb-5 bg-gray-100">
                  <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-lg font-black mb-2 tracking-wide" style={{ fontFamily: 'SuzukiFont, sans-serif' }}>{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{item.desc}</p>
                <div className="border-t border-gray-200 pt-3">
                  <button className="text-sm font-semibold text-[#1a2f6b] hover:text-[#e60012] transition-colors flex items-center gap-1">See Details <span>→</span></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-8 bg-gray-950 text-white text-center relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-sm tracking-[0.3em] text-[#e60012] uppercase mb-4">Get Started</p>
          <h2 className="text-6xl font-black mb-6" style={{ fontFamily: 'SuzukiFont, sans-serif' }}>Ready to Ride?</h2>
          <p className="text-gray-400 text-lg mb-10">Book a test drive or find a dealer near you. Experience Suzuki, the Way of Life.</p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-4 bg-[#e60012] text-white font-bold tracking-widest text-sm hover:bg-red-700 transition-colors rounded-sm">BOOK TEST DRIVE</button>
            <button className="px-8 py-4 border border-white/20 text-white font-bold tracking-widest text-sm hover:bg-white/10 transition-colors rounded-sm">FIND A DEALER</button>
          </div>
        </div>
      </section>

      <footer className="bg-white pt-20 pb-8 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-4 gap-8 mb-16">
            {[
              { title: 'Products and Services', links: ['Mobil Suzuki', 'Motor Suzuki', 'Marine Suzuki', 'Daftar Harga', 'Temukan Dealer', 'Servis Suzuki'] },
              { title: 'Pojok Suzuki', links: ['Car Club', 'Press Release', 'Tips and Trick'] },
              { title: 'Lainnya', links: ['Hubungi Kami', 'Suzuki Finance', 'Suzuki Insurance', 'Test Drive', 'Konsultasi Pembelian'] },
              { title: 'Suzuki Corporate', links: ['Tentang Suzuki', 'Sejarah', 'Karir', 'CSR', 'Privacy Policy'] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-5">{col.title}</h4>
                {col.links.map(l => <p key={l} className="text-sm text-gray-600 hover:text-[#e60012] cursor-pointer mb-2 transition-colors">{l}</p>)}
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-8 flex items-start justify-between gap-8">
            <div className="flex-shrink-0">
              <Image src="/logo-suzuki.png" alt="Suzuki" width={100} height={32} className="object-contain" />
            </div>
            <div>
              <p className="text-sm font-black tracking-widest uppercase mb-4">Follow Us!</p>
              <div className="flex items-center gap-5">
                <a href="#" className="opacity-50 hover:opacity-100 transition-opacity">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#1a2f6b"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" className="opacity-50 hover:opacity-100 transition-opacity">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#1a2f6b"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="opacity-50 hover:opacity-100 transition-opacity">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#1a2f6b"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="#" className="opacity-50 hover:opacity-100 transition-opacity">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#1a2f6b"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>
            <div className="text-sm text-gray-500 leading-relaxed">
              <p className="font-semibold text-gray-700 mb-2">Suzuki Indonesia</p>
              <p className="mb-1">Jl. Raya Bekasi Km. 19</p>
              <p className="mb-1">Pulogadung, Jakarta Timur (13920)</p>
              <p className="mb-3">DKI Jakarta, Indonesia</p>
              <p>Telephone: (+021) 2955 4800</p>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-8 pt-6 flex items-center justify-between">
            <div className="flex gap-6">
              {['Legal', 'Privacy Center', 'Privacy Policy', 'About Ads', 'Cookies'].map(l => (
                <span key={l} className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">{l}</span>
              ))}
            </div>
            <span className="text-xs text-gray-400">2025 PT. Suzuki Indomobil Sales</span>
          </div>
        </div>
      </footer>

    </main>
  )
}