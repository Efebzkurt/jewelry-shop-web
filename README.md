# Jewelry Shop Web App
Bir e-ticaret sitesinde kullanılabilecek,mock data ile ürünleri listeleyen bir web uygulaması.
## Sayfa Görünümü
<img height=300 src="https://github.com/user-attachments/assets/4fcb8019-5a44-4773-943f-82b0e701eac8" />
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

## CANLI
Görünüm: https://jewelry-shop-web-frontend.onrender.com
API: https://jewelry-shop-web-backend.onrender.com/api/products
