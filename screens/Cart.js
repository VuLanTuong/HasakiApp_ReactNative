import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import Toast from 'react-native-toast-message';
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/CartReducer";

const Cart = ({ navigation }) => {
  // Sử dụng useSelector để lấy dữ liệu từ Redux store
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  // Tính tổng tiền sử dụng reduce
  const total = cart.reduce((acc, item) => acc + item.quantityInCart * item.price, 0);

  // Component con để hiển thị thông tin từng sản phẩm trong giỏ hàng
  const Item = ({ item }) => {
    // Các hàm xử lý sự kiện
    const removeItemFromCart = () => dispatch(removeFromCart(item));
    const increaseQuantity = () => {    
      if (parseInt(item.quantityInCart) >= item.quantity) {
        Toast.show({
          type: 'error',
          text1: 'Thông báo!',
          text2: 'Số lượng đã đạt tới giới hạn trong kho',
        });
      } else {
        dispatch(incrementQuantity(item));
        console.log(cart);
      }
    };
    const decreaseQuantity = () => {
      if (parseInt(item.quantityInCart) === 1) {
        dispatch(removeFromCart(item));
      } else {
        dispatch(decrementQuantity(item));
      }
    };
    return (
      <View style={styles.itemContainer}>
        <View style={styles.productInfo}>
          <Image style={styles.productImage} source={{ uri: item.image }} />
          <View style={styles.productDetails}>
            <View style={{ height: '70%', paddingTop: 1 }}>
              <Text style={{ fontSize: 12, color: '#306E51', fontWeight: 'bold' }}>{item.brand}</Text>
              <Text style={styles.productName}>{item.name}</Text>
            </View>
            <View style={styles.priceContainer}>
              <TouchableOpacity onPress={decreaseQuantity}>
                <AntDesign
                  name="minus"
                  style={styles.quantityButton}
                />
              </TouchableOpacity>
              <View style={{ justifyContent: 'center' }}>
                <Text style={styles.quantityText}>{item.quantityInCart}</Text>
              </View>
              <TouchableOpacity onPress={increaseQuantity}>
                <AntDesign
                    name="plus"
                    style={styles.quantityButton}
                />
              </TouchableOpacity>
              <Text style={styles.productPrice}>x  {formatCurrency(item.price)} đ</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.cartContent}>
        {cart.length === 0 ? (
          <View style={styles.emptyCartView}>
            <Image style={{ width: 150, height: 200 }} source={require('../assets/cart_empty.png')}/>
            <Text style={styles.emptyCartText}>Giỏ hàng của bạn chưa có sản phẩm nào</Text>
            <TouchableOpacity style={styles.contShoppingBtn} onPress={() => navigation.navigate('Homepage')}>
              <Text style={styles.contShoppingText}>Tiếp tục mua sắm</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <FlatList data={cart} renderItem={({ item }) => <Item item={item} />} />
          </>
        )}
      </View>
      {cart.length > 0 && (
        <View style={styles.footer}>
          <View style={{ flexDirection: 'row', padding: 10 }}>
            <Text style={{ fontSize: 16, textAlignVertical: 'bottom' }}>Tổng thanh toán:</Text>
            <Text style={styles.totalAmount}> {formatCurrency(total)} đ</Text>
          </View>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText} onPress={() => {
              console.log(cart);
              Toast.show({
                type: 'success',
                text1: 'Đặt hàng thành công!',
                text2: `Đã lưu đơn hàng`
              });
            }}>Tiến hành đặt hàng</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );  
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    height: 63,
    backgroundColor: '#306E51',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartContent: {
    flex: 1,
    paddingHorizontal: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 100,
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: '#F5F5F5',
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  productImage: {
    height: 100,
    flex: 2,
    resizeMode: 'contain',
    marginRight: 10,
  },
  productDetails: {
    flexDirection: 'column',
    flex: 7,
  },
  productName: {
    fontSize: 14,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flexWrap: 'wrap',
    width: '100%',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceIcon: {
    fontSize: 20,
  },
  productPrice: {
    fontSize: 16,
    marginLeft: 50,
    fontWeight: 'bold',
  },
  quantityButton: {
    fontSize: 14,
    padding: 5,
    borderRadius: 50,
    backgroundColor: '#D0D4CA',
  },
  quantityText: {
    textAlign: 'center',
    width: 40,
    fontSize: 14,
  },
  emptyCartView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  emptyCartText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25, 
    shadowRadius: 3.84,
  },
  totalAmount: {
    textAlign: 'center',
    fontSize: 18,
    color: '#FF5C00',
    backgroundColor: '#FFF6F6',
    fontWeight: 'bold',
  },
  contShoppingBtn: {
    backgroundColor: '#FF5C00',
    width: 330,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    borderRadius: 1,
  },
  contShoppingText: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#FFF',
  },
  checkoutButton: {
    backgroundColor: '#FF5C00',
    width: '85%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  checkoutButtonText: {
    fontSize: 18,
    color: '#FFF',
    textTransform: 'uppercase',
  },
});

export default Cart;
