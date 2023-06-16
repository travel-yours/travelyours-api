# TravelYours API

## Sign In 

- Method : POST
- URL : /auth/signin

```json
{
    "email": "string",
    "password": "string"
}
```
## Sign Up 

- Method : POST
- URL : /auth/signup

```json
{
    "name" : "string",
    "no_hp": "string",
    "email": "string",
    "password": "string",
}
```

# Add Data Destination 

- Method : POST
- URL : /destinations/add

```json
{
    "name" : "string",
    "description": "string",
    "location": "string",
    "price": "Number",
    "facilities": "String[Array]",
    "imageUrl": "String"
}
```
- Note : Untuk penambahan imageUrl masih manual, jadi upload gambar dlu ke GCS lalu didapatkan URL baru ditambahkan disitu.
# Get All Data Destination

- Method : GET
- URL : /destinations

- Example Data 
```json
    {
        "_id": "647a94e9066891e6d6b9fcad",
        "name": "Candi Borobudur",
        "description": "Candi Borobudur adalah salah satu keajaiban dunia yang terletak di Kabupaten Magelang, Jawa Tengah, Indonesia. Candi ini merupakan situs arkeologi Budha terbesar di dunia dan juga merupakan warisan budaya UNESCO. Dibangun pada abad ke-8 oleh dinasti Syailendra, Candi Borobudur adalah bukti megahnya peradaban Budha pada masa lampau. Dengan desain yang rumit dan indah, candi ini terdiri dari sembilan tingkat stupa yang menggambarkan perjalanan spiritual seorang umat Budha menuju pencerahan. Selain menjadi tempat ziarah bagi umat Budha, Candi Borobudur juga menjadi daya tarik wisata yang populer di Indonesia, menarik pengunjung dari seluruh dunia untuk mengagumi keindahan dan kekayaan sejarahnya.",
        "location": "Magelang, Jawa Tengah",
        "price": 35000,
        "facilities": [
            "Area Parkir",
            "Area Rekreasi",
            "Toilet"
        ],
        "__v": 0,
        "imageUrl": "https://storage.googleapis.com/travel-storage/Candi-Burobudur.jpeg"
    },
```

# Booking
- Method : Post
- URL : /booking

- Example Data
```json
    {
        "_id" : "648b388339595866d579b1f2"
        "bookingId" : "6482637acbdbc53dabb2549a"
        "userId" : "user12345"
        "totalHarga" : 100000
        "kodePembayaran" : "PAY12345"
     }
  ```

# Get Data ById

- Method : GET
- URL : /destination/:id
