import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Screen_04 = () => {

  const product = [
    {
      id: 1,
      name: 'Product 1',
      image: require('../assets/DATA/Image 7 (1).png'),
      price: 2.99,
      description: 'Occaecat cupidatat non proident.',
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Product 2',
      image: require('../assets/DATA/Image 7.png'),
      price: 3.99,
      description: 'Occaecat cupidatat non proident.',
      rating: 4,
    },
    {
      id: 3,
      name: 'Product 3',
      image: require('../assets/DATA/Image 7 (2).png'),
      price: 5.99,
      description: 'Occaecat cupidatat non proident.',
      rating: 4.4,
    },
    {
      id: 4,
      name: 'Product 4',
      image: require('../assets/DATA/Image 7 (4).png'),
      price: 3.99,
      description: 'Occaecat cupidatat non proident.',
      rating: 5,
    },
  ];
  
  const [quantity, setQuantity] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(product[0]);
  const [selectedSize, setSelectedSize] = useState('M');

  const tang = () => {
    setQuantity(quantity + 1);
  }

  const giam = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  }

  const handleAddToCart = async () => {
    const purchaseData = {
      name: selectedProduct.name,
      quantity,
      totalPrice: (selectedProduct.price * quantity).toFixed(2),
    };

    try {
      let cart = [];
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart !== null) {
        cart = JSON.parse(storedCart);
      }
      cart.push(purchaseData);
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      console.log('Product added to cart:', purchaseData);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleExportCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart !== null) {
        const cart = JSON.parse(storedCart);
        console.log('Cart data:', cart);
      } else {
        console.log('No cart data found.');
      }
    } catch (error) {
      console.error('Error exporting cart:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      await AsyncStorage.clear();
      console.log('Cart cleared.');
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const size = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      style={styles.scrollContainer}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../assets/DATA/back.png')} />
          <Text style={styles.headerText}>Payments</Text>
        </View>

        {selectedProduct && (
          <View style={styles.imageBig}>
            <Image source={selectedProduct.image} style={styles.bigImage} />
          </View>
        )}

        <View style={styles.scrollContainer}>
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            {product.map((item) => (
              <TouchableOpacity key={item.id} onPress={() => setSelectedProduct(item)}>
                <View style={[styles.product, 
                  selectedProduct.id === item.id && {borderColor: 'blue'}]}>
                  <Image source={item.image} style={styles.image} />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.price}>
          <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
            marginRight: 10,
          }}>${selectedProduct.price}</Text>
          <Text style={{
            color: 'red',
            backgroundColor: 'yellow',
            padding: 5,
            borderRadius: 10,
            fontSize: 12,
          }}>Buy 1 get 1</Text>
        </View>

        <View style={styles.infoProduct}>
          <View style={styles.details}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
              }}
            >{selectedProduct.name}</Text>
            <Text
              style={{
                color: 'gray',
              }}
            >{selectedProduct.description}</Text>
          </View>
          <View style={styles.rating}>
            <Image source={require('../assets/DATA/Rating 3.png')} />
            <Text>{selectedProduct.rating}</Text>
          </View>
        </View>
        
        {selectedSize && (
          <View style={styles.sizeProduct}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 500,
                marginBottom: 10,
              }}
            >Size</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {size.map((item) => (
                <TouchableOpacity key={item} onPress={() => setSelectedSize(item)}>
                  <View style={{
                    padding: 10,
                    borderRadius: 10,
                    alignItems: 'center',
                    marginRight: 10,
                    backgroundColor: selectedSize === item ? '#25c3d9' : 'white',
                    borderWidth: 1,
                    borderColor: 'gray',
                  }}>
                    <Text style={{
                      color: selectedSize === item ? '#fff' : 'Gray',
                    }}>{item}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={{ marginTop: 10 }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 500,
            marginHorizontal: 20,
            marginTop: 10,
          }}>Quantity</Text>
          <View style={styles.quantity}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}>
              <TouchableOpacity onPress={giam}>
                <Image source={require('../assets/DATA/minus.png')} style={styles.iconQuantity}/>
              </TouchableOpacity>
              <Text style={{
                fontSize: 20,
                alignSelf: 'center',
              }}>{quantity}</Text>
              <TouchableOpacity onPress={tang}>
                <Image source={require('../assets/DATA/plus.png')} style={styles.iconQuantity}/>
              </TouchableOpacity>
            </View>
            <View style={{
              flexDirection: 'row',
              marginRight: 20,
            }}>
              <Text style={{
                fontSize: 20,
                fontWeight: 500,
                marginHorizontal: 20
              }}>Total</Text>
              <Text style={{
                fontSize: 20,
                fontWeight: 500,
              }}>${(selectedProduct.price * quantity).toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <View style={{
          borderTopColor: 'gray',
          borderTopWidth: 1,
          marginTop: 20,
          marginHorizontal: 20,
        }}></View>

        <View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 20,
              marginTop: 20,
              marginBottom: 20,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{
              fontSize: 20,
              fontWeight: 600,
            }}>Size guide</Text>
            <Image source={require('../assets/DATA/next.png')} 
              style={{
                width: 20,
                height: 20,
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={{
          borderTopColor: 'gray',
          borderTopWidth: 1,
          marginTop: 10,
          marginHorizontal: 20,
        }}></View>

        <View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 20,
              marginTop: 20,
              marginBottom: 20,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{
              fontSize: 20,
              fontWeight: 600,
            }}>Reviews (99)</Text>
            <Image source={require('../assets/DATA/next.png')} 
              style={{
                width: 20,
                height: 20,
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={{
          borderTopColor: 'gray',
          borderTopWidth: 1,
          marginTop: 10,
          marginBottom: 20,
          marginHorizontal: 20,
        }}/>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#25c3d9',
          }}
          onPress={handleAddToCart}
        >
          <Image source={require('../assets/DATA/cart.png')}
            style={{
              width: 24,
              height: 24,
            }}
          />
          <Text style={{
            fontSize: 20,
            fontWeight: 600,
            color: '#fff',
            marginLeft: 10,
          }}>Add to Cart</Text>
        </TouchableOpacity>

        {Platform.OS === 'web' && (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 20,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#25c3d9',
              marginTop: 10,
            }}
            onPress={handleExportCart}
          >
            <Text style={{
              fontSize: 20,
              fontWeight: 600,
              color: '#fff',
              marginLeft: 10,
            }}>Export Cart</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'red',
            marginTop: 10,
          }}
          onPress={handleClearCart}
        >
          <Text style={{
            fontSize: 20,
            fontWeight: 600,
            color: '#fff',
            marginLeft: 10,
          }}>Clear Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  product: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
    marginLeft: 13,
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  imageBig: {
    alignItems: 'center',
    marginBottom: 20,
  },
  bigImage: {
    width: 200,
    height: 200,
  },
  scrollContainer: {
    height: 100,
  },
  horizontalScroll: {
    paddingVertical: 10,
  },
  details: {
    alignItems: 'flex-start',
  },
  infoProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  sizeProduct: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  iconQuantity: {
    width: 20,
    height: 20,
    marginHorizontal: 20,
  },
  quantity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default Screen_04;
