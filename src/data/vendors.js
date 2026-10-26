const vendors = [
 {
 id: 'my-restaurant',
 name: 'Your Restaurant Name',
 location: 'Mahallah ..., Block ...',
 openHours: '7:00 am - 10:00 pm',
 isOpen: true,
 menu: [
 { id: 'my-1', name: 'Nasi Lemak', description: 'Fragrant rice cooked in coconut milk', price: 7.5, category: 'Rice',
available: true },
 { id: 'my-2', name: 'Mie Goreng', description: 'Fried noodles with vegetables and meat', price: 6, category:
'Noodles', available: true },
 { id: 'my-3', name: 'Watermelon Juice', description: 'Refreshing juice made from fresh watermelons', price: 2.5, category:
'Drinks', available: false },
 ],
 },
 {
 id: 'kafe-aminah',
 name: 'Kafe Mahallah Aminah',
 location: 'Mahallah Aminah, Ground Floor',
 openHours: '8:00 am - 9:00 pm',
 isOpen: true,
 menu: [
 { id: 'ami-1', name: 'Nasi Ayam Penyet', description: 'Smashed fried chicken with sambal and rice', price: 9, category: 'Rice', available: true },
 { id: 'ami-2', name: 'Air Bandung', description: 'Rose syrup with milk', price:
3, category: 'Drinks', available: true },
 ],
 },
]
export default vendors