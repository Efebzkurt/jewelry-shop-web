# Jewelry Shop Web App
Bir e-ticaret sitesinde kullanılabilecek,mock data ile ürünleri listeleyen bir web uygulaması.
## Sayfa Görünümü
<img height=300 src="https://github.com/user-attachments/assets/4fcb8019-5a44-4773-943f-82b0e701eac8" />

## Mobil Cihazlarda Görünüm
<img height=450 src="https://github.com/user-attachments/assets/06a7b5a7-7750-459b-95ed-b6701eb38586" />

## Hata Durumunda Görüntülenecek Sayfa
<img height=300 src="https://github.com/user-attachments/assets/6be60430-1746-4655-8da4-cebef6596460" />


## KURULUM
Backend klasöründe .env dosyası oluşturulup gerekli keyler doldurulmalı
```
METAL_PRICE_API_KEY=XXXXXXXXXXXXXXX (https://metalpriceapi.com)
FRONTEND_URL=http://localhost:3000 
```

Başlatmadan önce, bağımlılıklar yüklenmeli
```
../backend
go get ...
../frontend
npm install
```


## ÇALIŞTIRMA
```
..../backend
go run main.go
..../frontend
npm run dev
```


## API Filtrelemesi
Ürünler maximum ve minimum fiyat, maximum ve minimum popülerite değerlerine göre filtrelenebilir
Kullanılabilecek değerler: maxPrice, minPrice, maxPopularity, minPopularity

Örnek: Sadece 900 ve 1500 fiyat değeri arasındaki ürünleri göster:
```
../api/products?minPrice=900&maxPrice=1500
```

## CANLI
Görünüm: https://jewelry-shop-web-frontend.onrender.com

API: https://jewelry-shop-web-backend.onrender.com/api/products
