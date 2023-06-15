const { MongoClient } = require('mongodb');

// Fungsi untuk mengambil detail pengguna dari database berdasarkan userID
async function getUserDetails(userID) {
  const client = new MongoClient('mongodb+srv://travel:travel@travel.m0vu84d.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();

    const db = client.db('test');
    const collection = db.collection('users');

    const user = await collection.findOne({ userId: userID });

    return user;
  } catch (error) {
    console.log('Error occurred while retrieving user details:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// Fungsi untuk menghitung total harga dari paketan tempat yang dipilih
function calculateTotalPrice(tempatArray) {
  let total = 0;

  for (let i = 0; i < tempatArray.length; i++) {
    total += tempatArray[i].harga;
  }

  return total;
}

// Fungsi untuk melakukan booking dan menyimpan data ke database
async function bookPackage(userID, tempatArray, kodePembayaran) {
  const client = new MongoClient('mongodb+srv://travel:travel@travel.m0vu84d.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();

    const db = client.db('test');
    const bookingCollection = db.collection('booking');

    const user = await getUserDetails(userID);

    const totalHarga = calculateTotalPrice(tempatArray);

    const bookingData = {
      bookingId: '6482637acbdbc53dabb2549a',
      userId: userID,
      totalHarga: totalHarga,
      kodePembayaran: kodePembayaran
    };

    await bookingCollection.insertOne(bookingData);

    console.log('Booking berhasil disimpan ke database.');
  } catch (error) {
    console.log('Error occurred while booking:', error);
    throw error;
  } finally {
    await client.close();
  }
}

module.exports = {
  bookPackage
};