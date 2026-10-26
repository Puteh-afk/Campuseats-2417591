import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import CartPage from './components/CartPage.jsx'
import { Loading, ErrorMessage } from './components/Status.jsx'

function App() {
  // B2: Fetch state
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [selectedVendorId, setSelectedVendorId] = useState(null)

  // B3 & B5: Cart, View, and Order state
  const [cart, setCart] = useState([]) // array of { item, qty }
  const [view, setView] = useState('menu') // 'menu' | 'cart' | 'done'
  const [lastOrder, setLastOrder] = useState(null)

  // B2: Fetch vendors from mock API
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetch('/api/vendors.json', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setVendors(data)
        if (data.length > 0) {
          setSelectedVendorId(data[0].id)
        }
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [reloadKey])

  // B3: Cart handlers
  function handleAddToCart(item) {
    setCart((prev) => {
      const existing = prev.find((line) => line.item.id === item.id)
      if (existing) {
        return prev.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
        )
      }
      return [...prev, { item, qty: 1 }]
    })
  }

  function handleChangeQty(itemId, delta) {
    setCart((prev) =>
      prev
        .map((line) =>
          line.item.id === itemId ? { ...line, qty: line.qty + delta } : line
        )
        .filter((line) => line.qty > 0)
    )
  }

  function handleRemove(itemId) {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId))
  }

  // B5: Place order handler
  function handlePlaceOrder(details) {
    const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)
    setLastOrder({ ...details, total })
    setCart([])
    setView('done')
  }

  // Derived state
  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0)
  const selectedVendor = vendors.find((v) => v.id === selectedVendorId)

  // View routing
  let content
  if (view === 'cart') {
    content = (
      <>
        <h2>Your cart</h2>
        <CartPage
          cart={cart}
          onChangeQty={handleChangeQty}
          onRemove={handleRemove}
          onPlaceOrder={handlePlaceOrder}
        />
      </>
    )
  } else if (view === 'done') {
    content = (
      <div className="card">
        <h2>Order placed!</h2>
        <p>
          Thank you, <strong>{lastOrder?.name}</strong> ({lastOrder?.mahallah}).
        </p>
        <p>
          Pickup time: <strong>{lastOrder?.pickupTime}</strong> | Total:{' '}
          <strong>RM {lastOrder?.total.toFixed(2)}</strong>
        </p>
        <button type="button" className="btn" onClick={() => setView('menu')}>
          Back to vendors
        </button>
      </div>
    )
  } else if (loading) {
    content = <Loading />
  } else if (error) {
    content = (
      <ErrorMessage
        message={error}
        onRetry={() => setReloadKey((k) => k + 1)}
      />
    )
  } else {
    content = (
      <>
        <section className="vendors-grid">
          {vendors.map((v) => (
            <VendorCard
              key={v.id}
              vendor={v}
              isSelected={v.id === selectedVendorId}
              onSelect={() => setSelectedVendorId(v.id)}
            />
          ))}
        </section>
        {selectedVendor && (
  <MenuList
    vendor={selectedVendor}
    items={selectedVendor.menu}
    menu={selectedVendor.menu}
    onAddToCart={handleAddToCart}
    onAdd={handleAddToCart}
  />
)}
      </>
    )
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView('menu')}
        onShowCart={() => setView('cart')}
      />
      <main className="container">{content}</main>
      <Footer />
    </>
  )
}

export default App