
# HasakiApp_ReactNative

Dự án ứng dụng bán hàng online Hasaki chuyên kinh doanh các mặt hàng mỹ phẩm.


## Công nghệ và công cụ sử dụng

![JavaScript](https://img.shields.io/badge/JavaScript-222222?logo=JavaScript) ![NPM](https://img.shields.io/badge/NPM-222222?logo=npm) ![Expo](https://img.shields.io/badge/Expo-222222?logo=expo) ![React Native](https://img.shields.io/badge/ReactNative-222222?logo=React)  ![Node.js](https://img.shields.io/badge/Node.js-222222?logo=node.js) ![JsonServer](https://img.shields.io/badge/JsonServer-222222?logo=Json) ![Redux](https://img.shields.io/badge/Redux-222222?logo=redux) ![Figma](https://img.shields.io/badge/Figma-222222?logo=Figma) ![Trello](https://img.shields.io/badge/Trello-222222?logo=Trello) ![GitHub](https://img.shields.io/badge/GitHub-222222?logo=github)  ![ChatGPT](https://img.shields.io/badge/ChatGPT-222222?logo=openai)


## Các bước triển khai ứng dụng

Ứng dụng này được thiết kế để có thể hoạt động tốt ở cả môi trường web và App Expo Go trên điện thoại. Vui lòng thực hiện đủ các bước sau để có thể đảm bảo ứng dụng hoạt động đúng.

Bước 1: Mở cmd và chạy lệnh ipconfig, sau đó ở phần Wireless LAN adapter Wi-Fi -> ta lấy IPv4 Address của thiết bị có dạng 'xxx.xxx.x.x'.

Bước 2: Mở project lên và vào thư mục ipAddress, trong đó có file IPv4Address.js. Sửa địa chỉ ip chuỗi ipaddress thành địa chỉ ip của mình đã lấy ở bước 1.

Bước 3: Khởi động json-server bằng cách chạy lệnh sau trong Terminal.
```bash
  npm run start-json-server
```
Bước 4: Khởi động ứng dụng trên môi trường web bằng cách chạy lệnh sau trong một Terminal khác.
```bash
  npm run web
```
Tới đây thì ứng dụng đã có thể khởi chạy trên web, để triển khai trên điện thoại vui lòng thực hiện các bước tiếp theo.

Bước 5: Tải ứng dụng Expo Go trên điện thoại từ App Store hoặc Google Play.

Bước 6: Đảm bảo máy tính đang chạy ứng dụng và điện thoại sử dụng đang cùng kết nối vào một mạng WiFi. Sau đó quét mã QR Code hiện trên Terminal sau khi chạy npm run web ở bước 4.

Như vậy là đã thực hiện thành công các bước triển khai ứng dụng trên web và trên cả di động. Chúc bạn thành công.






## Demo các chức năng của ứng dụng
(Các screenshot demo được chụp từ iPhone)
- Sử dụng BottomTab để thể hiện thanh điều hướng phía dưới màn hình.
- Banner tự động chuyển ảnh mỗi 3s ở đầu trang Homepage.
- Flash Deals với đồng hồ đếm ngược và thanh trượt cực cháy.
![UI](demo/homepage.jpg)
- Chức năng tìm kiếm sản phẩm và hiển thị danh sách sản phẩm có tên gần giống với từ khóa tìm kiếm.
![UI](demo/search.jpg)
- Nếu không tìm thấy sản phẩm nào sẽ hiện hình ảnh thông báo rằng không tìm thấy.
![UI](demo/searchfail.jpg)
- Danh mục sản phẩm với 2 FlatList render các sản phẩm bên phải tùy theo danh mục được chọn bên trái. Danh mục 'Hasaki Deals' sẽ render 12 sản phẩm ngẫu nhiên. Các sản phẩm được fetch data từ json-server.
![UI](demo/category.jpg)
- Chọn vào mỗi sản phẩm sẽ dẫn đến trang chi tiết sản phẩm, có thể thêm sản phẩm vào giỏ hàng bằng cách nhấn nút 'Mua online'.
![UI](demo/productdetail.jpg)
- Giỏ hàng có các chức năng tăng, giảm số lượng và xóa sản phẩm khỏi giỏ hàng. Sử dụng Redux để quản lí trạng thái giỏ hàng.
![UI](demo/cart.jpg)
- Nếu thêm quá số lượng hàng trong kho thì sẽ hiện thông báo đã quá số lượng.
![UI](demo/outofstock.jpg)
- Nếu không có sản phẩm nào trong giỏ hàng thì sẽ hiện thông báo và nút 'Tiếp tục mua sắm' dẫn đến trang chủ Homepage.
![UI](demo/cartfail.jpg)
- Trang thông báo lấy dữ liệu các thông báo từ link mockAPI.io và render thành FlatList.
![UI](demo/noti.jpg)

- Màn hình Quản lí tài khoản gồm có các chức năng như Log in và Sign up và sẽ hiển thi tên người dùng nếu đăng nhập thành công.
![UI](demo/account.png)
- Màn hình đăng kí tài khoản, có kiểm tra điều kiện nhập của Name, Email, Password và Phone number.
![UI](demo/signup.jpg)
- Màn hình đăng nhập, khi đăng nhập đúng email và mật khẩu đã đăng kí trong database thì sẽ hiển thị thông báo đăng nhập thành công.
![UI](demo/login.jpg)
- Khi đăng nhập thành công sẽ tự động load giỏ hàng của người dùng đó đã thêm vào từ lần đăng nhập trước nếu người dùng chưa Tiến hành đặt hàng.
![UI](demo/loadcart.jpg)
- Nhấn vào tiến hành đặt hàng sẽ tạo thành một đơn hàng có mã OrderId được tạo uuid tự động và lưu vào database. 
![UI](demo/order.jpg)
- Nhấn vào nút package đơn hàng trên thanh header sẽ hiện ra các đơn hàng của người dùng đó.
![UI](demo/orderlist.jpg)
- Đăng xuất bằng cách nhấn vào Log out.
![UI](demo/logout.jpg)


